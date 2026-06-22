import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const BASE_URL = "https://espacosorocaba.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Espaço Sorocaba — Eventos memoráveis na Zona Sul do Rio",
  description:
    "Espaço Sorocaba + Smart Events: três pavimentos para eventos corporativos, sociais e experiências de marca em Botafogo, Rio de Janeiro. Estrutura moderna, localização estratégica e coordenação especializada.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Espaço Sorocaba — Eventos memoráveis na Zona Sul do Rio",
    description:
      "Três pavimentos integrados para eventos memoráveis em Botafogo, com coordenação Smart Events.",
    type: "website",
    url: "/",
    siteName: "Espaço Sorocaba",
    locale: "pt_BR",
    images: [
      {
        url: "/images/rooftop2.jpg",
        width: 1200,
        height: 630,
        alt: "Espaço Sorocaba — Rooftop com vista para o Cristo Redentor em Botafogo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espaço Sorocaba — Eventos memoráveis na Zona Sul do Rio",
    description:
      "Três pavimentos integrados para eventos memoráveis em Botafogo, com coordenação Smart Events.",
    images: ["/images/rooftop2.jpg"],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Espaço Sorocaba",
  description:
    "Espaço para eventos corporativos, sociais e experiências de marca em Botafogo, Rio de Janeiro. Três pavimentos com estrutura completa e coordenação Smart Events.",
  url: BASE_URL,
  telephone: "+5521999242328",
  email: "comercial@smevents.com.br",
  image: `${BASE_URL}/images/rooftop2.jpg`,
  logo: `${BASE_URL}/images/logo.png`,
  sameAs: ["https://instagram.com/espacosorocaba"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Sorocaba, 625/631",
    addressLocality: "Botafogo",
    addressRegion: "RJ",
    postalCode: "22271-110",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -22.9368,
    longitude: -43.1825,
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Elevador", value: true },
    { "@type": "LocationFeatureSpecification", name: "Acessibilidade PNE", value: true },
    { "@type": "LocationFeatureSpecification", name: "Monta-carga", value: true },
    { "@type": "LocationFeatureSpecification", name: "Rooftop", value: true },
    { "@type": "LocationFeatureSpecification", name: "Climatização", value: true },
    { "@type": "LocationFeatureSpecification", name: "Cozinha Completa", value: true },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17901931588"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17901931588');
          `}
        </Script>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
