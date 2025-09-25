# API: Authentication

> - Даты — ISO 8601 (UTC, `Z`).
> - Единый формат ошибки: `{"error": {"code", "message"}}`.
> - Асинхронность не требуется.

## 1) Матрица доступа (RBAC)

| Ресурс | Метод | Access | Примечания |
|---|---|---|---|
| /auth/register | POST | public | - |
| /auth/login | POST | public | - |
| /auth/logout | POST | authenticated | Требует access token |
| /auth/google/redirect | GET | public | - |
| /auth/google/callback | GET | public | - |

## 2) Ресурсы и эндпоинты

### POST /auth/register
**Назначение:** Регистрация нового пользователя по email и паролю.
**Access:** public

**Request Body (`application/json`):**
| Поле | Тип | Формат/ограничения | Обяз. | Комментарий |
|---|---|---|---|---|
| email | string | valid email | да | - |
| password | string | min 8 символов | да | **[OPEN QUESTION]** Политики? |

**Responses:**
- **200 OK** - Возвращает пару токенов.
  ```json
  {
    "accessToken": "...",
    "refreshToken": "..."
  }
  ```
- **422 Unprocessable Entity** - Ошибка валидации.
- **409 Conflict** - Пользователь с таким email уже существует.

### POST /auth/login
**Назначение:** Вход пользователя по email и паролю.
**Access:** public

**Request Body (`application/json`):**
| Поле | Тип | Формат/ограничения | Обяз. | Комментарий |
|---|---|---|---|---|
| email | string | valid email | да | - |
| password | string | - | да | - |

**Responses:**
- **200 OK** - Возвращает пару токенов.
- **401 Unauthorized** - Неверные учетные данные.

### POST /auth/logout
**Назначение:** Выход пользователя из системы.
**Access:** authenticated

**Responses:**
- **204 No Content** - Успешный выход.
- **401 Unauthorized** - Если токен не предоставлен или невалиден.

### GET /auth/google/redirect
**Назначение:** Перенаправление пользователя на страницу аутентификации Google.
**Access:** public

**Responses:**
- **302 Found** - Redirect на `accounts.google.com`.

### GET /auth/google/callback
**Назначение:** Обработка колбэка от Google после аутентификации.
**Access:** public

**Query params:** `code`, `state`

**Responses:**
- **200 OK** - Возвращает пару токенов.
- **500 Internal Server Error** - Ошибка при обмене кода на токен Google.

## 4) Таблица трассируемости
| RQ-ID | Эндпоинты |
|---|---|
| FR-01 | Все эндпоинты |

## 5) Открытые вопросы
- **[OPEN QUESTION]** Какова структура JWT токенов и их время жизни (access, refresh)?
- **[OPEN QUESTION]** Как и где клиент должен хранить токены (cookie vs localStorage)?
- **[OPEN QUESTION]** Каковы точные политики безопасности для пароля?