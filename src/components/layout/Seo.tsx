import { useLocation } from 'react-router-dom'
import { school } from '@/config/school'

interface SeoProps {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Per-page head tags. React 19 hoists <title>, <meta> and <link> into <head>.
 */
export function Seo({ title, description, image = '/og-image.svg', type = 'website', noindex, jsonLd }: SeoProps) {
  const { pathname } = useLocation()
  const fullTitle = title === school.name ? title : `${title} | ${school.name}`
  const url = `${school.siteUrl}${pathname === '/' ? '' : pathname}`
  const img = image.startsWith('http') ? image : `${school.siteUrl}${image}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:site_name" content={school.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </>
  )
}

/** schema.org description of the school. Only verified fields are included. */
export function schoolJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: school.name,
    description: school.description,
    url: school.siteUrl,
    logo: `${school.siteUrl}/favicon.svg`,
    telephone: school.contact.phone,
    email: school.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: school.contact.addressLines[1],
      addressLocality: school.contact.addressLines[2],
      addressCountry: 'IN',
    },
    sameAs: school.social.map((s) => s.href),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${school.siteUrl}${it.path}` })),
  }
}
