"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CinematicVideo() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

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
            end: "+=4000",
            scrub: 1,
            pin: true,
          },
        });

        // Video scrub across full timeline
        tl.to(video, {
          currentTime: duration,
          ease: "none",
          duration: 10,
        }, 0);

        // Phase 1
        tl.fromTo(text1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          0.5
        ).to(text1Ref.current,
          { opacity: 0, y: -40, duration: 1 },
          3.0
        );

        // Phase 2
        tl.fromTo(text2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          4.0
        ).to(text2Ref.current,
          { opacity: 0, y: -40, duration: 1 },
          6.5
        );

        // Phase 3 — enters and stays
        tl.fromTo(text3Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          7.5
        );
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
    <section
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden"
    >
      {/* Full-bleed video background */}
      <video
        ref={videoRef}
        src="/crescendo_scrub.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ objectPosition: "30% center" }}
      />

      {/* Organic white blur overlay — left side, blending into video */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 120% at 15% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 30%, rgba(255,255,255,0.3) 55%, transparent 70%),
            linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 25%, transparent 50%)
          `,
          backdropFilter: "blur(0px)",
        }}
      />

      {/* Separate blur layer — only covers the left portion for the frosted effect */}
      <div
        className="absolute top-0 left-0 bottom-0 z-[9] hidden md:block"
        style={{
          width: "45%",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          maskImage: "linear-gradient(to right, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 100%)",
        }}
      />

      {/* Text content — left-aligned with phases */}
      <div className="absolute top-0 left-0 bottom-0 w-full md:w-5/12 z-20 flex items-center px-10 md:px-20 pointer-events-none">
        <div className="relative w-full h-full">

          {/* Text Phase 1 */}
          <div ref={text1Ref} className="absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-auto">
            <span className="font-label text-sm uppercase tracking-[0.3em] text-emerald-500 font-bold mb-4">
              Gênesis
            </span>
            <h3 className="text-4xl md:text-5xl font-headline text-emerald-950 font-bold leading-tight mb-6">
              Toda grande mudança inicia-se em uma semente.
            </h3>
            <p className="text-neutral-600 font-body text-lg leading-relaxed">
              Nossos sensores multiespectrais identificam o potencial de regeneração do solo antes mesmo do primeiro plantio.
            </p>
          </div>

          {/* Text Phase 2 */}
          <div ref={text2Ref} className="absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-auto">
            <span className="font-label text-sm uppercase tracking-[0.3em] text-emerald-500 font-bold mb-4">
              Crescimento
            </span>
            <h3 className="text-4xl md:text-5xl font-headline text-emerald-950 font-bold leading-tight mb-6">
              Engenharia que respira.
            </h3>
            <p className="text-neutral-600 font-body text-lg leading-relaxed">
              Utilizamos biologia sintética e machine learning para orientar o crescimento do dossel. A natureza é o Hardware, a ciência é o Software.
            </p>
          </div>

          {/* Text Phase 3 — stays visible */}
          <div ref={text3Ref} className="absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-auto">
            <span className="font-label text-sm uppercase tracking-[0.3em] text-emerald-500 font-bold mb-4">
              O Futuro
            </span>
            <h3 className="text-4xl md:text-5xl font-headline text-emerald-950 font-bold leading-tight mb-6">
              The Lungs of the Earth
            </h3>
            <p className="text-neutral-600 font-body text-lg leading-relaxed mb-8">
              Um ecossistema resiliente, auto-suficiente e totalmente neutro em carbono, protegido pela tecnologia SYLVA ENG.
            </p>
            <div>
              <button className="px-8 py-3 rounded-full bg-emerald-950 text-emerald-400 font-bold hover:bg-emerald-900 transition-all text-sm uppercase tracking-widest pointer-events-auto">
                Ver Resultados
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
