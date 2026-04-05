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

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={heroImage ? (heroImage.startsWith('http') ? heroImage : `${baseUrl}${heroImage}`) : ogImageUrl} />
            <meta property="og:url" content={path === '/' ? baseUrl : `${baseUrl}${path}`} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={heroImage ? (heroImage.startsWith('http') ? heroImage : `${baseUrl}${heroImage}`) : ogImageUrl} />

            {isHome && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
}
