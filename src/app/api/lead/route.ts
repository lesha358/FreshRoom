import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = String(formData.get("name") || "");
  const phone = String(formData.get("phone") || "");
  const details = String(formData.get("details") || "");
  const calculationData = formData.get("calculationData");

  const lead = { 
    name, 
    phone, 
    details, 
    calculationData: calculationData ? JSON.parse(String(calculationData)) : null,
    createdAt: new Date().toISOString() 
  };

  // Лог в консоль для бэкапа
  console.log("FreshRoom lead:", lead);

  // Подготовка текста заявки
  const subject = `Новая заявка с сайта FreshRoom`;
  
  const text = [
    `Новая заявка:`,
    `Имя: ${name || "—"}`,
    `Телефон: ${phone || "—"}`,
  ];

  // Добавляем данные расчета если есть
  if (lead.calculationData) {
    const calc = lead.calculationData;
    text.push(
      ``,
      `📊 ДАННЫЕ РАСЧЁТА:`,
      `Тип помещения: ${calc.propertyType === 'apartment' ? 'Квартира' : calc.propertyType === 'house' ? 'Дом' : 'Офис'}`,
      `Площадь: ${calc.area} м²`,
      `Комнат: ${calc.rooms}`,
      `Тип уборки: ${calc.cleaningType === 'regular' ? 'Поддерживающая' : calc.cleaningType === 'deep' ? 'Генеральная' : 'После ремонта'}`,
      `Доп. услуги: ${calc.additionalServices.length} шт.`,
      `💰 Стоимость: ${calc.totalPrice.toLocaleString()} ₽`
    );
  }

  text.push(
    details ? `Комментарий: ${details}` : undefined,
    `Время: ${new Date().toLocaleString("ru-RU")}`
  );

  const finalText = text.filter(Boolean).join("\n");

  // Отправка в Telegram (через бота)
  const sendTelegram = async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID; // например, ID @miya_b
    console.log("Telegram config:", { token: token ? "SET" : "NOT SET", chatId });
    if (!token || !chatId) {
      console.log("Telegram: Missing config, skipping");
      return;
    }
    try {
      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: finalText, parse_mode: "HTML" }),
      });
      const result = await response.json();
      console.log("Telegram result:", result);
    } catch (error) {
      console.error("Telegram error:", error);
    }
  };

  // Отправка на почту через Gmail (рекомендуется App Password)
  const sendEmail = async () => {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS; // App Password из аккаунта Google
    const to = process.env.MAIL_TO || "chaplinrus@gmail.com";
    console.log("Email config:", { user, pass: pass ? "SET" : "NOT SET", to });
    if (!user || !pass) {
      console.log("Email: Missing config, skipping");
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      });

      const result = await transporter.sendMail({
        from: `FreshRoom <${user}>`,
        to,
        subject,
        text: finalText,
      });
      console.log("Email sent:", result.messageId);
    } catch (error) {
      console.error("Email error:", error);
    }
  };

  await Promise.allSettled([sendTelegram(), sendEmail()]);

  return NextResponse.json({ ok: true });
}


