# Entity: TripDay

## 1) Спецификации сущности
### Сущность: `trip_days`
**Описание:** Представляет один день в рамках путешествия.

**Атрибуты**
| Поле | Тип данных | Описание | Ограничения/Примечания | Обязательное |
|---|---|---|---|---|
| id | uuid | PK | PRIMARY KEY | да |
| trip_id | uuid | FK на `trips.id` | NOT NULL, ON DELETE CASCADE | да |
| day_number | integer | Порядковый номер дня | NOT NULL | да |
| title | varchar(255) | Название/тема дня | NOT NULL | да |

**Связи**
- 1:N с `locations` через связующую таблицу `trip_day_locations`.
- N:1 с `trips`.

**Индексы**
- `trip_days_trip_id_idx` на `trip_id`.
- Уникальный составной индекс на (`trip_id`, `day_number`).
