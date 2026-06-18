"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/app/lib/lenis";

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

      {/* ── Back to top ─────────────────────────────────────────────── */}
      <button className={`floater${showTop ? " show" : ""}`} aria-label="Voltar ao topo" onClick={scrollToTop}>
        ↑
      </button>
    </>
  );
}
