# Entity: Location

## 1) Спецификации сущности
### Сущность: `locations`
**Описание:** Представляет локацию или точку интереса в рамках одного дня путешествия.

**Атрибуты**
| Поле | Тип данных | Описание | Ограничения/Примечания | Обязательное |
|---|---|---|---|---|
| id | uuid | PK | PRIMARY KEY | да |
| trip_day_id | uuid | FK на `trip_days.id` | NOT NULL, ON DELETE CASCADE | да |
| name | varchar(255) | Название локации | NOT NULL | да |
| description | text | Описание локации | - | нет |
| time_slot | varchar(100) | Рекомендуемое время | - | нет |
| lat | numeric(10, 7) | Широта | NOT NULL | да |
| lon | numeric(10, 7) | Долгота | NOT NULL | да |
| order | integer | Порядок локации внутри дня | NOT NULL | да |

**Связи**
- N:1 с `trip_days`.

**Индексы**
- `locations_trip_day_id_idx` на `trip_day_id`.
