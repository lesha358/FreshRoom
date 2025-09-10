import Script from 'next/script'

interface StructuredDataProps {
  type?: 'Organization' | 'LocalBusiness' | 'Service'
}

export default function StructuredData({ type = 'LocalBusiness' }: StructuredDataProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FreshRoom",
    "alternateName": "FreshRoom Клининг",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "logo": {
      "@type": "ImageObject",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo-horizontal.png`,
      "width": 240,
      "height": 56
    },
    "description": "Профессиональная уборка квартир, домов и офисов в Москве. Эко-средства, гарантия качества 24 часа, страхование до 1 млн ₽.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-993-258-66-21",
      "contactType": "customer service",
      "areaServed": "RU",
      "availableLanguage": "Russian"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Москва",
      "addressCountry": "RU"
    },
    "sameAs": [
      "https://t.me/freshroom_cleaning"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/#localbusiness`,
    "name": "FreshRoom — Профессиональная уборка в Москве",
    "image": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og.png`,
    "description": "Профессиональная уборка квартир, домов и офисов в Москве. Генеральная уборка, уборка после ремонта, клининг. Эко-средства, гарантия 24 часа, страхование до 1 млн ₽.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "telephone": "+7-993-258-66-21",
    "priceRange": "2500-15000",
    "currenciesAccepted": "RUB",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Москва",
      "addressRegion": "Москва",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.7558",
      "longitude": "37.6176"
    },
    "openingHours": "Mo-Su 08:00-22:00",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "55.7558",
        "longitude": "37.6176"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги клининга",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Уборка квартир",
            "description": "Поддерживающая, генеральная, после ремонта уборка квартир"
          },
          "price": "2500",
          "priceCurrency": "RUB"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Уборка домов",
            "description": "Уборка коттеджей, таунхаусов, загородных домов"
          },
          "price": "4000",
          "priceCurrency": "RUB"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Офисная уборка",
            "description": "Уборка офисов, торговых центров, кафе и ресторанов"
          },
          "price": "3000",
          "priceCurrency": "RUB"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Анна Петрова"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Ребята убрали квартиру после ремонта просто идеально! Приехали вовремя, работали быстро и очень аккуратно."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Сергей Волков"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Заказывал генеральную уборку трёхкомнатной квартиры. Работали 3 человека, справились за 4 часа. Качество на высоте!"
      }
    ]
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Профессиональная уборка в Москве",
    "description": "Профессиональная уборка квартир, домов и офисов в Москве. Генеральная уборка, уборка после ремонта, клининг.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "FreshRoom",
      "telephone": "+7-993-258-66-21"
    },
    "areaServed": {
      "@type": "City",
      "name": "Москва"
    },
    "serviceType": "Клининг и уборка",
    "offers": {
      "@type": "Offer",
      "price": "2500",
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock"
    }
  }

  const getData = () => {
    switch (type) {
      case 'Organization':
        return organizationData
      case 'LocalBusiness':
        return localBusinessData
      case 'Service':
        return serviceData
      default:
        return localBusinessData
    }
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getData())
      }}
    />
  )
}
