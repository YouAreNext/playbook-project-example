# Entity: Trip

## 1) Спецификации сущности
### Сущность: `trips`
**Описание:** Основная сущность, представляющая путешествие пользователя.

**Атрибуты**
| Поле | Тип данных | Описание | Ограничения/Примечания | Обязательное |
|---|---|---|---|---|
| id | uuid | PK | PRIMARY KEY | да |
| user_id | uuid | FK на `users.id` | NOT NULL, ON DELETE CASCADE | да |
| original_prompt | text | Исходный запрос пользователя | NOT NULL | да |
| status | varchar(50) | Статус генерации | NOT NULL, CHECK (status IN ('PROCESSING', 'COMPLETED', 'FAILED')) | да |
| created_at | timestamptz | Дата создания | NOT NULL, default now() | да |
| updated_at | timestamptz | Дата обновления | NOT NULL, default now() | да |

**Связи**
- 1:N с `trip_days` (одно путешествие имеет много дней).

**Индексы**
- `trips_user_id_idx` (B-Tree) на `user_id` для быстрого получения всех путешествий пользователя.

**Жизненный цикл / Статусы**
- `PROCESSING` → `COMPLETED` | `FAILED`
