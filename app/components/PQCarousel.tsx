"use client";

import { useEffect, useRef, useState } from "react";

const PQ = [
  {
    type: "Empresas e marcas",
    title: "Corporativo",
    desc: "Lançamentos, convenções, treinamentos, ativações, confraternizações. Estrutura profissional para sua empresa brilhar.",
  },
  {
    type: "Produtores e palestrantes",
    title: "Conteúdo",
    desc: "Workshops, masterclasses, imersões. Espaço que valoriza o conteúdo e entrega experiência para o público.",
  },
  {
    type: "Celebrações sociais",
    title: "Social",
    desc: "Aniversários, jantares, bodas, eventos gastronômicos. Ambientes que criam memórias.",
  },
  {
    type: "Agências de eventos",
    title: "Operacional",
    desc: "Parceiro operacional confiável. Espaço que facilita a sua operação — não complica.",
  },
];

export default function PQCarousel() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
    setCurrent(index);
  };

  const next = () => goTo((current + 1) % PQ.length);

  // Auto-play: advance every 3s
  useEffect(() => {
    timerRef.current = setInterval(next, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  // Sync active dot when user swipes manually
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.offsetWidth);
    if (index !== current) {
      setCurrent(index);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(next, 3000);
    }
  };

  return (
    <>
      {/* Mobile carousel */}
      <div className="pq-carousel" aria-label="Tipos de evento">
        <div className="pq-carousel-track" ref={trackRef} onScroll={onScroll}>
          {PQ.map((item) => (
            <div className="pq-card" key={item.type}>
              <div className="pq-type">{item.type}</div>
              <h3 className="pq-title">{item.title}</h3>
              <p className="pq-desc">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="pq-dots" aria-hidden="true">
          {PQ.map((_, i) => (
            <button
              key={i}
              className={`pq-dot${i === current ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Card ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid (unchanged) */}
      <div className="pq-grid pq-grid-desktop" data-stagger>
        {PQ.map((item) => (
          <div className="pq-card" key={item.type}>
            <div className="pq-type">{item.type}</div>
            <h3 className="pq-title">{item.title}</h3>
            <p className="pq-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
