"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const DATA = [
  {
    name: "Recepção",
    img: "/images/recepcao.jpg",
    desc: "O evento começa antes do salão. A área de recepção foi desenhada para criar a primeira impressão certa: espaço amplo, sinalização integrada e equipe disponível para conduzir os convidados desde a chegada.",
    specs: "Balcão de check-in · Sinalização personalizável · Área de espera · Controle de acesso",
  },
  {
    name: "Elevadores",
    img: "/images/elevador.jpg",
    desc: "Acesso vertical fluido para todos os andares. Os elevadores comportam convidados e equipamentos com conforto — eliminando filas e garantindo que o fluxo do evento nunca trave.",
    specs: "Acesso a todos os pavimentos · Capacidade para equipamentos · Operação contínua",
  },
  {
    name: "Monta-carga",
    img: "/images/montacarga.jpg",
    desc: "Cenografia, equipamentos, palco, buffet. O monta-carga foi dimensionado para a carga de qualquer produção — sem interferir no acesso dos convidados.",
    specs: "Entrada exclusiva · Rua Mena Barreto, 79 · Acesso direto à cozinha",
  },
  {
    name: "Cozinha completa",
    img: "/images/cozinha.png",
    desc: "Infraestrutura profissional para operações de buffet e gastronomia. Espaço, bancadas e equipamentos para que qualquer fornecedor de alimentação trabalhe com eficiência.",
    specs: "Bancadas em inox · Pontos de energia dedicados · Câmara fria · Acesso ao monta-carga",
  },
  {
    name: "Área de bar",
    img: "/images/bancada.jpg",
    desc: "Bar estruturado para operações de alta demanda. Com bancadas, pontos de apoio e acesso direto ao estoque — do serviço simples de bebidas ao open bar completo.",
    specs: "Bancada em todos os salões · Pontos elétricos · Suporte para mixologia · Acesso ao estoque",
  },
  {
    name: "Banheiros modernos",
    img: "/images/banheiro.jpg",
    desc: "Banheiros modernos em cada andar, dimensionados para o volume de convidados. Manutenção contínua durante o evento para que esse detalhe nunca comprometa a experiência.",
    specs: "Um conjunto por pavimento · Dimensionados para 200 pessoas · Manutenção durante o evento",
  },
  {
    name: "Banheiro PNE",
    img: "/images/banheiropne.png",
    desc: "Acesso e conforto para todos. Banheiros adaptados para pessoas com necessidades especiais em todos os pavimentos — inclusão sem abrir mão da experiência.",
    specs: "Porta com abertura ampla · Barras de apoio · Lavatório adaptado · Disponível em todos os andares",
  },
  {
    name: "Fraldário",
    img: "/images/fraldario.png",
    desc: "Espaço reservado para convidados com bebês. Discreto, equipado e integrado ao fluxo do evento — porque experiências inesquecíveis não têm restrições de idade.",
    specs: "Trocador fixo · Espaço privativo · Iluminação adequada · Fácil acesso",
  },
  {
    name: "Climatização",
    img: "/images/climatizacao.jpg",
    desc: "Temperatura controlada em todos os ambientes. Independente da estação ou da densidade de pessoas, o sistema mantém o conforto — e a concentração dos convidados — no nível certo.",
    specs: "Sistema central em todos os pavimentos · Controle por ambiente · Manutenção preventiva",
  },
  {
    name: "Infraestrutura elétrica completa",
    img: "/images/bancada2.jpg",
    desc: "Rede dimensionada para produção profissional: iluminação cênica, sistemas de som, projeção e qualquer equipamento técnico que sua produção exige. Sem surpresas no dia.",
    specs: "Quadros dedicados por salão · Carga para equipamentos pesados · Aterramento profissional",
  },
  {
    name: "Mobiliário disponível",
    img: "/images/decorado3.jpg",
    desc: "Cadeiras, mesas, painéis, pedestais. O Espaço Sorocaba disponibiliza mobiliário para formatação básica do evento. Itens específicos podem ser combinados no briefing com nossa equipe.",
    specs: "Cadeiras e mesas · Pedestais · Itens adicionais sob consulta · Parceiros de locação indicados",
  },
  {
    name: "Estacionamentos parceiros",
    img: "/images/local.jpg",
    desc: "Botafogo é bem servido de estacionamentos. O Espaço Sorocaba tem parcerias nas imediações para facilitar o acesso e oferecer condições especiais para os convidados do seu evento.",
    specs: "Parceiros a até 200m · Condições especiais para eventos · Valet disponível mediante reserva",
  },
];

export default function EstruturaSec() {
  const [active, setActive] = useState<number | null>(null);
  const prevActive = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const plusRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const wasOpen = prevActive.current !== null;
    const isNowOpen = active !== null;

    if (!wasOpen && isNowOpen) {
      // ── Opening from closed ──────────────────────────────
      gsap.killTweensOf(panel);
      const targetH = panel.scrollHeight;
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        {
          height: targetH,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          onComplete: () => gsap.set(panel, { height: "auto" }),
        }
      );
      const inner = panel.querySelector<HTMLElement>(".estr-detail-inner");
      if (inner) {
        gsap.fromTo(
          inner,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, delay: 0.2, ease: "power3.out" }
        );
      }
    } else if (wasOpen && isNowOpen) {
      // ── Switching to different item ──────────────────────
      const inner = panel.querySelector<HTMLElement>(".estr-detail-inner");
      if (inner) {
        gsap.fromTo(
          inner,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
      }
    } else if (wasOpen && !isNowOpen) {
      // ── Closing ──────────────────────────────────────────
      gsap.killTweensOf(panel);
      gsap.set(panel, { overflow: "hidden", height: panel.offsetHeight });
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.55,
        ease: "power3.in",
      });
    }

    // Rotate every + icon
    plusRefs.current.forEach((el, idx) => {
      if (!el) return;
      gsap.to(el, {
        rotation: active === idx ? 45 : 0,
        duration: 0.42,
        ease: "back.out(1.4)",
      });
    });

    prevActive.current = active;
  }, [active]);

  const toggle = (i: number) =>
    setActive((prev) => (prev === i ? null : i));

  const detail = active !== null ? DATA[active] : null;

  const DetailInner = ({ item, idx }: { item: typeof DATA[0]; idx: number }) => (
    <div className="estr-detail-inner">
      <div className="estr-detail-img" style={{ backgroundImage: `url('${item.img}')` }} />
      <div className="estr-detail-copy">
        <div className="estr-detail-num">{String(idx + 1).padStart(2, "0")}</div>
        <h3 className="estr-detail-title">{item.name}</h3>
        <p className="estr-detail-desc">{item.desc}</p>
        <div className="estr-detail-specs">{item.specs}</div>
      </div>
    </div>
  );

  return (
    <>
      <div className="estrutura-grid" data-stagger>
        {DATA.map((item, i) => (
          <div key={item.name} className="estr-grid-row">
            <div
              className={`estr-item${active === i ? " active" : ""}`}
              onClick={() => toggle(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggle(i)}
              aria-expanded={active === i}
            >
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="estr-label">{item.name}</span>
              <span
                className="estr-plus"
                ref={(el) => { plusRefs.current[i] = el; }}
              >
                +
              </span>
            </div>
            {/* Mobile inline panel — appears right below the clicked card */}
            {active === i && (
              <div className="estr-inline-panel">
                <DetailInner item={item} idx={i} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop expanding detail panel */}
      <div
        className="estr-detail-panel"
        ref={panelRef}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
        aria-live="polite"
      >
        {detail && <DetailInner item={detail} idx={active ?? 0} />}
      </div>
    </>
  );
}
