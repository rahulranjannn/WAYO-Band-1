import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    path: string;
    heroImage?: string;
    isHome?: boolean;
}

export function SEO({ title, description, path, heroImage, isHome = false }: SEOProps) {
    const baseUrl = "https://www.wayoband.com";
    const ogImageUrl = `${baseUrl}/og-image.webp`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "WAYO Band",
        "description": "A screen-free wristband pair that alerts parents when their child wanders too far or falls in water. No app, no internet, no monthly fees.",
        "brand": {
            "@type": "Brand",
            "name": "WAYO"
        },
        "url": baseUrl,
        "image": ogImageUrl,
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/PreOrder",
            "priceCurrency": "INR",
            "url": baseUrl
        }
    };

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={path === '/' ? baseUrl : `${baseUrl}${path}`} />

            {heroImage && (
                <link rel="preload" as="image" href={heroImage} fetchpriority="high" />
            )}

            {isHome && (
                <>
                    <meta property="og:title" content="WAYO Band — No matter where they go, WAYO brings them back." />
                    <meta property="og:description" content="The screen-free wristband that keeps your child safely within reach. Distance alert + water submersion alert. Launching April 2026." />
                    <meta property="og:image" content={ogImageUrl} />
                    <meta property="og:url" content={baseUrl} />
                    <meta property="og:type" content="website" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="WAYO Band — Launching April 2026" />
                    <meta name="twitter:description" content="The screen-free wristband that keeps your child safely within reach." />
                    <meta name="twitter:image" content={ogImageUrl} />
                    <script type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                </>
            )}
        </Helmet>
    );
}
