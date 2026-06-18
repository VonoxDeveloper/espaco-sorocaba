"use client";

import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/app/lib/lenis";

const WA_URL = `https://wa.me/5521999242328?text=${encodeURIComponent("Olá! Vim pelo site do Espaço Sorocaba e gostaria de solicitar um orçamento para o meu evento. Poderia me passar mais informações?")}`;

function WhatsAppFloat() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-show popup on page load after 1 second
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!popupDismissed) setPopupOpen(true);
    }, 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const dismiss = () => {
    setPopupOpen(false);
    setPopupDismissed(true);
  };

  const toggle = () => {
    if (popupOpen) {
      dismiss();
    } else {
      setPopupOpen(true);
      setPopupDismissed(false);
    }
  };

  return (
    <div className="wa-float-wrap">
      {/* Pop-up CTA */}
      <div className={`wa-popup${popupOpen ? " show" : ""}`} role="dialog" aria-label="Fale conosco pelo WhatsApp">
        <button className="wa-popup-close" aria-label="Fechar" onClick={dismiss}>×</button>
        <p className="wa-popup-title">Datas de julho disponíveis!</p>
        <p className="wa-popup-body">Consulte agora.</p>
        <a
          href={WA_URL}
          className="wa-popup-cta"
          target="_blank"
          rel="noopener noreferrer"
          onClick={dismiss}
        >
          Consultar agora
        </a>
      </div>

      {/* WhatsApp button */}
      <button className="wa-float-btn" aria-label="Abrir WhatsApp" onClick={toggle}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>
    </div>
  );
}

const NAV: [string, string][] = [
  ["Sobre", "#sobre"],
  ["Ambientes", "#ambientes"],
  ["Estrutura", "#estrutura"],
  ["Equipe", "#smart"],
  ["Depoimentos", "#depoimentos"],
  ["Tour 360°", "#tour"],
  ["FAQ", "#faq"],
  ["Contato", "#contato"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll state + progress bar + active section detection
  useEffect(() => {
    const detectActive = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - vh;

      setScrolled(scrollY > 24);
      setShowTop(scrollY > vh * 0.8);
      // Query positions fresh each call so post-render layout is accurate
      const trigger = scrollY + vh * 0.38;
      let current = "";
      NAV.forEach(([, href]) => {
        // #contato activates from the cta-final section (above the footer)
        const selector = href === "#contato" ? ".cta-final" : href;
        const el = document.querySelector<HTMLElement>(selector);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (top <= trigger) current = href;
        }
      });
      setActive(current);
    };

    // window scroll fires because Lenis uses window.scrollTo internally
    window.addEventListener("scroll", detectActive, { passive: true });
    detectActive();

    return () => window.removeEventListener("scroll", detectActive);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Main header ─────────────────────────────────────────────── */}
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
          Espaço Sorocaba
        </a>
        <nav className="nav">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={active === href ? "active" : ""}
              onClick={(e) => { e.preventDefault(); go(href); }}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={`https://wa.me/5521999242328?text=${encodeURIComponent("Olá! Vim pelo site do Espaço Sorocaba e gostaria de solicitar um orçamento para o meu evento. Poderia me passar mais informações?")}`}
          className="header-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Solicite um orçamento
        </a>
        <button
          className={`nav-toggle${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>


      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={active === href ? "active" : ""}
              onClick={(e) => { e.preventDefault(); go(href); }}
            >
              {label}
            </a>
          ))}
          <a
            href={`https://wa.me/5521999242328?text=${encodeURIComponent("Olá! Vim pelo site do Espaço Sorocaba e gostaria de solicitar um orçamento para o meu evento. Poderia me passar mais informações?")}`}
            className="mobile-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Solicite um orçamento
          </a>
        </nav>
      </div>
      <button
        className={`mobile-scrim${menuOpen ? " open" : ""}`}
        aria-label="Fechar menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── WhatsApp float ──────────────────────────────────────────── */}
      <WhatsAppFloat />

      {/* ── Back to top ─────────────────────────────────────────────── */}
      <button className={`floater${showTop ? " show" : ""}`} aria-label="Voltar ao topo" onClick={scrollToTop}>
        ↑
      </button>
    </>
  );
}
