"use client";
import Script from 'next/script'

interface YandexMetricaProps {
  counterId: string
  variant?: 'full' | 'scriptOnly' | 'noscriptOnly'
}

export default function YandexMetrica({ counterId, variant = 'full' }: YandexMetricaProps) {
  if (!counterId) {
    return null
  }

  return (
    <>
      {variant !== 'noscriptOnly' && (
        <Script
          id="yandex-metrica-src"
          src="https://mc.yandex.ru/metrika/tag.js"
          strategy="afterInteractive"
          onLoad={() => {
            try {
              const w = window as unknown as { ym?: (...args: unknown[]) => void }
              if (typeof w !== 'undefined' && typeof w.ym === 'function') {
                w.ym(Number(counterId), 'init', {
                  ssr: true,
                  webvisor: true,
                  clickmap: true,
                  ecommerce: 'dataLayer',
                  accurateTrackBounce: true,
                  trackLinks: true,
                  defer: true
                });
              }
            } catch {}
          }}
        />
      )}
      {variant !== 'scriptOnly' && (
        <noscript>
          <div>
            <img 
              src={`https://mc.yandex.ru/watch/${counterId}`} 
              style={{position:'absolute', left:'-9999px'}} 
              alt="" 
            />
          </div>
        </noscript>
      )}
    </>
  )
}
