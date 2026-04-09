"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
}

export default function HeroVideo() {
  const containerRef = useRef<HTMLElement>(null);
  const forestRef = useRef<HTMLImageElement>(null);
  const faceRef = useRef<HTMLImageElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);

  const heroContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const setupTrigger = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=800", // Shorter total scroll
            scrub: 1,
            pin: true,
          },
        });

        // 1. A Navbar Global aparece junto com o card
        const globalNav = document.querySelector("#global-nav");
        if (globalNav) {
          tl.to(globalNav, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
          }, 0);
        }

        // 2. O Mega Card "Glassmorphism" aparece ao fazer scroll
        tl.fromTo(heroContentRef.current,
          { opacity: 0, scale: 1.05, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 2, ease: "power2.out" },
          0
        );

        // 3. Tela parada no final
        tl.to({}, { duration: 0.5 });
      };

      setupTrigger();

      // Welcome "Bem-vindo" intro sequence
      if (welcomeRef.current) {
        const welcomeTl = gsap.timeline();

        // Fade in the welcome text with a subtle scale
        welcomeTl.fromTo(welcomeRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        );

        // Hold for 1.5 seconds
        welcomeTl.to({}, { duration: 1.5 });

        // Fade out — scroll only starts AFTER this completes
        welcomeTl.to(welcomeRef.current,
          {
            opacity: 0,
            scale: 1.05,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              if (welcomeRef.current) {
                welcomeRef.current.style.display = "none";
              }
              // Slow, smooth auto-scroll to 50% of the hero pinned range
              gsap.to(window, {
                scrollTo: { y: 400, autoKill: true },
                duration: 2,
                ease: "power2.inOut"
              });
            }
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-emerald-950">
      {/* Welcome Overlay */}
      <div
        ref={welcomeRef}
        className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none opacity-0"
      >
        {/* Dark radial vignette behind text */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 80%)' }}
        />
        <h2
          className="relative text-[7rem] md:text-[10rem] lg:text-[12rem] font-light text-primary leading-none tracking-tighter"
          style={{
            fontFamily: "'Poppins', sans-serif",
            textShadow: '0 0 80px rgba(145,247,142,0.5), 0 0 160px rgba(145,247,142,0.2), 0 6px 30px rgba(0,0,0,0.8)',
          }}
        >
          Bem-vindo
        </h2>
      </div>
      {/* Background Integrado (Floresta Esquerda + Rosto Direita) */}
      <div className="absolute inset-0 z-0 bg-emerald-950">
        {/* Imagem Base da Esquerda (Amazon Greenpeace) */}
        <img
          ref={forestRef}
          src="https://www.greenpeace.org/static/planet4-brasil-stateless/2024/05/5b07ea98-floresta-amazonica.jpg"
          alt="Floresta Amazônica"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Imagem de Rosto (Focalizada a direita) */}
        <div 
          className="absolute top-0 right-0 bottom-0 w-full md:w-[60vw] pointer-events-none"
          style={{
            maskImage: "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          }}
        >
          <img
            ref={faceRef}
            src="/rosto.png"
            alt="Rosto"
            className="w-full h-full object-cover object-[80%_center] scale-100"
          />
        </div>

        {/* Camada de controle de luz suave por cima para unificar */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/10 to-black/30 pointer-events-none" />
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
