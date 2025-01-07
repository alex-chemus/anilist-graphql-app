# AniList GraphQL App

В начале разработки приложение должно было быть на другую тему и работать на [Star Wars API](http://graphql.org/swapi-graphql/). Однако возникли [проблемы](https://github.com/graphql/swapi-graphql/issues/229) с API, поэтому пришлось менять тематику пет-проекта и искать замену API. Итоговое приложение работает с [AniList API](https://docs.anilist.co/)

## Просмотр и разработка

Перед запуском необходимо скопировать переменные окружения из `.env.example` в `.env`, перед этим создав файл окружения `.env`

Запуск приложения в dev-режиме

```bash
npm install
npm run dev
```

Генерация GraphQL

```bash
npm run gql
```

Или

```bash
npm run gql:watch
```

Генерация компонентов Shadcn/ui

```bash
npm run shadcn:add -- <component>
```

## Технологии

- Tailwind и Shadcn/ui
- GraphQL и React Query
- Virtuoso
- В планах поэкспериментировать с TanStack Router (на отдельной ветке)
