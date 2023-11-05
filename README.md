## Description
Что это: - Типа пинтерест. Загружаются картики. Qube - это и есть картинка загружаемая пользователем. Хотел еще коментарии к картинкам добавить.

Что сделано:
  - JWT Авторизация без рефреш
  - Есть админка, контроллеры: users, roles. Ограничение сделано декоратором Roles() и RolesGuard (глобально)
  - Uploading
  - Связи: users - roles, qube - user.
  - swager (auth, users, roles)

Что не сделано:
  - пагинация
  - пароль не скрыт при возврате фронтенду (интерсептор c декоратором @Exclude не помогли)
  - не валидируется mime при загрузке картинки

## Swager api docs
route browser to http://localhost:3000/api

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Empty
