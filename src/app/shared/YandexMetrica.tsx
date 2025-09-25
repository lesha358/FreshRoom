import Script from 'next/script'

interface YandexMetricaProps {
  counterId: string
}

export default function YandexMetrica({ counterId }: YandexMetricaProps) {
  return (
    <>
      <Script
        id="yandex-metrica"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a))
            (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

            ym(${counterId}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:'dataLayer', accurateTrackBounce:true, trackLinks:true});
          `,
        }}
      />
      {/* noscript fallback */}
      <noscript>
        <div>
          <img src={`https://mc.yandex.ru/watch/${counterId}`} style={{position:'absolute', left:'-9999px'}} alt="" />
        </div>
      </noscript>
    </>
  )
}
