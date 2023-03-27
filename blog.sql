create database blog;
use blog;
create table paper
(
    id          int auto_increment,
    title       varchar(128)                        not null,
    tag         varchar(128)                        null,
    summary     varchar(1280)                       null,
    content     mediumtext                          null,
    author      varchar(64)                         not null,
    url         varchar(256)                        null,
    watcher     int       default 0                 not null,
    create_time timestamp default CURRENT_TIMESTAMP not null,
    update_time timestamp default CURRENT_TIMESTAMP not null,
    constraint paper_id_uindex
        unique (id)
);

create table t_base_pinyin
(
    pin_yin_ varchar(255) charset gbk not null,
    code_    int                      not null
        primary key
)
    charset = latin1;

create table user
(
    id          int auto_increment,
    acount      varchar(64)                         not null,
    password    varchar(128)                        not null,
    create_time timestamp default CURRENT_TIMESTAMP null,
    update_time timestamp default CURRENT_TIMESTAMP null,
    constraint user_id_uindex
        unique (id)
);

create
    definer = root@`%` function to_pinyin(NAME varchar(255)) returns varchar(255)
BEGIN
    DECLARE mycode INT;
    DECLARE tmp_lcode VARCHAR(2) CHARSET gbk;
    DECLARE lcode INT;
    DECLARE tmp_rcode VARCHAR(2) CHARSET gbk;
    DECLARE rcode INT;
    DECLARE mypy VARCHAR(255) CHARSET gbk DEFAULT '';
    DECLARE lp INT;
    SET mycode = 0;
    SET lp = 1;
    SET NAME = HEX(NAME);
    WHILE lp < LENGTH(NAME) DO
        SET tmp_lcode = SUBSTRING(NAME, lp, 2);
        SET lcode = CAST(ASCII(UNHEX(tmp_lcode)) AS UNSIGNED);
        SET tmp_rcode = SUBSTRING(NAME, lp + 2, 2);
        SET rcode = CAST(ASCII(UNHEX(tmp_rcode)) AS UNSIGNED);
        IF lcode > 128 THEN
            SET mycode =65536 - lcode * 256 - rcode ;
            SELECT CONCAT(mypy,pin_yin_) INTO mypy FROM t_base_pinyin WHERE CODE_ >= ABS(mycode) ORDER BY CODE_ ASC LIMIT 1;
            SET lp = lp + 4;
        ELSE
            SET mypy = CONCAT(mypy,CHAR(CAST(ASCII(UNHEX(SUBSTRING(NAME, lp, 2))) AS UNSIGNED)));
            SET lp = lp + 2;
        END IF;
    END WHILE;
    RETURN LOWER(mypy);
END;


