import Link from 'next/link';
import type { SiteDictionary } from '@/content/types.ts';

interface FooterProps {
  dict: SiteDictionary;
}

export function Footer({ dict }: FooterProps) {
  const { locale, footer, contact, nav } = dict;
  const pt = locale === 'pt';
  const currentYear = new Date().getFullYear();

  const links = [
    { href: `/${locale}`, label: pt ? 'Início' : 'Home' },
    { href: `/${locale}#sobre`, label: nav.about },
    { href: `/${locale}#atendimento`, label: nav.services },
    { href: `/${locale}/midia`, label: nav.media },
    { href: `/${locale}#contato`, label: nav.contact },
  ];

  return (
    <footer className="site-footer-editorial">
      <div className="container footer-content">
        <div className="footer-top-row">
          <div>
            <div className="footer-huge-name">Bia Carone</div>
            <p className="footer-role">{pt ? 'Psicóloga clínica' : 'Clinical psychologist'}</p>
          </div>
          <nav className="footer-nav-row" aria-label={pt ? 'Rodapé' : 'Footer'}>
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="header-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-bottom-grid">
          <div className="footer-bottom-left">
            <p className="footer-tagline">{footer.tagline}</p>
            <p className="footer-legal-copy">{footer.ethicsDisclaimer}</p>
          </div>

          <div className="footer-bottom-right">
            <p className="footer-credit">
              © {currentYear} Bia Carone. {footer.rights}
            </p>
            <p className="footer-credit footer-credit--muted">
              {pt ? 'Design editorial autoral' : 'Authorial editorial design'}
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/biacarone" target="_blank" rel="noopener noreferrer" aria-label={contact.instagramLabel}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
