FreshRoom — сайт клининговой компании на Next.js (App Router, TypeScript).

## Запуск локально

1. Установить зависимости: `npm install`
2. Запустить dev‑сервер:

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

Основная страница — `src/app/page.tsx`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Деплой на Timeweb Cloud (Apps)

1. Создайте приложение типа Next.js (Node 22)
2. Подключите репозиторий
3. Build Command: `npm run build`
4. Start Command: `npm start`
5. Установите переменные окружения при необходимости

## Маршруты

- `/` — лендинг
- `POST /api/lead` — приём формы (пишет в логи)

## Отправка заявок (email + Telegram)

Для отправки заявок на почту Gmail и в Telegram укажите переменные окружения в `.env.local` в корне проекта:

```
# Telegram bot (опционально)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Gmail SMTP (рекомендуется App Password)
GMAIL_USER=
GMAIL_PASS=

# Получатель письма
MAIL_TO=chaplinrus@gmail.com
```

Gmail: создайте App Password в Google Account → Security → 2‑Step Verification → App passwords → Mail. После изменения переменных перезапустите `npm run dev`.

## SEO

Метаданные в `src/app/layout.tsx` (title, description, OpenGraph). Замените URL/изображения под свой домен.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Лицензия

MIT
