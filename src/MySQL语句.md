### SQL通用语法

1. 语句以分号结尾
2. 使用空格、缩进来增强语句的可读性
3. 不区分大小写，关键字建议使用大写
4. 注释：单行：`-- 注释内容`；多行：`/* 注释内容 */`

### SQL语句分类

1. **DDL**：数据定义，定义数据库对象（数据库，表，字段）
2. **DML**：数据操作，对数据库表中的数据进行增删改
3. **DQL**：数据查询，查询数据库中表的记录
4. **DCL**：数据控制，创建数据库用户、控制数据库的访问权限

## DDL（数据定义）

#### - 数据库操作

**1.查询**

**所有数据库**

```sql
SHOW DATABASES;
```

**当前数据库**

```sql
SELECT DATABASE();
```

**2.创建**

```sql
CREATE DATABASE database_name;
```

**3.删除**

```SQL
DROP DATABASE database_name;
```

**4.使用**

```sql
USE database_name;
```

#### - 表操作

**1.创建**

```sql
CREATE TABLE tableName(
    field_name type [COMMENT 'content'],
    .....
) [COMMENT 'content'];
```

**2.查询**

**所有表**

```sql
SHOW TABLES;
```

**表结构**

```sql
DESC tableName;
```

**建表语句**

```sql
SHOW CREATE TABLE tableName;
```

**3.修改**

**添加字段**

```sql
ALTER TABLE tableName ADD field_name type [COMMENT 'content'] [CONSTRAINT];
```

**修改字段数据类型**

```sql
ALTER TABLE tableName MODIFY field_name newType;
```

**修改字段名和字段类型**

```sql
ALTER TABLE tableName CHANGE old_field new_field type [COMMENT 'content'] [CONSTRAINT];
```

**4.删除**

**删除表**

```sql
DROP TABLE tableName;
```

**删除指定表，并重新创建该表**

```sql
TRUNCATE TABLE tableName;
```

#### - 日期类型

1. **DATE**：日期，YYYY-MM-DD
2. **TIME**：时间，HH:MM:SS
3. **YEAR**：年份，YYYY
4. **DATATIME**：混合日期和时间，YYYY-MM-DD HH:MM:SS
5. **TIMESTAMP**：混合日期和时间，时间戳，YYYY-MM-DD HH:MM:SS

## DML（数据操作）

**1.添加数据**

**指定字段添加数据**

```sql
INSERT INTO tableName (field1,field2,...) VALUES (val1,val2,...);
```

**给全部字段添加数据**

```sql
INSERT INTO VALUES (val1,val2,...);
```

**批量添加数据**

```sql
INSERT INTO tableName (field1,field2,...) VALUES (val1,val2,...),(val1,val2,...),...;
INSERT INTO VALUES (val1,val2,...),(val1,val2,...),...;
```

> 添加数据需要特别**注意顺序**问题

**2.修改数据**

```sql
UPDATE tableName SET field1=val1,field2=val2,... WHERE...;
UPDATE tableName SET field1=val1,field2=val2,...; -- 无条件，则修改所有行（换成统一数据）
```

**3.删除数据**

```sql
DELETE FROM tableName WHERE...; -- 删除行
DELETE FROM tableName; -- 无条件，删除所有行（清空表）
```

## DQL（数据查询）

#### - 基本查询

**查询多个字段**

```sql
SELECT * FROM tableName;
SELECT field1,field2,... FROM tableName;
```

**设置别名**

```sql
SELECT field1 AS name1, field2 AS name2, ... FROM tableName;
```

**去除重复记录**

```sql
SELECT DISTINCT field_name FROM tableName;
```

#### - 条件查询

```sql
SELECT field_name FROM tableName WHERE...;
```

**条件集合**：

1. `<> 或 !=` (不等于)
2. `BETWEEN ... AND ...` (在某个范围之内，含最大/小值)
3. `IN(...)` (匹配列表中的具体值，类似or)
4. `LIKE` (模糊匹配，_匹配单个字符,%匹配任意个字符)
5. `IS NULL` (是NULL)
6. `AND 或 &&` (并且，多个条件同时成立)
7. `OR 或 ||` (或者，多个条件任意一个成立)
8. `NOT 或 !` (非，不是)

#### - 聚合查询

将一列数据作为整体，进行纵向计算(NULL不参与聚合计算)

```sql
SELECT FUNCTION(field_name) FROM tableName [WHERE...];
```

**聚合函数**：

1. `count()` 统计数量
2. `max()` 最大值
3. `min()` 最小值
4. `avg()` 平均值
5. `sum()` 求和

#### - 分组查询

```sql
SELECT field_name FROM tableName [WHERE...] GROUP BY field_name [HAVING...];
```

**注意**：

- 执行顺序：`WHERE` > 聚合函数 > `HAVING`

- 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段则毫无意义

#### - 排序查询

#### - 分页查询

```sql
SELECT field_name FROM tableName LIMIT _start, _count;
```

**注意**：

- 起始索引从0开始，起始索引 =**（ 查询页码 - 1 ）* 每页显示记录数**。
- 分页查询是数据库的方言，不同的数据库有不同的实现，MySQL中是 LIMIT。
- 如果查询的是一页数据，起始索引可以省略，直接简写为 limit 10。

#### - 执行顺序

1. `FROM` 表名
2. `WHERE` 条件
3. `GROUP BY` 分组
4. `HAVING` 分组条件，相当于分组中的 WHERE
5. `SELECT` 字段
6. `ORDER BY` 排序
7. `LIMIT` 分页