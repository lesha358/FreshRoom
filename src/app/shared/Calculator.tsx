"use client";
import { useState, useEffect } from "react";

interface CalculatorState {
  propertyType: "apartment" | "house" | "office";
  rooms: number;
  area: number;
  cleaningType: "regular" | "deep" | "postRenovation";
  additionalServices: string[];
}

interface ServicePrice {
  basePrice: number;
  areaMultiplier: number;
  roomMultiplier: number;
  additionalServices: Record<string, number>;
}

const PRICES: Record<string, ServicePrice> = {
  apartment: {
    basePrice: 2500,
    areaMultiplier: 50,
    roomMultiplier: 800,
    additionalServices: {
      "windows": 500,
      "balcony": 300,
      "refrigerator": 400,
      "oven": 300,
      "carpet": 200,
      "curtains": 400,
      "chandelier": 300,
      "furniture": 600
    }
  },
  house: {
    basePrice: 4000,
    areaMultiplier: 60,
    roomMultiplier: 1000,
    additionalServices: {
      "windows": 800,
      "balcony": 500,
      "refrigerator": 500,
      "oven": 400,
      "carpet": 300,
      "curtains": 600,
      "chandelier": 400,
      "furniture": 800,
      "fireplace": 600,
      "stairs": 800
    }
  },
  office: {
    basePrice: 3000,
    areaMultiplier: 40,
    roomMultiplier: 600,
    additionalServices: {
      "windows": 600,
      "carpet": 250,
      "curtains": 500,
      "furniture": 700,
      "kitchen": 400,
      "bathroom": 300
    }
  }
};

const CLEANING_TYPE_MULTIPLIERS = {
  regular: 1,
  deep: 1.5,
  postRenovation: 2.2
};

// Убрали частоту уборки - теперь только разовая

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    propertyType: "apartment",
    rooms: 1,
    area: 30,
    cleaningType: "regular",
    additionalServices: []
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");

  const calculatePrice = () => {
    const prices = PRICES[state.propertyType];
    let basePrice = prices.basePrice;
    
    // Добавляем стоимость за площадь (только если больше базовой)
    if (state.area > 30) {
      basePrice += (state.area - 30) * prices.areaMultiplier;
    }
    
    // Добавляем стоимость за комнаты (только если больше базовой)
    if (state.rooms > 1) {
      basePrice += (state.rooms - 1) * prices.roomMultiplier;
    }
    
    // Добавляем дополнительные услуги
    const additionalCost = state.additionalServices.reduce((sum, service) => {
      return sum + (prices.additionalServices[service] || 0);
    }, 0);
    
    // Применяем множитель типа уборки
    const finalPrice = (basePrice + additionalCost) * CLEANING_TYPE_MULTIPLIERS[state.cleaningType];
    
    setTotalPrice(Math.round(finalPrice));
  };

  useEffect(() => {
    calculatePrice();
  }, [state]);

  const handleServiceToggle = (service: string) => {
    setState(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const getAvailableServices = () => {
    return Object.keys(PRICES[state.propertyType].additionalServices);
  };

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

  const handleSaveCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки на email
    alert(`Расчёт отправлен на ${email}`);
    setShowEmailForm(false);
  };


  // Убрали функцию сравнения тарифов

  return (
    <div className="calculator">
      <div className="calculator-header">
        <h3>Калькулятор стоимости уборки</h3>
        <p>Рассчитайте примерную стоимость услуг</p>
      </div>
      
      <div className="calculator-content">
        <div className="calculator-form">
          <div className="form-section">
            <label className="form-label">Тип помещения</label>
            <div className="radio-group">
              {[
                { value: "apartment", label: "Квартира" },
                { value: "house", label: "Дом" },
                { value: "office", label: "Офис" }
              ].map(option => (
                <label key={option.value} className="radio-option">
                  <input
                    type="radio"
                    name="propertyType"
                    value={option.value}
                    checked={state.propertyType === option.value}
                    onChange={(e) => setState(prev => ({ ...prev, propertyType: e.target.value as any }))}
                  />
                  <span className="radio-custom"></span>
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label className="form-label">Количество комнат</label>
              <div className="number-input">
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                  className="number-btn"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={state.rooms}
                  onChange={(e) => setState(prev => ({ ...prev, rooms: parseInt(e.target.value) || 1 }))}
                  className="number-field"
                />
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, rooms: Math.min(20, prev.rooms + 1) }))}
                  className="number-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-section">
              <label className="form-label">Площадь (м²)</label>
              <div className="number-input">
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, area: Math.max(20, prev.area - 10) }))}
                  className="number-btn"
                >
                  −
                </button>
                <input
                  type="number"
                  min="20"
                  max="500"
                  value={state.area}
                  onChange={(e) => setState(prev => ({ ...prev, area: parseInt(e.target.value) || 20 }))}
                  className="number-field"
                />
                <button
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, area: Math.min(500, prev.area + 10) }))}
                  className="number-btn"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Тип уборки</label>
            <div className="radio-group">
              {[
                { value: "regular", label: "Поддерживающая", desc: "Ежедневная уборка" },
                { value: "deep", label: "Генеральная", desc: "Тщательная уборка" },
                { value: "postRenovation", label: "После ремонта", desc: "Сложная уборка" }
              ].map(option => (
                <label key={option.value} className="radio-option">
                  <input
                    type="radio"
                    name="cleaningType"
                    value={option.value}
                    checked={state.cleaningType === option.value}
                    onChange={(e) => setState(prev => ({ ...prev, cleaningType: e.target.value as any }))}
                  />
                  <span className="radio-custom"></span>
                  <div className="radio-content">
                    <span className="radio-label">{option.label}</span>
                    <span className="radio-desc">{option.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Дополнительные услуги</label>
            <div className="services-grid">
              {getAvailableServices().map(service => (
                <label key={service} className="service-option">
                  <input
                    type="checkbox"
                    checked={state.additionalServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                  />
                  <span className="service-custom"></span>
                  <span className="service-label">{getServiceLabel(service)}</span>
                  <span className="service-price">+{PRICES[state.propertyType].additionalServices[service]} ₽</span>
                </label>
              ))}
            </div>
          </div>

          {/* Убрали секцию частоты уборки */}
        </div>

        <div className="calculator-result">
          <div className="result-card">
            <div className="result-header">
              <h4>Итоговая стоимость</h4>
              <div className="result-price">
                <span className="price-amount">{totalPrice.toLocaleString()}</span>
                <span className="price-currency">₽</span>
              </div>
            </div>

            <div className="result-details">
              <div className="detail-item">
                <span>Площадь:</span>
                <span>{state.area} м²</span>
              </div>
              <div className="detail-item">
                <span>Комнат:</span>
                <span>{state.rooms}</span>
              </div>
              <div className="detail-item">
                <span>Доп. услуги:</span>
                <span>{state.additionalServices.length}</span>
              </div>
            </div>

            <div className="pricing-info">
              <h5>Информация о ценах</h5>
              <div className="pricing-details">
                <div className="pricing-item">
                  <span>Стоимость уборки:</span>
                  <span>{totalPrice.toLocaleString()} ₽</span>
                </div>
                <div className="pricing-item">
                  <span>Время выполнения:</span>
                  <span>2-4 часа</span>
                </div>
                <div className="pricing-item">
                  <span>Гарантия качества:</span>
                  <span>24 часа</span>
                </div>
              </div>
              <div className="subscription-info">
                <span className="subscription-icon">💎</span>
                <span>При подписке на ежемесячную уборку скидка 10%</span>
              </div>
            </div>

            <button 
              className="btn-primary result-cta"
              onClick={() => {
                console.log('Кнопка "Заказать уборку" нажата!');
                
                const calculationData = {
                  propertyType: state.propertyType,
                  rooms: state.rooms,
                  area: state.area,
                  cleaningType: state.cleaningType,
                  additionalServices: state.additionalServices,
                  totalPrice: totalPrice
                };
                
                console.log('Данные расчета:', calculationData);
                
                // Сохраняем данные в sessionStorage
                sessionStorage.setItem('calculationData', JSON.stringify(calculationData));
                console.log('Данные сохранены в sessionStorage');
                
                // Переходим к форме заявки
                const contactElement = document.getElementById('contact');
                if (contactElement) {
                  console.log('Переходим к форме заявки');
                  contactElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                  console.error('Элемент #contact не найден');
                }
              }}
            >
              Заказать уборку
            </button>
            
            <div className="result-actions">
              <button 
                className="btn-secondary save-calculation"
                onClick={() => setShowEmailForm(true)}
              >
                📧 Сохранить расчёт
              </button>
            </div>
            
            <p className="result-note">
              * Цена является ориентировочной. Точную стоимость назовём после осмотра объекта.
            </p>
          </div>
        </div>
      </div>

      {showEmailForm && (
        <div className="email-modal">
          <div className="email-modal-content">
            <h4>Сохранить расчёт на email</h4>
            <form onSubmit={handleSaveCalculation}>
              <input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
              />
              <div className="email-actions">
                <button type="submit" className="btn-primary">Отправить</button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowEmailForm(false)}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
