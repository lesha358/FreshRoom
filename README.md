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

1. Создайте приложение типа **Static Site** (не Next.js!)
2. Подключите репозиторий
3. Build Command: `npm run build`
4. Output Directory: `out`
5. Установите переменные окружения при необходимости

**Важно:** Используйте тип "Static Site", а не "Next.js", так как проект настроен на статический экспорт.

## Маршруты

- `/` — лендинг
- Форма заявок отправляется напрямую в Telegram (клиентская сторона)

## Отправка заявок (Telegram)

Для отправки заявок в Telegram укажите переменные окружения в настройках Timeweb Cloud:

```
# Telegram bot (обязательно для работы формы)
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token
NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id
```

**Создание Telegram бота:**
1. Напишите @BotFather в Telegram
2. Создайте нового бота командой `/newbot`
3. Получите токен бота
4. Узнайте ID чата (можно через @userinfobot)
5. Добавьте переменные в настройки Timeweb Cloud

## SEO

Метаданные в `src/app/layout.tsx` (title, description, OpenGraph). Замените URL/изображения под свой домен.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Лицензия

MIT
