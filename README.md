# AniList GraphQL App

Приложение работает с [AniList API](https://docs.anilist.co/), крупной базой данных аниме и связанных с ним данных. Пет-проект нацелен на работу с 
- Виртуализацией
- GraphQL
- Shadcn/ui

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
