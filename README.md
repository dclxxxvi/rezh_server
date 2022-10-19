## Description

[Nest](https://github.com/nestjs/nest) документация.

## Выкачка проекта

1. Качаем Git: https://gitforwindows.org/
2. Открываем Git Bash
3. Переходим в папку в которую хотим загрузить проект
4. Выполняем команду **git clone https://github.com/dclxxxvi/rezh_server.git**

## Установка пакетов

```bash
$ npm install
```

## База данных

Для работы бэкэнда нужно локально поднять базу данных. Используется PostreSQL. Инструкция для подключения:

1. Скачать [PostreSQL](https://www.postgresql.org/download/)
2. Скачать [PgAdmin 4](https://www.pgadmin.org/download/)
3. Зайти в pgadmin
4. Ввести мастер-пароль **rezhhleb12345**
5. Databases>Create>Database...
6. В появившемся окне введите название БД(Поле Database): **rezh_web_service**
7. Пользователь: **postgres**
8. Не закрываем pgAdmin, база создана
9. Поднимаем бэк командой в терминале **npm run start**


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
