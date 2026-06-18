"use client";

import { useState } from "react";
import Header from "./components/Header";
import EstruturaSec from "./components/EstruturaSec";
import PQCarousel from "./components/PQCarousel";
import { useSiteAnimations } from "./components/useSiteAnimations";

const IMG = {
  hero:      "/images/rooftop2.jpg",
  about:     "/images/decorado2.jpg",
  vitrine:   "/images/vitrine.jpg",
  corcovado: "/images/corcovado.png",
  rooftop:   "/images/rooftop.png",
  smart:     "/images/equipe.jpg",
};

const AMBIENTES = [
  {
    floor: "térreo",
    name: "Salão Vitrine",
    specs: ["~330m²", "pé-direito 3,5m", "até 200 pessoas"],
    desc: "Quem entra, já fica impressionado. O Salão Vitrine é o cartão de visitas do espaço — com recepção exclusiva, bar integrado e layout que se transforma de acordo com a sua necessidade.",
    features: "Bar integrado · Recepção exclusiva · Acesso independente · Layout 100% flexível",
    ideal: "Recepções · Palestras · Ativações de marca · Festas · Feiras",
    img: IMG.vitrine,
    imgPosition: "center 65%",
  },
  {
    floor: "2º andar",
    name: "Salão Corcovado",
    specs: ["~330m²", "até 200 pessoas"],
    desc: "Estrutura totalmente independente. O Salão Corcovado tem entrada própria, banheiros exclusivos e área de bar — criando uma experiência separada dentro do mesmo espaço.",
    features: "Estrutura independente · Banheiros privativos · Área de bar · Clima controlado",
    ideal: "Workshops · Treinamentos · Jantares corporativos · Celebrações",
    img: IMG.corcovado,
  },
  {
    floor: "cobertura",
    name: "Rooftop",
    specs: ["~200m²", "Vista para o Cristo Redentor"],
    desc: "Não existe cenário mais icônico no Rio. O Rooftop entrega o que nenhum espaço fechado consegue: o Cristo ao fundo, o céu aberto, e uma atmosfera que dispensa decoração elaborada.",
    features: "Vista para o Cristo · Cozinha integrada · Ambiente premium · Céu aberto",
    ideal: "Sunsets · Coquetéis · Eventos gastronômicos · Lançamentos · Experiências premium",
    img: IMG.rooftop,
  },
];


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

const DEPO_PLACEHOLDER = [
  "Evento corporativo — empresa parceira",
  "Celebração social — cliente recorrente",
  "Produção de evento — agência parceira",
];

const FAQS = [
  {
    q: "O espaço inclui mobiliário?",
    a: "Sim. Temos mobiliário disponível. Itens específicos podem ser combinados durante o briefing com nossa equipe.",
  },
  {
    q: "Posso usar fornecedores externos?",
    a: "Sim. O espaço é aberto a fornecedores credenciados. Nossa equipe pode indicar parceiros de confiança caso você precise.",
  },
  {
    q: "Os salões podem ser alugados separadamente?",
    a: "Sim. Você pode alugar um pavimento específico ou o espaço completo, dependendo do formato e do porte do seu evento.",
  },
  {
    q: "Tem acessibilidade para PNE?",
    a: "Sim. Elevadores, banheiro adaptado e fraldário estão disponíveis em todos os pavimentos.",
  },
  {
    q: "Como funciona a coordenação Smart Events?",
    a: "A Smart Events entra desde o briefing inicial e permanece presente até o encerramento. Você fala com um profissional, não com um WhatsApp genérico.",
  },
];

function TourEmbed({ src }: { src: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className="tour-embed-wrap" onMouseLeave={() => setActive(false)}>
      <iframe
        src={src}
        allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
        allowFullScreen
        title="Tour Virtual 360° — Espaço Sorocaba"
        style={{ pointerEvents: active ? "auto" : "none" }}
      />
      {!active && (
        <div className="tour-overlay" onClick={() => setActive(true)}>
          <span className="tour-overlay-hint">Clique para interagir com o tour</span>
        </div>
      )}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-row${open ? " open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        {q}
        <span className="faq-mark">+</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const WA = "https://wa.me/5521999242328?text=";
const WA_ORCAMENTO = WA + encodeURIComponent("Olá! Vim pelo site do Espaço Sorocaba e gostaria de solicitar um orçamento para o meu evento. Poderia me passar mais informações?");
const WA_VISITA    = WA + encodeURIComponent("Olá! Vim pelo site do Espaço Sorocaba e gostaria de agendar uma visita presencial ao espaço. Qual a disponibilidade?");

export default function Page() {
  useSiteAnimations();

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      {/* ── HERO ── */}
      <section className="hero grain">
        <div className="hero-img" style={{ backgroundImage: `url('${IMG.hero}')` }} />
        <div className="hero-tone" />
        <div className="site-logo-badge">
          <img src="/images/logo.png" alt="Espaço Sorocaba" className="site-logo-img" />
        </div>
        <div className="hero-meta">
          <span>Botafogo</span>
          <span>Zona Sul · Rio</span>
        </div>
        <div className="hero-inner">
          <h1 className="hero-headline">
            <span className="line"><span>O espaço que transforma eventos</span></span>
            <span className="line"><span>em experiências <em>inesquecíveis</em></span></span>
            <span className="line"><span>— no coração de Botafogo.</span></span>
          </h1>
          <p className="hero-sub">
            Espaço Sorocaba + Smart Events. Três andares planejados para eventos
            corporativos, sociais e experiências de marca. Estrutura completa,
            localização estratégica e coordenação profissional do início ao fim.
          </p>
          <div className="cta-row">
            <a className="btn" href={WA_ORCAMENTO} target="_blank" rel="noopener noreferrer">Solicite um orçamento grátis</a>
            <a className="btn btn--ghost-light" href={WA_VISITA} target="_blank" rel="noopener noreferrer">Agende uma visita presencial</a>
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section className="section" id="sobre">
        <div className="eyebrow reveal">Sobre o espaço</div>
        <div className="about-cols">
          <div className="about-copy">
            <h2 className="h2 reveal">3 pavimentos. 1 experiência completa.</h2>
            <p className="reveal">
              Quem organiza eventos sabe: o espaço é a base de tudo. Quando ele
              falha, todo o resto desmorona — logística travada, equipe sem suporte,
              convidados insatisfeitos.
            </p>
            <p className="reveal">
              No Espaço Sorocaba, isso não acontece. Localizado em Botafogo, na
              Zona Sul do Rio, nosso espaço foi projetado para dar liberdade total
              a quem cria e tranquilidade total a quem contrata. Três andares
              integrados por elevadores e monta-carga, com ambientes independentes
              que se adaptam ao seu formato — do networking corporativo ao coquetel
              no rooftop com vista para o Cristo.
            </p>
            <p className="reveal">
              E o melhor: você não está sozinho. A Smart Events coordena cada etapa
              da operação para que o seu evento aconteça com fluidez, segurança e
              excelência.
            </p>
            <div className="about-stats reveal">
              <div className="stat">
                <div className="lbl">pavimentos</div>
                <div className="val">3</div>
                <div className="sub">térreo · 2º · cobertura</div>
              </div>
              <div className="stat">
                <div className="lbl">capacidade</div>
                <div className="val">200</div>
                <div className="sub">pessoas por salão</div>
              </div>
              <div className="stat">
                <div className="lbl">bairro</div>
                <div className="val">Botafogo</div>
                <div className="sub">Zona Sul · Rio de Janeiro</div>
              </div>
            </div>
          </div>
          <div className="about-img grain reveal" style={{ backgroundImage: `url('${IMG.about}')` }} />
        </div>
      </section>

      {/* ── PARA QUEM É + TIPOS DE EVENTO (merged) ── */}
      <section className="section pq" id="tipos">
        <div className="eyebrow reveal">Você está no lugar certo se…</div>
        <h2 className="h2 reveal">Feito para quem não aceita mediocridade no próprio evento.</h2>
        <PQCarousel />

        <div className="tipos-divider reveal" />
        <h3 className="tipos-sub-heading reveal">De corporativo a comemorativo — aqui cabe tudo.</h3>
        <div className="tipos-grid reveal">
          <div className="tipos-col">
            <div className="tipos-col-title">Eventos Corporativos</div>
            <ul className="tipos-list">
              {[
                "Convenções e congressos",
                "Treinamentos e workshops",
                "Lançamentos de produto",
                "Confraternizações",
                "Ativações de marca",
                "Feiras e exposições",
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="tipos-col">
            <div className="tipos-col-title">Eventos Sociais</div>
            <ul className="tipos-list">
              {[
                "Aniversários e celebrações",
                "Jantares e experiências gastronômicas",
                "Sunsets e coquetéis",
                "Bodas e datas especiais",
                "Festas temáticas",
                "Eventos beneficentes",
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ── AMBIENTES ── */}
      <section className="section" id="ambientes">
        <div className="eyebrow reveal">Ambientes</div>
        <h2 className="h2 reveal">Três andares. Cada um com sua própria atmosfera.</h2>
        <p className="amb-sub reveal">
          Você pode usar um andar para o seu evento ou tomar conta do espaço inteiro.
          A flexibilidade é parte da estrutura.
        </p>
        <div className="ambientes-grid" data-stagger>
          {AMBIENTES.map((a) => (
            <article className="amb" key={a.name}>
              <div className="amb-img" style={{ backgroundImage: `url('${a.img}')`, backgroundPosition: (a as any).imgPosition ?? "center" }} />
              <div className="amb-body">
                <div className="amb-floor">{a.floor}</div>
                <h3 className="amb-name">{a.name}</h3>
                <div className="amb-specs">
                  {a.specs.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
                <p className="amb-desc">{a.desc}</p>
                <p className="amb-features">{a.features}</p>
                <div className="amb-ideal"><b>Ideal para:</b> {a.ideal}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── ESTRUTURA ── */}
      <section className="section estrutura" id="estrutura">
        <div className="eyebrow reveal">Estrutura</div>
        <h2 className="h2 reveal">Tudo que uma operação de evento precisa. Sem improvisos.</h2>
        <p className="estrutura-sub reveal">
          Eventos travam quando falta estrutura. Aqui, você tem tudo mapeado e
          disponível — da cozinha completa ao banheiro para PNE.
        </p>
        <EstruturaSec />
        <p className="estrutura-close reveal">
          Cada detalhe foi pensado para que você não precise improvisar no dia.
          Porque quando o espaço está pronto, a sua equipe pode focar no que
          realmente importa: a experiência do seu convidado.
        </p>
      </section>

      {/* ── SMART EVENTS ── */}
      <section className="smart grain" id="smart">
        <div className="smart-bg" style={{ backgroundImage: `url('${IMG.smart}')` }} />
        <div className="smart-shroud" />
        <div className="smart-inner">
          <div className="eyebrow light reveal">Smart Events</div>
          <h2 className="h2 reveal">Mais que um espaço — uma equipe que faz acontecer.</h2>
          <p className="reveal">
            A maioria dos locais entrega as chaves e vai embora. Nós ficamos.
          </p>
          <p className="reveal">
            A Smart Events é a empresa de coordenação que opera o Espaço
            Sorocaba. Desde o primeiro contato até o encerramento do evento,
            você tem ao lado uma equipe experiente, com processos estruturados
            e total comprometimento com o resultado.
          </p>
          <div className="smart-covers" data-stagger>
            <div className="smart-cover">
              <div className="smart-cover-label">Pré-evento</div>
              <p className="smart-cover-text">Planejamento, cronograma, briefing técnico, alinhamento de fornecedores</p>
            </div>
            <div className="smart-cover">
              <div className="smart-cover-label">Durante</div>
              <p className="smart-cover-text">Coordenação on-site, suporte à equipe, gestão de imprevistos</p>
            </div>
            <div className="smart-cover">
              <div className="smart-cover-label">Pós-evento</div>
              <p className="smart-cover-text">Encerramento, relatório, acompanhamento e próximos passos</p>
            </div>
          </div>
          <a
            className="smart-link"
            href="mailto:comercial@smevents.com.br"
          >
            Conheça a Smart Events <span className="arr">→</span>
          </a>
        </div>
      </section>

      {/* ── DEPOIMENTOS (oculto temporariamente) ── */}

      {/* ── LOCALIZAÇÃO ── */}
      <section className="section" id="localizacao">
        <div className="eyebrow reveal">Localização</div>
        <h2 className="h2 reveal">No coração de Botafogo. Fácil de chegar. Impossível de esquecer.</h2>
        <div className="loc-grid">
          <div className="loc-copy">
            <p className="reveal">
              Botafogo é um dos bairros mais bem conectados do Rio. A poucos
              minutos da Zona Sul, do Centro e do Aeroporto Santos Dumont —
              com acesso fácil de carro, metrô e aplicativo.
            </p>
            <p className="reveal">
              Seus convidados chegam sem estresse. Seus fornecedores entram com
              facilidade pelo monta-carga. E o endereço já transmite a mensagem
              certa antes mesmo de o evento começar.
            </p>
          </div>
          <div className="loc-details reveal">
            <div className="loc-block">
              <h4>Endereço</h4>
              <p>
                Rua Sorocaba, 625/631 — Botafogo<br />
                Entrada de serviço: Rua Mena Barreto, 79
              </p>
            </div>
            <div className="loc-block">
              <h4>Proximidades</h4>
              <div className="loc-prox">
                {[
                  "Metrô Botafogo: ~5 min a pé",
                  "Aeroporto Santos Dumont: ~15 min de carro",
                  "Praia de Botafogo: ~8 min a pé",
                  "Estacionamentos parceiros nas imediações",
                ].map((item) => (
                  <div className="loc-prox-item" key={item}>
                    <span className="dot" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOUR VIRTUAL 360° ── */}
      <section className="tour" id="tour">
        <div className="tour-header">
          <div>
            <div className="eyebrow reveal">Tour Virtual 360°</div>
            <h2 className="h2 reveal">Explore o espaço antes mesmo de visitá-lo.</h2>
          </div>
          <p className="tour-desc reveal">
            Você não precisa esperar uma visita para saber se o Espaço Sorocaba
            é o lugar certo para o seu evento. Navegue pelos três pavimentos,
            veja as metragens reais, o pé-direito, a entrada de luz e o
            potencial de cada ambiente — da recepção ao rooftop com vista para o Cristo.
          </p>
        </div>
        <TourEmbed src="https://my.matterport.com/show/?m=jaLBWds7wAE" />
        <div className="tour-pills">
          <span className="tour-pill"><span className="dot" />Navegação livre pelo espaço</span>
          <span className="tour-pill"><span className="dot" />Medidas e metragens reais</span>
          <span className="tour-pill"><span className="dot" />Vista do rooftop</span>
          <span className="tour-pill"><span className="dot" />Compatível com VR</span>
          <span className="tour-pill"><span className="dot" />Disponível 24h</span>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section faq" id="faq">
        <div className="eyebrow reveal">Dúvidas frequentes</div>
        <h2 className="h2 reveal">Tudo que você precisa saber antes de contratar.</h2>
        <div className="faq-list">
          {FAQS.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="cta-final">
        <h2 className="h2 reveal">
          Seu próximo grande evento merece um espaço à altura — e uma equipe que garante a execução.
        </h2>
        <p className="cta-sub reveal">
          Preencha o formulário e nossa equipe entra em contato em até 24 horas
          com uma proposta personalizada para o seu evento.
        </p>
        <div className="cta-row reveal">
          <a className="btn" href={WA_ORCAMENTO} target="_blank" rel="noopener noreferrer">Solicite um orçamento gratuito</a>
          <a className="btn btn--ghost-light" href={WA_VISITA} target="_blank" rel="noopener noreferrer">Agende uma visita presencial</a>
        </div>
        <p className="cta-micro">Sem compromisso. Sem burocracia. Só um papo para entender o que você precisa.</p>
      </section>

      {/* ── RODAPÉ ── */}
      <footer className="footer" id="contato">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-mark">Espaço<br />Sorocaba</div>
              <p className="footer-tag">
                Estrutura moderna, localização estratégica e coordenação
                especializada para eventos inesquecíveis em Botafogo.
              </p>
            </div>
            <div className="footer-col">
              <h4>Endereço</h4>
              <span className="footer-line">Rua Sorocaba, 625/631 — Botafogo</span>
              <span className="footer-line">Rio de Janeiro</span>
              <span className="footer-line" style={{ marginTop: 8 }}>Entrada de serviço:</span>
              <span className="footer-line">Rua Mena Barreto, 79</span>
            </div>
            <div className="footer-col">
              <h4>Contato</h4>
              <span className="footer-line"><a href="tel:+5521999242328">(21) 99924-2328</a></span>
              <span className="footer-line"><a href="mailto:comercial@smevents.com.br">comercial@smevents.com.br</a></span>
              <span className="footer-line"><a href="https://instagram.com/espacosorocaba" target="_blank" rel="noopener noreferrer">@espacosorocaba</a></span>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Espaço Sorocaba · Smart Events</span>
            <span>Botafogo · Rio de Janeiro</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
