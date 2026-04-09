"use client";

import React, { useState, useEffect, useRef } from "react";
import CinematicVideo from "@/components/CinematicVideo";
import HeroVideo from "@/components/HeroVideo";

type CardData = {
  title: string;
  image?: string;
  text: string;
  dronesText?: string;
};

const cardsInfo: Record<string, CardData> = {
  geo: {
    title: "Análise Geoespacial",
    image: "/aereo.jpg",
    text: "O processo de Análise Geoespacial envolve o mapeamento ultra-preciso de áreas florestais para monitorar em tempo real a cobertura vegetal, topografia e a saúde do ecossistema.",
    dronesText: "O uso de drones equipados com sensores de alta precisão é fundamental neste processo. Eles sobrevoam áreas extensas ou de difícil acesso para capturar imagens de alta resolução, criar fotogrametria e extrair dados cruciais para a tomada de decisão em projetos de conservação."
  },
  gestao: {
    title: "Gestão Florestal Sustentável",
    text: "Modelos matemáticos de extração de baixo impacto que garantem a regeneração contínua da biomassa e integridade do solo, assegurando um manejo responsável dos ecossistemas."
  },
  auditoria: {
    title: "Auditoria de Sequestro de Carbono",
    text: "Certificação rigorosa de créditos de carbono através de auditorias de campo e verificação por satélite com padrão ISO, garantindo transparência e rastreabilidade nos processos ambientais."
  },
  reflorestamento: {
    title: "Engenharia de Reflorestamento",
    text: "Design de ecossistemas nativos com alta diversidade genética, otimizados para resiliência climática e restauração de corredores de biodiversidade ecológicos."
  }
};

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* TopNavBar */}
      <nav id="global-nav" className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 bg-white/5 backdrop-blur-[6px] border border-white/20 rounded-full mt-6 mx-auto w-[92%] max-w-6xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] opacity-0 transition-opacity">
        <div className="font-headline italic text-2xl tracking-tighter text-emerald-50 font-bold drop-shadow-md">FLOR ENG</div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-white font-bold border-b-2 border-white pb-1 font-label text-sm uppercase tracking-wider drop-shadow-md" href="#">Início</a>
          <a className="text-white/80 font-medium hover:text-white transition-colors duration-300 font-label text-sm uppercase tracking-wider drop-shadow-md" href="#">Serviços</a>
          <a className="text-white/80 font-medium hover:text-white transition-colors duration-300 font-label text-sm uppercase tracking-wider drop-shadow-md" href="#">Impacto</a>
          <a className="text-white/80 font-medium hover:text-white transition-colors duration-300 font-label text-sm uppercase tracking-wider drop-shadow-md" href="#">Sobre</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 rounded-full bg-white/10 text-white border border-white/30 font-bold hover:bg-white/20 transition-all text-sm uppercase tracking-widest backdrop-blur-md">Contato</button>
          <button className="px-6 py-2 rounded-full bg-white text-emerald-950 font-bold hover:scale-105 transition-transform text-sm uppercase tracking-widest shadow-lg">Orçamento</button>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroVideo />

      {/* Services Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-headline text-on-surface mb-6">Engenharia em Harmonia</h2>
          <p className="text-on-surface-variant font-body max-w-xl mx-auto uppercase tracking-widest text-sm">Nossas Soluções Técnicas</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          <div
            className="md:col-span-8 bg-surface-container-high rounded-[2rem] overflow-hidden group relative transition-transform duration-500 hover:-translate-y-2 cursor-none"
            onClick={() => setSelectedCard('geo')}
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={() => setIsHoveringCard(false)}
          >
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq_GF6Ve5CNxCQlr4wVejr9qZ4eSR0OKkT7W5RsO_0iCp4WrcKQzJjZmi9R3GOedvNz4NDXzbh2we6_0t3RChsvknt7NunmLng3OzHNeIVsfYvkymAHkTVpq9i4havFX0AGXxC9IHeiVJkZBYVJtvoaDgvyPvxtUItoXx9yeuliO8v2APrea3QsS04EWWT-3N_qGz6PkiuPw_lmnK8-sk3ZjuklQu-qwPH0WxTXEx4Bo1-hHmq3f5f2cs7grD8TlnMD6rIfaOBDYA" alt="Geospatial Analysis" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent pointer-events-none" />
            <div className="relative z-10 p-10 h-full flex flex-col justify-end">
              <div className="transform transition-transform duration-500 group-hover:-translate-y-3">
                <span className="material-symbols-outlined text-primary text-5xl mb-4">biotech</span>
                <h3 className="text-3xl font-headline text-on-surface mb-4">GIS/Análise Geoespacial</h3>
                <p className="text-on-surface-variant max-w-md font-body leading-relaxed">
                  Mapeamento ultra-preciso de ativos florestais utilizando LiDAR e análise multiespectral para monitoramento em tempo real da saúde do dossel.
                </p>
              </div>
            </div>
          </div>
          <div
            className="md:col-span-4 bg-surface-container-low rounded-[2rem] p-10 flex flex-col border border-outline-variant/10 group hover:border-primary/30 transition-all cursor-none"
            onClick={() => setSelectedCard('gestao')}
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={() => setIsHoveringCard(false)}
          >
            <span className="material-symbols-outlined text-primary text-5xl mb-8 group-hover:scale-110 transition-transform">potted_plant</span>
            <h3 className="text-2xl font-headline text-on-surface mb-4">Gestão Florestal Sustentável</h3>
            <p className="text-on-surface-variant font-body mb-8">
              Modelos matemáticos de extração de baixo impacto que garantem a regeneração contínua da biomassa e integridade do solo.
            </p>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">Saiba Mais</span>
              <span className="material-symbols-outlined text-primary">arrow_forward</span>
            </div>
          </div>
          <div
            className="md:col-span-4 bg-surface-container-low rounded-[2rem] p-10 flex flex-col border border-outline-variant/10 group hover:border-primary/30 transition-all cursor-none"
            onClick={() => setSelectedCard('auditoria')}
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={() => setIsHoveringCard(false)}
          >
            <span className="material-symbols-outlined text-primary text-5xl mb-8 group-hover:scale-110 transition-transform">co2</span>
            <h3 className="text-2xl font-headline text-on-surface mb-4">Auditoria de Sequestro de Carbono</h3>
            <p className="text-on-surface-variant font-body mb-8">
              Certificação rigorosa de créditos de carbono através de auditorias de campo e verificação por satélite com padrão ISO.
            </p>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">Ver Protocolos</span>
              <span className="material-symbols-outlined text-primary">arrow_forward</span>
            </div>
          </div>
          <div
            className="md:col-span-8 bg-surface-container-high rounded-[2rem] overflow-hidden group relative transition-transform duration-500 hover:-translate-y-2 cursor-none"
            onClick={() => setSelectedCard('reflorestamento')}
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={() => setIsHoveringCard(false)}
          >
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6gbELQ-rymvlq_8foedZqQhazluWD8r-JK1f5OJSZ7rbLW735ZGJAqA7MgTHFp3oMkWH3Vx7Cvc91w6h0Bvr1NBuZkMjcF1bcGfVQlTzmrok4tJmG1DGI4m3yzpypUdyAddXJoqhkhmm0cYKIxOhwIUeWCLZCeTeOmSSjZA3jr9Mfn6qBW4-W63iHvcO2i5jenNO4HrJ6PwkiNwmeDfoCkp0tx5uBHgx4m9IKMbhBe8wDbMXxJz90B9qIYoIXgQn30pPMiLnk83g" alt="Reforestation" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent pointer-events-none" />
            <div className="relative z-10 p-10 h-full flex flex-col justify-end">
              <div className="transform transition-transform duration-500 group-hover:-translate-y-3">
                <span className="material-symbols-outlined text-primary text-5xl mb-4">forest</span>
                <h3 className="text-3xl font-headline text-on-surface mb-4">Engenharia de Reflorestamento</h3>
                <p className="text-on-surface-variant max-w-md font-body leading-relaxed">
                  Design de ecossistemas nativos com alta diversidade genética, otimizados para resiliência climática e restauração de corredores de biodiversidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Video Area */}
      <CinematicVideo />

      {/* Impact Section */}
      <section className="py-32 px-8 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            <h2 className="text-5xl md:text-6xl font-headline text-on-surface mb-8">Nosso Impacto em Números</h2>
            <p className="text-lg text-on-surface-variant font-body mb-12">
              Nossa engenharia não é apenas teórica. Medimos o sucesso através da vitalidade dos solos e do retorno da vida selvagem aos seus habitats originais.
            </p>
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-3 items-end">
                  <span className="font-label uppercase tracking-widest text-sm text-on-surface">Hectares Protegidos</span>
                  <span className="text-primary font-bold text-2xl">450,000+</span>
                </div>
                <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[85%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3 items-end">
                  <span className="font-label uppercase tracking-widest text-sm text-on-surface">Índice de Biodiversidade</span>
                  <span className="text-primary font-bold text-2xl">0.94</span>
                </div>
                <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[94%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-3 items-end">
                  <span className="font-label uppercase tracking-widest text-sm text-on-surface">Projetos de Neutralidade de Carbono</span>
                  <span className="text-primary font-bold text-2xl">124 active</span>
                </div>
                <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[72%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            <div className="rounded-3xl overflow-hidden mt-12 shadow-2xl shadow-black/50">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyIg-tpXUAH2lEMFeHrrd3QF7MJX_KOrJuh3yTCMY_ga5fOJxzEhP5gBx2EDQxVQ_Yl1n8BAzxxChwsYCR1tM7WbmDSWTNPuPYaj4VT9zAu8x3K7ZliZI20y0kMEJwQ4qUZuonDvD1oHYIoMAadIzVRuv6SOkrdPO76Y1F2sCJHIRGaeVzVU3uG7ogBD1zzxsAjitvKyQqqfQKJqNmM6sqafieko_Lyqd_jwIGR5R1XppGW3VJGWeK3wWzuedSygwds_-Cz09C--s" alt="Rainforest" />
            </div>
            <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-black/50">
              <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" src="fiscal.png" alt="Scientist" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="bg-emerald-950 rounded-[3rem] p-10 md:p-20 relative overflow-hidden flex flex-col md:flex-row gap-16 items-center shadow-2xl">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="w-full md:w-1/2 relative z-10">
            <h2 className="text-4xl md:text-6xl font-headline text-emerald-50 mb-6 font-medium">Inicie seu Projeto Ambiental.</h2>
            <p className="text-emerald-100/70 font-body mb-8 text-lg">
              Pronto para aplicar engenharia avançada na preservação e expansão do seu ativo florestal? Preencha o formulário e nossa equipe técnica entrará em contato.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-emerald-100/90">
                <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                <span className="font-body text-sm tracking-wide">Rua dos , 1000 - Belo Horizonte, MG</span>
              </div>
              <div className="flex items-center gap-4 text-emerald-100/90">
                <span className="material-symbols-outlined text-primary text-2xl">mail</span>
                <span className="font-body text-sm tracking-wide">contato@floreng.com.br</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative z-10">
            <form className="flex flex-col gap-5 bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-emerald-50 font-label text-xs uppercase tracking-widest pl-2">Nome Completo</label>
                <input type="text" placeholder="Seu Nome" className="bg-white/5 border border-white/10 rounded-full px-6 py-4 text-emerald-50 placeholder:text-emerald-100/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-body text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-emerald-50 font-label text-xs uppercase tracking-widest pl-2">E-mail Corporativo</label>
                <input type="email" placeholder="seuemail@empresa.com" className="bg-white/5 border border-white/10 rounded-full px-6 py-4 text-emerald-50 placeholder:text-emerald-100/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-body text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-emerald-50 font-label text-xs uppercase tracking-widest pl-2">Descreva sua Demanda</label>
                <textarea rows={3} placeholder="Preciso de consultoria para..." className="bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-emerald-50 placeholder:text-emerald-100/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-body text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="mt-4 px-6 py-4 rounded-full bg-primary text-emerald-950 font-bold hover:scale-[1.02] transition-transform text-sm uppercase tracking-widest shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Area */}
      <footer className="w-full py-16 px-8 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-emerald-900/10 bg-emerald-950">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="text-emerald-400 font-headline text-3xl italic tracking-tighter">FLOR ENG</div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-emerald-700/60 font-bold italic">© 2024 Flor Eng. Engenharia para a Vida.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          <a className="text-emerald-800 hover:text-primary transition-all font-body text-xs font-bold uppercase tracking-widest" href="#">ISO 14001 Certified</a>
          <a className="text-emerald-800 hover:text-primary transition-all font-body text-xs font-bold uppercase tracking-widest" href="#">Forest Stewardship Council</a>
          <a className="text-emerald-800 hover:text-primary transition-all font-body text-xs font-bold uppercase tracking-widest" href="#">PEFC International</a>
          <a className="text-emerald-800 hover:text-primary transition-all font-body text-xs font-bold uppercase tracking-widest" href="#">Privacy Policy</a>
        </div>
      </footer>
      {/* Contextual Action Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[75]"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={`w-[110px] h-[110px] -ml-[55px] -mt-[55px] bg-emerald-300 text-emerald-950 font-label rounded-full flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(110,231,183,0.4)] transition-all duration-300 ease-out ${isHoveringCard ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
        >
          Saber Mais
        </div>
      </div>

      {/* Overlay Expansion */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8 transition-all duration-300"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="w-[95vw] md:w-[90vw] xl:max-w-[1400px] h-[90vh] md:h-[80vh] max-h-[900px] bg-white rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-6 right-6 z-20 bg-white/80 hover:bg-white text-emerald-950 rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-md hover:scale-105 backdrop-blur-md"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {cardsInfo[selectedCard].image && (
              <div className="w-full md:w-[60%] h-80 md:h-full relative shrink-0">
                <img
                  src={cardsInfo[selectedCard].image}
                  alt={cardsInfo[selectedCard].title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className={`p-8 md:p-14 flex flex-col justify-center overflow-y-auto ${cardsInfo[selectedCard].image ? 'w-full md:w-[40%]' : 'w-full'}`}>
              <h2 className="text-4xl md:text-5xl font-headline text-emerald-950 mb-8">{cardsInfo[selectedCard].title}</h2>
              <div className="space-y-6">
                <p className="text-gray-600 font-body text-lg leading-relaxed">
                  {cardsInfo[selectedCard].text}
                </p>
                {cardsInfo[selectedCard].dronesText && (
                  <div className="bg-emerald-50 p-6 rounded-[1.5rem] border border-emerald-100">
                    <div className="flex items-center gap-3 mb-3 text-emerald-800 font-bold">
                      <span className="material-symbols-outlined">flight</span>
                      <h3>Uso de Drones</h3>
                    </div>
                    <p className="text-sm text-emerald-900 leading-relaxed font-body">
                      {cardsInfo[selectedCard].dronesText}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedCard(null);
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="mt-8 w-full py-4 rounded-full bg-emerald-950 text-emerald-50 font-bold hover:bg-primary hover:text-emerald-950 transition-all duration-300 text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 group"
              >
                Entre em Contato
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
