"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Calculator from "./shared/Calculator";

export default function Home() {
  const [showUp, setShowUp] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadSent, setLeadSent] = useState<null | "ok" | "error">(null);
  const [calculationData, setCalculationData] = useState<{
    propertyType: string;
    rooms: number;
    area: number;
    cleaningType: string;
    additionalServices: string[];
    totalPrice: number;
  } | null>(null);

  // Функция для получения названий дополнительных услуг
  const getServiceLabel = (service: string) => {
    const labels: Record<string, string> = {
      "windows": "Мытьё окон",
      "balcony": "Уборка балкона",
      "refrigerator": "Чистка холодильника",
      "oven": "Чистка духовки",
      "carpet": "Чистка ковров",
      "curtains": "Стирка штор",
      "chandelier": "Чистка люстры",
      "furniture": "Чистка мебели",
      "fireplace": "Чистка камина",
      "stairs": "Уборка лестниц",
      "kitchen": "Уборка кухни",
      "bathroom": "Уборка санузлов"
    };
    return labels[service] || service;
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowUp(y > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Загружаем данные расчета из sessionStorage
  useEffect(() => {
    const checkForCalculationData = () => {
      const savedData = sessionStorage.getItem('calculationData');
      if (savedData && !calculationData) {
        try {
          const data = JSON.parse(savedData);
          setCalculationData(data);
          // Очищаем данные после загрузки
          sessionStorage.removeItem('calculationData');
        } catch (error) {
          console.error('Error parsing calculation data:', error);
        }
      }
    };

    checkForCalculationData();
    
    // Проверяем каждые 500мс на случай, если данные появились после загрузки
    const interval = setInterval(checkForCalculationData, 500);
    
    return () => clearInterval(interval);
  }, [calculationData]);

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadLoading(true);
    setLeadSent(null);
    
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const name = formData.get("name");
      const phone = formData.get("phone");
      const details = formData.get("details");
      
      // Создаем сообщение для Telegram
      const message = `Новая заявка с сайта FreshRoom:
Имя: ${name}
Телефон: ${phone}
${details ? `Комментарий: ${details}` : ''}
Время: ${new Date().toLocaleString("ru-RU")}`;
      
      // Отправляем в Telegram через бота (если настроен)
      const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
      
      console.log("Telegram config:", { 
        token: telegramBotToken ? "SET" : "NOT SET", 
        chatId: telegramChatId ? "SET" : "NOT SET" 
      });
      
      if (telegramBotToken && telegramChatId) {
        console.log("Sending to Telegram:", message);
        const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            chat_id: telegramChatId, 
            text: message,
            parse_mode: "HTML"
          }),
        });
        
        const result = await response.json();
        console.log("Telegram response:", result);
        
        if (!response.ok) {
          throw new Error(`Telegram API error: ${result.description || 'Unknown error'}`);
        }
      } else {
        console.log("Telegram not configured, skipping");
      }
      
      setLeadSent("ok");
      form.reset();
    } catch (error) {
      console.error("Error sending lead:", error);
      setLeadSent("error");
    } finally {
      setLeadLoading(false);
    }
  };
  return (
    <div>
      <main>
        <section className="hero">
          <div className="container hero-wrap">
            <div className="hero-col">
              <div className="hero-badges">
                <div className="hero-badge">
                  <span className="badge-icon">🔥</span>
                  <span>Скидка 20% на первую уборку</span>
                </div>
                <div className="hero-badge top-badge">
                  <span className="badge-icon">🏆</span>
                  <span>Топ-10 в Москве</span>
                </div>
              </div>
              
              <h1>Профессиональная уборка в Москве — Клининг квартир и домов</h1>
              <p className="hero-subtitle">Вернитесь домой к идеальной чистоте за 2 часа. Генеральная уборка, уборка после ремонта, эко-средства.</p>
              
              <div className="hero-cta">
                <a href="#contact" className="btn-primary hero-primary-btn">
                  <span className="btn-icon">📱</span>
                  Рассчитать стоимость
                </a>
                <a href="tel:+79932586621" className="btn-secondary">
                  <span className="btn-icon">📞</span>
                  Позвонить сейчас
                </a>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">2500+</div>
                  <div className="stat-label">убранных квартир</div>
                </div>
                <div className="stat-item">
                  <div className="stat-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating">4.9/5</span>
                  </div>
                  <div className="stat-label">рейтинг на Яндекс</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">2ч</div>
                  <div className="stat-label">среднее время</div>
                </div>
              </div>
            </div>
            
            <div className="hero-art">
              <div className="hero-logo-container">
                <Image className="hero-logo" src="/logo-freshroom.png" alt="FreshRoom — профессиональная уборка квартир и домов в Москве" width={200} height={200} />
              </div>
              
              <div className="hero-trust-cards">
                <div className="trust-card">
                  <span className="trust-icon">🛡️</span>
                  <div className="trust-content">
                    <h4>Страхование имущества</h4>
                    <p>До 1 млн ₽</p>
                  </div>
                </div>
                <div className="trust-card">
                  <span className="trust-icon">📋</span>
                  <div className="trust-content">
                    <h4>Официальная лицензия</h4>
                    <p>Все документы</p>
                  </div>
                </div>
                <div className="trust-card">
                  <span className="trust-icon">💚</span>
                  <div className="trust-content">
                    <h4>Эко-средства</h4>
                    <p>Безопасно для детей</p>
                  </div>
                </div>
              </div>
              
              <div className="hero-guarantee">
                <div className="guarantee-icon">✅</div>
                <div className="guarantee-text">
                  <strong>Гарантия качества 24 часа</strong>
                  <span>Если не устроит — переделаем бесплатно</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <h2>Услуги клининга в Москве — Профессиональная уборка квартир и домов</h2>
            <div className="grid-3">
              <div className="card service-card">
                <div className="service-icon">🏠</div>
                <h3>Уборка квартир</h3>
                <p>Поддерживающая, генеральная, после ремонта. Используем только эко-средства безопасные для детей и животных.</p>
                <div className="service-price">от 2 500 ₽</div>
                <ul className="service-features">
                  <li>Все комнаты и санузлы</li>
                  <li>Кухня и бытовая техника</li>
                  <li>Влажная уборка полов</li>
                  <li>Вынос мусора</li>
                </ul>
                <a href="#contact" className="service-btn">Заказать уборку</a>
              </div>
              <div className="card service-card">
                <div className="service-icon">🏡</div>
                <h3>Уборка домов</h3>
                <p>Коттеджи, таунхаусы, загородные дома. Профессиональный клининг больших площадей с учётом всех особенностей.</p>
                <div className="service-price">от 4 000 ₽</div>
                <ul className="service-features">
                  <li>Все этажи и комнаты</li>
                  <li>Лестницы и холлы</li>
                  <li>Террасы и веранды</li>
                  <li>Гаражи и подвалы</li>
                </ul>
                <a href="#contact" className="service-btn">Заказать уборку</a>
              </div>
              <div className="card service-card">
                <div className="service-icon">🏢</div>
                <h3>Офисы и бизнес</h3>
                <p>Ежедневная и разовая уборка офисов, торговых центров, кафе и ресторанов. Работаем по договору с юридическими лицами.</p>
                <div className="service-price">от 3 000 ₽</div>
                <ul className="service-features">
                  <li>Рабочие места и переговорные</li>
                  <li>Кухни и зоны отдыха</li>
                  <li>Санузлы и коридоры</li>
                  <li>Закрывающие документы</li>
                </ul>
                <a href="#contact" className="service-btn">Заказать уборку</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="container">
            <h2>Как проходит профессиональная уборка в Москве</h2>
            <div className="grid-3">
              <div className="card process-card">
                <div className="process-number">1</div>
                <h3>Оставляете заявку</h3>
                <p>Звоните, пишите в WhatsApp или оставляете заявку на сайте. Перезваниваем в течение 10 минут и подтверждаем детали.</p>
                <div className="process-time">⏱️ Ответ за 10 минут</div>
              </div>
              <div className="card process-card">
                <div className="process-number">2</div>
                <h3>Рассчитываем стоимость</h3>
                <p>Уточняем площадь, количество комнат, тип уборки. Называем точную стоимость и согласуем удобное время приезда.</p>
                <div className="process-time">💰 Фиксированная цена</div>
              </div>
              <div className="card process-card">
                <div className="process-number">3</div>
                <h3>Выполняем уборку</h3>
                <p>Приезжаем точно в срок с профессиональным оборудованием и средствами. Убираем качественно и сдаём работу.</p>
                <div className="process-time">✨ Идеальный результат</div>
              </div>
            </div>
            <div className="process-guarantee">
              <div className="guarantee-card">
                <span className="guarantee-icon">🛡️</span>
                <div className="guarantee-content">
                  <h4>Гарантия качества 24 часа</h4>
                  <p>Если что-то не устроит — переделаем бесплатно или вернём деньги</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section muted" id="includes">
          <div className="container">
            <h2>Что входит в профессиональную уборку квартир</h2>
            <div className="grid-2">
              <ul className="list">
                <li>Пылесосим и влажная уборка полов</li>
                <li>Удаляем пыль со всех доступных поверхностей</li>
                <li>Моем кухонные поверхности и технику снаружи</li>
                <li>Дезинфицируем санузлы, оттираем налёт</li>
              </ul>
              <ul className="list">
                <li>Застилаем постель/меняем бельё (по запросу)</li>
                <li>Собираем и выносим мусор</li>
                <li>Чистим зеркала и стеклянные поверхности</li>
                <li>Используем безопасные эко‑средства</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="prices" className="section muted">
          <div className="container">
            <h2>Калькулятор стоимости уборки в Москве</h2>
            <Calculator />
          </div>
        </section>

        <section id="benefits" className="section">
          <div className="container">
            <h2>Почему выбирают FreshRoom для уборки в Москве</h2>
            <div className="grid-3">
              <div className="benefit">
                <div className="benefit-icon">👥</div>
                <h3>Опытные клинеры</h3>
                <p>Собственная команда профессионалов с опытом от 2 лет. Все сотрудники проходят обучение и проверку.</p>
                <div className="benefit-stats">2+ года опыта</div>
              </div>
              <div className="benefit">
                <div className="benefit-icon">🛡️</div>
                <h3>Полная гарантия</h3>
                <p>Страхование имущества до 1 млн ₽. Переделка бесплатно в течение 24 часов, если что-то не устроит.</p>
                <div className="benefit-stats">До 1 млн ₽ страховка</div>
              </div>
              <div className="benefit">
                <div className="benefit-icon">🌿</div>
                <h3>Эко-средства</h3>
                <p>Используем только безопасную профессиональную химию. Подходит для домов с детьми и животными.</p>
                <div className="benefit-stats">100% безопасно</div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="section muted">
          <div className="container">
            <h2>Отзывы клиентов о клининге FreshRoom в Москве</h2>
            <div className="grid-2">
              <div className="review-card">
                <div className="review-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">5.0</span>
                </div>
                <blockquote>«Ребята убрали квартиру после ремонта просто идеально! Приехали вовремя, работали быстро и очень аккуратно. Все труднодоступные места вычистили. Теперь буду обращаться только к ним!»</blockquote>
                <div className="review-author">
                  <div className="author-avatar">А</div>
                  <div className="author-info">
                    <span className="author-name">Анна Петрова</span>
                    <span className="author-location">Москва, Тверской р-н</span>
                  </div>
                </div>
              </div>
              <div className="review-card">
                <div className="review-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">5.0</span>
                </div>
                <blockquote>«Заказывал генеральную уборку трёхкомнатной квартиры. Работали 3 человека, справились за 4 часа. Качество на высоте — каждый уголок блестит! Цена адекватная, рекомендую всем.»</blockquote>
                <div className="review-author">
                  <div className="author-avatar">С</div>
                  <div className="author-info">
                    <span className="author-name">Сергей Волков</span>
                    <span className="author-location">Москва, Южное Бутово</span>
                  </div>
                </div>
              </div>
              <div className="review-card">
                <div className="review-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">5.0</span>
                </div>
                <blockquote>«Постоянно пользуюсь услугами FreshRoom для уборки квартиры. Всегда качественно, в срок, с договором и документами. Сотрудники вежливые и профессиональные.»</blockquote>
                <div className="review-author">
                  <div className="author-avatar">Е</div>
                  <div className="author-info">
                    <span className="author-name">Елена Смирнова</span>
                    <span className="author-location">Частный клиент</span>
                  </div>
                </div>
              </div>
              <div className="review-card">
                <div className="review-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">5.0</span>
                </div>
                <blockquote>«У нас маленький ребёнок, поэтому очень важна безопасность средств. В FreshRoom используют экологичную химию — никаких запахов и аллергии. Отличная работа!»</blockquote>
                <div className="review-author">
                  <div className="author-avatar">М</div>
                  <div className="author-info">
                    <span className="author-name">Мария Козлова</span>
                    <span className="author-location">Москва, Люберцы</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="reviews-stats">
              <div className="review-stat">
                <span className="stat-number">4.9/5</span>
                <span className="stat-label">Средний рейтинг</span>
              </div>
              <div className="review-stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Отзывов на Яндекс</span>
              </div>
              <div className="review-stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Повторных заказов</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container">
            <h2>Частые вопросы о клининге и уборке в Москве</h2>
            <div className="grid-2">
              <div className="faq">
                <div className="faq-question">В каких районах Москвы работаете?</div>
                <p className="faq-answer">Работаем во всех районах Москвы и Московской области. Выезжаем в Подмосковье: Химки, Мытищи, Королёв, Балашиха, Люберцы и другие города.</p>
              </div>
              <div className="faq">
                <div className="faq-question">Что входит в стоимость уборки?</div>
                <p className="faq-answer">Все расходники, профессиональная химия, инвентарь и оборудование. Доплачивать за материалы не нужно — всё включено в стоимость услуги.</p>
              </div>
              <div className="faq">
                <div className="faq-question">Какие способы оплаты принимаете?</div>
                <p className="faq-answer">Наличные, банковские карты, переводы на карту или по счёту. Для юридических лиц работаем по договору с полным комплектом документов.</p>
              </div>
              <div className="faq">
                <div className="faq-question">Сколько времени занимает уборка?</div>
                <p className="faq-answer">Стандартная квартира (1-3 комнаты): 2-4 часа. Большие квартиры и дома: 4-8 часов. Точное время зависит от площади и типа уборки.</p>
              </div>
              <div className="faq">
                <div className="faq-question">Можно ли заказать уборку на сегодня?</div>
                <p className="faq-answer">Да, часто можем приехать в день обращения. Особенно если заказ поступает до 14:00. В выходные и праздники — по возможности.</p>
              </div>
              <div className="faq">
                <div className="faq-question">Безопасны ли ваши средства?</div>
                <p className="faq-answer">Используем только сертифицированные эко-средства, безопасные для детей и животных. Все химикаты гипоаллергенны и не имеют резкого запаха.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <h2>Получите расчёт стоимости уборки в Москве за 30 секунд</h2>
            <div className="lead-card">
              <p className="lead-sub">Перезвоним в течение 10 минут, рассчитаем точную стоимость и подберём удобное время уборки</p>
              
              <div className="contact-urgency">
                <div className="urgency-item">
                  <span className="urgency-icon">⏰</span>
                  <span>Можем приехать сегодня</span>
                </div>
                <div className="urgency-item">
                  <span className="urgency-icon">💰</span>
                  <span>Скидка 20% на первый заказ</span>
                </div>
                <div className="urgency-item">
                  <span className="urgency-icon">🛡️</span>
                  <span>Гарантия качества 24 часа</span>
                </div>
              </div>
              
              <div className="contact-methods">
              <div className="contact-form">
                {calculationData && (
                  <div className="calculation-summary">
                    <h4>Данные вашего расчёта:</h4>
                    <div className="calculation-details">
                      <p><strong>Тип помещения:</strong> {
                        calculationData.propertyType === 'apartment' ? 'Квартира' :
                        calculationData.propertyType === 'house' ? 'Дом' : 'Офис'
                      }</p>
                      <p><strong>Площадь:</strong> {calculationData.area} м²</p>
                      <p><strong>Комнат:</strong> {calculationData.rooms}</p>
                      <p><strong>Тип уборки:</strong> {
                        calculationData.cleaningType === 'regular' ? 'Поддерживающая' :
                        calculationData.cleaningType === 'deep' ? 'Генеральная' : 'После ремонта'
                      }</p>
                      <p><strong>Доп. услуги:</strong> {calculationData.additionalServices.length > 0 
                        ? calculationData.additionalServices.map((service: string) => getServiceLabel(service)).join(', ')
                        : 'Нет'
                      }</p>
                      <p><strong>Стоимость:</strong> {calculationData.totalPrice.toLocaleString()} ₽</p>
                    </div>
                  </div>
                )}
                
                <form className="lead-form" onSubmit={handleLeadSubmit}>
                  <div className="lead-grid">
                    <div className="field">
                      <input id="lead-name" name="name" placeholder=" " required autoComplete="name" />
                      <label htmlFor="lead-name">Ваше имя</label>
                    </div>
                    <div className="field">
                      <input id="lead-phone" name="phone" placeholder=" " required inputMode="tel" autoComplete="tel" />
                      <label htmlFor="lead-phone">Телефон</label>
                    </div>
                  </div>
                  
                  {/* Скрытые поля с данными расчета */}
                  {calculationData && (
                    <>
                      <input type="hidden" name="calculationData" value={JSON.stringify(calculationData)} />
                      <input type="hidden" name="details" value={`Расчёт: ${calculationData.propertyType === 'apartment' ? 'Квартира' : calculationData.propertyType === 'house' ? 'Дом' : 'Офис'}, ${calculationData.area}м², ${calculationData.rooms} комнат, ${calculationData.cleaningType === 'regular' ? 'Поддерживающая' : calculationData.cleaningType === 'deep' ? 'Генеральная' : 'После ремонта'} уборка${calculationData.additionalServices.length > 0 ? ', ' + calculationData.additionalServices.map((service: string) => getServiceLabel(service)).join(', ') : ''}. Стоимость: ${calculationData.totalPrice.toLocaleString()} ₽`} />
                    </>
                  )}
                  
                  <button type="submit" className="btn-primary lead-submit" disabled={leadLoading} aria-busy={leadLoading}>
                    <span className="btn-icon">🚀</span>
                    {leadLoading ? "Отправляем..." : "Получить расчёт со скидкой 20%"}
                  </button>
                </form>
                  <div className="form-trust">
                    <div className="trust-signal">
                      <span className="lock-icon">🔒</span>
                      <span>Ваши данные защищены и не передаются третьим лицам</span>
                    </div>
                    {leadSent === "ok" && (
                      <p className="privacy" role="status">Заявка отправлена. Мы свяжемся с вами в течение 10 минут.</p>
                    )}
                    {leadSent === "error" && (
                      <p className="privacy" role="alert">Не удалось отправить заявку. Попробуйте ещё раз.</p>
                    )}
                    <p className="privacy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
                  </div>
                </div>
                
                <div className="contact-alternatives">
                  <div className="alternative-title">Предпочитаете мессенджеры?</div>
                  <div className="alternative-buttons">
                    <a href="https://t.me/freshroom_cleaning" className="btn-telegram" target="_blank" rel="noopener">
                      <span className="btn-icon">✈️</span>
                      Telegram
                      <span className="btn-badge">Онлайн 24/7</span>
                    </a>
                    <a href="tel:+79932586621" className="btn-phone">
                      <span className="btn-icon">📞</span>
                      +79932586621
                      <span className="btn-badge">Звонок бесплатный</span>
                    </a>
                  </div>
                  <div className="contact-note">
                    <span className="note-icon">💬</span>
                    <span>Работаем ежедневно с 8:00 до 22:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="brand">
            <Image className="brand-logo" src="/logo-horizontal.png" alt="FreshRoom" width={240} height={56} />
          </div>
          <span>© {new Date().getFullYear()} FreshRoom. Все права защищены.</span>
        </div>
      </footer>
      {showUp && (
        <button aria-label="Наверх" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑
        </button>
      )}
    </div>
  );
}
