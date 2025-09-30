```mermaid
graph TD
    subgraph Frontend
        direction LR
        WebApp["Веб-приложение (SPA)<br/>React/Vue. Пользовательский интерфейс<br/>для ввода запросов и просмотра маршрутов."]:::frontend
    end

    subgraph Backend Application
        direction TB
        
        subgraph API Layer
            APIGateway["API Gateway (REST API)<br/>Единая точка входа для всех запросов от Frontend.<br/>Валидация, маршрутизация."]:::api
        end

        subgraph Authentication Layer
            AuthService["Сервис Аутентификации<br/>Обрабатывает регистрацию, вход,<br/>управляет JWT токенами, OAuth коллбэки."]:::auth
        end

        subgraph Business Modules
            direction LR
            UserModule["Модуль Пользователя<br/>Управляет данными пользователей (профили)."]:::business
            
            subgraph Trip Planner Module
                TripGenerationService["Сервис Генерации Маршрутов<br/>Оркестрирует процесс создания плана поездки.<br/>Инициирует асинхронную задачу."]:::business
                TripProcessingWorker["Воркер Обработки Маршрутов<br/>Асинхронно выполняет тяжелые задачи:<br/>вызов AI, парсинг, сохранение."]:::business
                PromptEngineeringService["Сервис Подготовки Промптов<br/>Формирует качественный промпт для AI<br/>на основе запроса пользователя."]:::business
                AIIntegrationService["Сервис Интеграции с AI<br/>Отправляет промпты во внешний AI сервис<br/>и получает сырой ответ."]:::business
                DataParsingService["Сервис Парсинга Данных<br/>Преобразует текстовый ответ от AI<br/>в структурированные данные (JSON)."]:::business
            end

            NotificationService["Сервис Уведомлений (WebSocket)<br/>Отправляет real-time уведомления<br/>на Frontend о готовности маршрута."]:::business
        end

        subgraph Data Layer
            direction LR
            UserRepository["Репозиторий Пользователей<br/>CRUD операции для сущности User."]:::data
            TripRepository["Репозиторий Маршрутов<br/>CRUD операции для сущностей Trip и Location."]:::data
            Database["База Данных (PostgreSQL)<br/>Хранит данные о пользователях,<br/>их маршрутах, локациях и т.д."]:::data
            MessageQueue["Очередь сообщений (RabbitMQ/SQS)<br/>Обеспечивает асинхронную обработку<br/>запросов на генерацию маршрутов."]:::data
        end
    end

    subgraph External Systems
        direction LR
        GenerativeAI["Generative AI Service<br/>(OpenAI GPT, Google Gemini)<br/>Генерирует текст маршрута по промпту."]:::external
        MappingService["Mapping Service<br/>(Google Maps API, Mapbox)<br/>Предоставляет карты, геокодирование<br/>и построение маршрутов на карте."]:::external
        GoogleOAuth["Google OAuth Provider<br/>Сервис для аутентификации<br/>через аккаунт Google."]:::external
    end

    %% Styles Definition
    classDef frontend fill:#DAE8FC,stroke:#6C8EBF,stroke-width:2px;
    classDef api fill:#D5E8D4,stroke:#82B366,stroke-width:2px;
    classDef auth fill:#FFE6CC,stroke:#D79B00,stroke-width:2px;
    classDef business fill:#E1D5E7,stroke:#9673A6,stroke-width:2px;
    classDef data fill:#F5F5F5,stroke:#666666,stroke-width:2px;
    classDef external fill:#FFD6D6,stroke:#D93030,stroke-width:2px;

    %% Applying Styles
    class WebApp frontend;
    class APIGateway api;
    class AuthService auth;
    class UserModule,TripGenerationService,TripProcessingWorker,PromptEngineeringService,AIIntegrationService,DataParsingService,NotificationService business;
    class UserRepository,TripRepository,Database,MessageQueue data;
    class GenerativeAI,MappingService,GoogleOAuth external;

    %% Connections
    WebApp -- "HTTP/S Запросы" --> APIGateway;
    WebApp -- "Отображение карты" --> MappingService;
    WebApp -- "Подписка на события" --> NotificationService;
    
    APIGateway -- "Запросы аутентификации" --> AuthService;
    APIGateway -- "Запросы к данным пользователя" --> UserModule;
    APIGateway -- "Запрос на генерацию маршрута" --> TripGenerationService;
    APIGateway -- "Получение готового маршрута" --> TripRepository;
    
    AuthService --> UserModule;
    AuthService -- "Запрос на аутентификацию" --> GoogleOAuth;

    UserModule --> UserRepository;
    UserRepository --> Database;
    
    TripGenerationService -- "1. Помещает задачу в очередь" --> MessageQueue;
    
    MessageQueue -- "2. Передает задачу воркеру" --> TripProcessingWorker;
    
    TripProcessingWorker -- "3. Готовит промпт" --> PromptEngineeringService;
    TripProcessingWorker -- "4. Вызывает AI" --> AIIntegrationService;
    AIIntegrationService -- "API Call" --> GenerativeAI;
    TripProcessingWorker -- "5. Парсит ответ" --> DataParsingService;
    DataParsingService -- "Запрос гео-координат" --> MappingService;
    TripProcessingWorker -- "6. Сохраняет результат" --> TripRepository;
    TripRepository --> Database;
    
    TripProcessingWorker -- "7. Уведомляет об успехе" --> NotificationService;