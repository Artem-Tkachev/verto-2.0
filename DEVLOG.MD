# Шпаргалка по SQL

## Структура таблиц

```sql
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);   -- создать таблицу
DROP TABLE users;                                          -- удалить таблицу целиком
ALTER TABLE users ADD COLUMN age INTEGER;                  -- добавить колонку
```

## Чтение данных

```sql
SELECT * FROM users;                        -- все колонки, все строки
SELECT name, age FROM users;                 -- только нужные колонки

SELECT * FROM users WHERE age > 18;          -- фильтр

SELECT * FROM users ORDER BY age DESC;       -- сортировка (DESC = по убыванию, ASC = по возрастанию)

SELECT * FROM users LIMIT 10;                -- ограничить число строк

SELECT orders.id, users.name                 -- соединить две таблицы
FROM orders
JOIN users ON orders.user_id = users.id;

SELECT age, COUNT(*) FROM users GROUP BY age; -- сгруппировать для подсчёта
```

## Изменение данных

```sql
INSERT INTO users (name, age) VALUES ('Артём', 25);   -- добавить строку

UPDATE users SET age = 26 WHERE name = 'Артём';        -- изменить строки

DELETE FROM users WHERE name = 'Артём';                 -- удалить строки
```

## Условия внутри WHERE

```sql
WHERE age > 18          -- больше
WHERE age >= 18         -- больше или равно
WHERE age = 18          -- равно
WHERE age != 18         -- не равно
WHERE age BETWEEN 18 AND 30
WHERE name LIKE 'Ар%'   -- начинается на "Ар" (% — любые символы)
WHERE name IN ('Артём', 'Леша')
WHERE age IS NULL       -- поле пустое
AND / OR                -- несколько условий сразу
```

## Агрегатные функции

```sql
SELECT COUNT(*) FROM users;    -- количество строк
SELECT AVG(age) FROM users;    -- среднее значение
SELECT MAX(age) FROM users;    -- максимум
SELECT MIN(age) FROM users;    -- минимум
SELECT SUM(age) FROM users;    -- сумма
```

---

## Python + sqlite3: базовые функции

```python
import sqlite3

conn = sqlite3.connect("shop.db")   # открыть/создать файл базы
cursor = conn.cursor()              # инструмент для выполнения запросов

cursor.execute("SELECT * FROM products")            # выполнить запрос
cursor.execute("SELECT * FROM products WHERE id = ?", (5,))  # с параметром (безопасно)

row = cursor.fetchone()   # одна строка результата (или None)
rows = cursor.fetchall()  # все строки результата (список)

conn.commit()   # сохранить изменения (нужно после INSERT/UPDATE/DELETE/CREATE)
conn.close()    # закрыть соединение

# результат по умолчанию — кортеж: row[0], row[1], row[2]...
# чтобы обращаться по имени колонки (row["name"]):
conn.row_factory = sqlite3.Row
```