/**
 * Footer — 3 colonnes éditoriales + disclaimer affilié.
 * Fond --bg-surface avec diagonal clip-path en haut pour raccordement visuel.
 * Server Component — zéro JS.
 */

import Link from 'next/link'
import { niche } from '@/niche.config'

function currentYear() {
  return new Date().getFullYear()
}

const COL_OUTILS = [
  { href: '/comparer', label: 'Comparer' },
  ...(niche.quiz.enabled ? [{ href: '/quiz', label: 'Quiz' }] : []),
  ...(niche.simulator.enabled ? [{ href: '/simulateur', label: 'Simulateur' }] : []),
  { href: '/deals', label: niche.dealWord.charAt(0).toUpperCase() + niche.dealWord.slice(1) },
]

const COL_BLOG = niche.categories.slice(0, 4).map((cat) => ({
  href: `/blog/${cat.slug}`,
  label: cat.label,
}))

const COL_APROPOS = [
  ...(niche.author.slug ? [{ href: `/auteurs/${niche.author.slug}`, label: 'Auteur' }] : []),
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/confidentialite', label: 'Confidentialité' },
]

type FooterColProps = {
  title: string
  links: { href: string; label: string }[]
}

function FooterCol({ title, links }: FooterColProps) {
  if (links.length === 0) return null
  return (
    <div>
      <p
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-4)',
        }}
      >
        {title}
      </p>
      <ul role="list" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 150ms ease',
              }}
              className="footer-link"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Parse logo: if it contains "·", split into bold + light parts
const footerLogoText = niche.logo ?? niche.siteName
const footerHasDot = footerLogoText.includes('·')
const footerLogoBold = footerHasDot ? footerLogoText.split('·')[0] : footerLogoText
const footerLogoLight = footerHasDot ? footerLogoText.split('·').slice(1).join('·') : ''

export function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-surface)',
        marginTop: 'var(--space-24)',
        clipPath: 'polygon(0 32px, 100% 0, 100% 100%, 0 100%)',
        paddingTop: 'calc(var(--space-16) + 32px)',
        paddingBottom: 'var(--space-12)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 var(--space-6)',
        }}
      >
        {/* Grille 3 colonnes + logo */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--space-10)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Identité */}
          <div>
            <Link
              href="/"
              aria-label={`${niche.siteName} — accueil`}
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: '1px', marginBottom: 'var(--space-4)' }}
            >
              <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)', letterSpacing: '0' }}>{footerLogoBold}</span>
              {footerHasDot && <>
                <span style={{ color: 'var(--accent-1)', fontWeight: 800, fontSize: '15px' }}>·</span>
                <span style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontWeight: 400, fontSize: '15px', color: 'var(--text-secondary)', letterSpacing: '0' }}>{footerLogoLight}</span>
              </>}
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '220px' }}>
              {niche.tagline}
            </p>
          </div>

          <FooterCol title="Outils" links={COL_OUTILS} />
          {COL_BLOG.length > 0 && <FooterCol title="Blog" links={COL_BLOG} />}
          <FooterCol title="À propos" links={COL_APROPOS} />
        </div>

        {/* Bas — séparateur + disclaimer */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 'var(--space-6)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            © {currentYear()} {niche.siteName} — Site indépendant.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, textAlign: 'right' }}>
            Liens affiliés {niche.defaultStore}. En achetant via nos liens, vous soutenez le site sans surcoût.
          </p>
        </div>
      </div>
    </footer>
  )
}
