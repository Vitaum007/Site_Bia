'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { SiteDictionary } from '@/content/types.ts';
import { useNavbarState } from './useNavbarState';

interface NavbarProps {
  dict: SiteDictionary;
}

const COMPACT_SIZE = 52;
const EASE = [0.65, 0, 0.35, 1] as const;

type IconKind = 'menu' | 'close' | 'chevron';

function MenuIcon({ kind }: { kind: IconKind }) {
  if (kind === 'menu') {
    return (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" focusable="false">
        <path d="M3 7h14M3 13h14" />
      </svg>
    );
  }
  if (kind === 'close') {
    return (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" focusable="false">
        <path d="M5 5l10 10M15 5L5 15" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" focusable="false">
      <path d="M8 4l6 6-6 6" />
    </svg>
  );
}

function getMenuLabel(collapsed: boolean, isMobile: boolean, panelOpen: boolean, pt: boolean): string {
  if (collapsed) return pt ? 'Expandir navegação' : 'Expand navigation';
  if (!isMobile) return pt ? 'Recolher navegação' : 'Collapse navigation';
  if (panelOpen) return pt ? 'Fechar menu' : 'Close menu';
  return pt ? 'Abrir menu de navegação' : 'Open navigation menu';
}

function getSurfaceStyle(collapsed: boolean) {
  return collapsed
    ? {
        backgroundColor: 'rgba(239, 235, 232, 1)',
        boxShadow: 'inset 0 0 0 1px rgba(51, 75, 137, 0.16), 0 8px 20px -12px rgba(30, 45, 84, 0.4)',
        borderRadius: COMPACT_SIZE / 2,
      }
    : {
        backgroundColor: 'rgba(239, 235, 232, 0)',
        boxShadow: 'inset 0 0 0 1px rgba(51, 75, 137, 0), 0 8px 20px -12px rgba(30, 45, 84, 0)',
        borderRadius: 0,
      };
}

function LangSwitch({
  locale,
  subpath,
  extraClass,
}: {
  locale: SiteDictionary['locale'];
  subpath: string;
  extraClass: string;
}) {
  return (
    <div
      className={`header-lang-switch ${extraClass}`}
      role="group"
      aria-label={locale === 'pt' ? 'Seleção de idioma' : 'Language selector'}
    >
      <Link href={`/pt${subpath}`} className={locale === 'pt' ? 'active' : ''} aria-current={locale === 'pt' ? 'page' : undefined}>
        PT
      </Link>
      <span className="header-lang-divider" aria-hidden="true">|</span>
      <Link href={`/en${subpath}`} className={locale === 'en' ? 'active' : ''} aria-current={locale === 'en' ? 'page' : undefined}>
        EN
      </Link>
    </div>
  );
}

function getNavbarMotion(reduced: boolean) {
  return {
    widthTransition: reduced ? { duration: 0 } : { duration: 0.75, ease: EASE },
    fadeOut: reduced ? { duration: 0.12 } : { duration: 0.3, ease: 'easeIn' as const, delay: 0.1 },
    fadeIn: reduced ? { duration: 0.12 } : { duration: 0.35, ease: 'easeOut' as const, delay: 0.35 },
    surfaceTransition: reduced ? { duration: 0.12 } : { duration: 0.5, ease: EASE },
  };
}

function NavbarMobilePanel({
  open,
  reduced,
  locale,
  subpath,
  pathname,
  links,
  bookCta,
  onClose,
}: {
  open: boolean;
  reduced: boolean;
  locale: SiteDictionary['locale'];
  subpath: string;
  pathname: string | null;
  links: { href: string; label: string }[];
  bookCta: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="header-menu-panel"
          className="header-panel"
          aria-label={locale === 'pt' ? 'Menu de navegação' : 'Navigation menu'}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0.1 : 0.25, ease: 'easeOut' }}
        >
          <ul>
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="header-panel-link"
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="header-panel-footer">
            <LangSwitch locale={locale} subpath={subpath} extraClass="header-lang-panel" />
            <Link href={`/${locale}#contato`} className="header-pill-btn header-panel-cta" onClick={onClose}>
              <span>{bookCta}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function getMenuButtonMeta(collapsed: boolean, isMobile: boolean, panelOpen: boolean, pt: boolean) {
  const iconKind: IconKind = collapsed ? 'menu' : isMobile ? (panelOpen ? 'close' : 'menu') : 'chevron';
  const menuLabel = getMenuLabel(collapsed, isMobile, panelOpen, pt);
  const expanded = collapsed ? false : isMobile ? panelOpen : true;
  return { iconKind, menuLabel, expanded };
}

function getShellLayoutMeta(collapsed: boolean, rowWidth: number | null) {
  if (rowWidth === null) {
    return { shellWidthAnimate: {}, shellStyle: { width: '100%' }, rowStyle: undefined };
  }
  return {
    shellWidthAnimate: { width: collapsed ? COMPACT_SIZE : rowWidth },
    shellStyle: undefined,
    rowStyle: { width: rowWidth },
  };
}

function getNavbarMeta(params: {
  collapsed: boolean;
  isMobile: boolean;
  panelOpen: boolean;
  pt: boolean;
  reduced: boolean;
  mounted: boolean;
  rowWidth: number | null;
}) {
  const { collapsed, isMobile, panelOpen, pt, reduced, mounted, rowWidth } = params;
  const { iconKind, menuLabel, expanded } = getMenuButtonMeta(collapsed, isMobile, panelOpen, pt);
  const iconInitial = reduced || !mounted ? false : { opacity: 0, x: iconKind === 'chevron' ? -4 : 0 };
  const iconTransition = { duration: reduced ? 0 : 0.25, ease: 'easeOut' as const, delay: reduced ? 0 : 0.1 };
  return {
    iconKind,
    menuLabel,
    expanded,
    iconInitial,
    iconTransition,
    ...getShellLayoutMeta(collapsed, rowWidth),
    panelControls: isMobile ? (!collapsed ? 'header-menu-panel' : undefined) : 'header-nav-row',
    panelOpen: panelOpen && isMobile && !collapsed,
  };
}

export function Navbar({ dict }: NavbarProps) {
  const { locale, nav } = dict;
  const pt = locale === 'pt';
  const pathname = usePathname();
  const subpath = pathname?.replace(/^\/(pt|en)(?=\/|$)/, '') || '';
  const reduced = Boolean(useReducedMotion());
  const { collapsed, panelOpen, isMobile, rowWidth, gridRef, menuBtnRef, mounted, onMenuClick, closePanel } =
    useNavbarState();

  const { widthTransition, fadeOut, fadeIn, surfaceTransition } = getNavbarMotion(reduced);
  const links = [
    { href: `/${locale}#sobre`, label: nav.about },
    { href: `/${locale}#atendimento`, label: nav.services },
    { href: `/${locale}/midia`, label: nav.media },
    { href: `/${locale}#contato`, label: nav.contact },
  ];

  const meta = getNavbarMeta({
    collapsed,
    isMobile,
    panelOpen,
    pt,
    reduced,
    mounted,
    rowWidth,
  });

  return (
    <header className="site-header" data-collapsed={collapsed ? 'true' : 'false'}>
      <motion.div
        className="header-bg"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: collapsed ? 0 : 1 }}
        transition={surfaceTransition}
      />

      <div className="container header-grid" ref={gridRef}>
        <motion.div
          className="header-shell"
          initial={false}
          animate={{ ...meta.shellWidthAnimate, ...getSurfaceStyle(collapsed) }}
          transition={{ ...widthTransition, backgroundColor: surfaceTransition, boxShadow: surfaceTransition }}
          style={meta.shellStyle}
        >
          <motion.div
            id="header-nav-row"
            className="header-row"
            style={meta.rowStyle}
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1 }}
            transition={collapsed ? fadeOut : fadeIn}
            inert={collapsed}
          >
            <Link href={`/${locale}`} className="brand-signature">
              <span className="brand-title">Bia Carone</span>
              <span className="brand-sub">{pt ? 'Psicóloga Clínica' : 'Clinical Psychologist'}</span>
            </Link>

            <nav className="header-nav" aria-label={pt ? 'Navegação principal' : 'Main navigation'}>
              <ul className="header-nav-list">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="header-nav-link"
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header-actions">
              <LangSwitch locale={locale} subpath={subpath} extraClass="header-lang-bar" />
              <Link href={`/${locale}#contato`} className="header-pill-btn">
                <span>{nav.bookCta}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>

          <button
            ref={menuBtnRef}
            type="button"
            className="header-menu-btn"
            aria-label={meta.menuLabel}
            aria-expanded={meta.expanded}
            aria-controls={meta.panelControls}
            onClick={onMenuClick}
          >
            <motion.span
              key={meta.iconKind}
              className="header-menu-icon"
              aria-hidden="true"
              initial={meta.iconInitial}
              animate={{ opacity: 1, x: 0 }}
              transition={meta.iconTransition}
            >
              <MenuIcon kind={meta.iconKind} />
            </motion.span>
          </button>
        </motion.div>

        <NavbarMobilePanel
          open={meta.panelOpen}
          reduced={reduced}
          locale={locale}
          subpath={subpath}
          pathname={pathname}
          links={links}
          bookCta={nav.bookCta}
          onClose={closePanel}
        />
      </div>
    </header>
  );
}
