"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroVideo() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      const setupTrigger = () => {
        const duration = video.duration || 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2200", // Shorter total scroll
            scrub: 1,
            pin: true,
          },
        });

        // 1. Scrub do background video ends at duration 7 out of 10
        tl.to(video, {
          currentTime: duration,
          ease: "none",
          duration: 7,
        }, 0);

        // 2. Some com a indicação inicial de scroll instantaneamente
        tl.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: -20,
          duration: 1,
        }, 0);

        // 3. A Navbar Global aparece junto com o card (tempo 5)
        const globalNav = document.querySelector("#global-nav");
        if (globalNav) {
          tl.to(globalNav, {
            opacity: 1,
            duration: 2,
            ease: "power2.out"
          }, 5);
        }

        // 4. O Mega Card "Glassmorphism" entra no fim do video scrub
        tl.fromTo(heroContentRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
          5 // Finish fully revealing by 7
        );

        // 5. Tela parada no final por mais um curto scroll
        tl.to({}, { duration: 3 });
      };

      if (video.readyState >= 1) {
        setupTrigger();
      } else {
        video.onloadedmetadata = () => setupTrigger();
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Background Video Expandido */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/floresta_scrub.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-[1.02]"
        />
        {/* Camada de controle de luz suave por cima do video */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Indicador Inicial (Scroll to review/explore) */}
      <div ref={scrollIndicatorRef} className="absolute z-20 flex flex-col items-center justify-center gap-4 opacity-100 pointer-events-none">
        <span className="font-headline text-5xl md:text-7xl text-emerald-950 font-bold tracking-tight drop-shadow-lg text-glow">
          Role para descobrir
        </span>
        <div className="w-[2px] h-20 bg-gradient-to-b from-emerald-950 to-transparent animate-pulse drop-shadow-md" />
        <span className="material-symbols-outlined text-emerald-950 text-6xl animate-bounce drop-shadow-lg">
          south
        </span>
      </div>

      {/* Frame Gigante estilo "Wandertrip Print" */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-6 md:p-12">
        <div
          ref={heroContentRef}
          className="w-full max-w-[1200px] h-auto min-h-[65vh] opacity-0 flex flex-col justify-between p-8 md:p-16 border border-white/20 rounded-[3rem] bg-white/5 backdrop-blur-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all pointer-events-auto"
        >

          {/* Topo vazio por causa do Global Nav */}
          <div className="w-full h-10"></div>

          {/* Centro - Título Enorme */}
          <div className="w-full max-w-4xl pt-10">
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-headline font-bold text-white leading-[1.05] tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              Preservando o Coração<br />
              <span className="font-medium text-emerald-50">da Floresta</span>
            </h1>
          </div>

          {/* Rodapé Interno do Frame */}
          <div className="w-full flex flex-col md:flex-row justify-between items-end gap-10 pb-4">

            {/* Esquerda - Botão + Descrição estilo imagem */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 max-w-2xl">
              <button className="flex items-center gap-4 px-8 py-4 rounded-full bg-white text-emerald-950 font-bold hover:scale-105 transition-transform pointer-events-auto shadow-xl">
                Conhecer Projetos
                <span className="material-symbols-outlined bg-emerald-950 text-white rounded-full p-1 text-sm">
                  north_east
                </span>
              </button>
              <p className="text-white/90 font-body text-sm md:text-base leading-relaxed drop-shadow-md border-l border-white/30 pl-6">
                Engenharia de precisão para ecossistemas sustentáveis. ── <br />
                Utilizamos biologia sintética e IA para orientar a arquitetura<br />
                e regeneração contínua da biomassa florestal.
              </p>
            </div>

            {/* Direita - Explore More + SETA */}
            <div className="flex items-center gap-2 text-white pointer-events-auto cursor-pointer group hover:text-emerald-300 transition-colors">
              <span className="font-label uppercase tracking-widest text-sm font-bold drop-shadow-md">Explore mais</span>
              <span className="material-symbols-outlined transform group-hover:translate-y-1 transition-transform drop-shadow-md">
                south
              </span>
            </div>

          </div>

          {/* Botões Laterais Direita (Social) */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
            <a href="#" className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-emerald-950 transition-all backdrop-blur-md">
              <span className="material-symbols-outlined font-light">share</span>
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-emerald-950 transition-all backdrop-blur-md">
              <span className="material-symbols-outlined font-light">mail</span>
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-emerald-950 transition-all backdrop-blur-md">
              <span className="material-symbols-outlined font-light">play_arrow</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
