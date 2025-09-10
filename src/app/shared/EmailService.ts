// Простой сервис для отправки email через Gmail API
export class EmailService {
  private static async sendEmailViaGmailAPI(
    to: string,
    subject: string,
    body: string
  ): Promise<boolean> {
    try {
      // Используем Gmail API через простой webhook или сервис
      // Для статического сайта лучше использовать внешний сервис
      
      // Альтернатива: отправка через Formspree, EmailJS или другой сервис
      const response = await fetch('https://formspree.io/f/xpwgkqgk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'FreshRoom Bot',
          email: 'noreply@freshroom.ru',
          message: `Заявка с сайта FreshRoom:\n\n${body}`,
          _subject: subject,
          _replyto: to,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Email sending error:', error);
      return false;
    }
  }

  static async sendLeadNotification(
    name: string,
    phone: string,
    details?: string
  ): Promise<boolean> {
    const subject = `Новая заявка с сайта FreshRoom - ${name}`;
    const body = `
Новая заявка с сайта FreshRoom:

Имя: ${name}
Телефон: ${phone}
${details ? `Комментарий: ${details}` : ''}
Время: ${new Date().toLocaleString("ru-RU")}

---
Отправлено автоматически с сайта FreshRoom
    `.trim();

    return await this.sendEmailViaGmailAPI('chaplinrus@gmail.com', subject, body);
  }
}
