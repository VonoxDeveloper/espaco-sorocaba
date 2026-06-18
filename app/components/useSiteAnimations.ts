"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "@/app/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

const EXPO  = "expo.out";
const QUINT = "power3.out";
const SOFT  = "power2.out";

export function useSiteAnimations() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.4,
      infinite: false,
    });

    setLenis(lenis);

    gsap.ticker.add((time: number) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 40,
      ignoreMobileResize: true,
    });
    ScrollTrigger.defaults({ invalidateOnRefresh: true });

    if (reduce) {
      return () => {
        gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
        lenis.destroy();
        setLenis(null as unknown as Lenis);
      };
    }

    const ctx = gsap.context(() => {

      // ── Hero intro (one-time, não repete) ──────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: EXPO, overwrite: "auto" } });

      tl.from(".hero-headline .line > span", {
        yPercent: 105,
        duration: 1.15,
        stagger: { amount: 0.28, ease: SOFT },
      })
        .from(".hero-sub", { y: 28, opacity: 0, duration: 1.0, ease: QUINT }, "-=0.72")
        .from(".hero .cta-row > *", { y: 20, opacity: 0, duration: 0.8, stagger: 0.12, ease: QUINT }, "-=0.65")
        .from(".hero-meta span", { opacity: 0, y: -10, duration: 0.7, stagger: 0.1, ease: SOFT }, "-=0.75");

      // ── Parallax (scrub — bidirecional por natureza) ───────────────────────
      gsap.to(".hero-img", {
        yPercent: 16, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
      });

      gsap.to(".smart-bg", {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: ".smart", start: "top bottom", end: "bottom top", scrub: 0.6 },
      });

      // ── Tour embed ────────────────────────────────────────────────────────
      const embedWrap = document.querySelector<HTMLElement>(".tour-embed-wrap");
      if (embedWrap) {
        gsap.set(embedWrap, { opacity: 0, scale: 0.97, y: 28 });
        ScrollTrigger.create({
          trigger: embedWrap,
          start: "top bottom",
          onEnter: () =>
            gsap.to(embedWrap, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: EXPO, overwrite: "auto" }),
          onLeaveBack: () =>
            gsap.to(embedWrap, { opacity: 0, scale: 0.97, y: 28, duration: 0.6, ease: SOFT, overwrite: "auto" }),
          onEnterBack: () =>
            gsap.to(embedWrap, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: EXPO, overwrite: "auto" }),
        });
      }

      // ── Tour pills ────────────────────────────────────────────────────────
      const pills = gsap.utils.toArray<HTMLElement>(".tour-pill");
      if (pills.length) {
        gsap.set(pills, { opacity: 0, y: 12 });
        ScrollTrigger.create({
          trigger: ".tour-pills",
          start: "top bottom",
          onEnter: () =>
            gsap.to(pills, { opacity: 1, y: 0, duration: 0.7, ease: QUINT, stagger: { amount: 0.4, ease: SOFT }, overwrite: "auto" }),
          onLeaveBack: () =>
            gsap.to(pills, { opacity: 0, y: 12, duration: 0.4, ease: SOFT, stagger: { amount: 0.2, from: "end" }, overwrite: "auto" }),
          onEnterBack: () =>
            gsap.to(pills, { opacity: 1, y: 0, duration: 0.7, ease: QUINT, stagger: { amount: 0.4, from: "end", ease: SOFT }, overwrite: "auto" }),
        });
      }

      // ── Reveals genéricos (bidirecional via toggleActions) ─────────────────
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 1.0, ease: QUINT, overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── Grupos stagger (bidirecional com callbacks) ───────────────────────
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = Array.from(group.children) as HTMLElement[];
        gsap.set(items, { opacity: 0, y: 22 });
        ScrollTrigger.create({
          trigger: group,
          start: "top bottom",
          onEnter: () =>
            gsap.to(items, { opacity: 1, y: 0, duration: 0.75, ease: QUINT, stagger: { amount: 0.55, ease: SOFT }, overwrite: "auto" }),
          onLeaveBack: () =>
            gsap.to(items, { opacity: 0, y: 22, duration: 0.45, ease: SOFT, stagger: { amount: 0.3, from: "end" }, overwrite: "auto" }),
          onEnterBack: () =>
            gsap.to(items, { opacity: 1, y: 0, duration: 0.75, ease: QUINT, stagger: { amount: 0.45, from: "end", ease: SOFT }, overwrite: "auto" }),
        });
      });

      // ── Headings h2 (bidirecional via toggleActions) ──────────────────────
      gsap.utils.toArray<HTMLElement>(".h2").forEach((el) => {
        const lines = el.querySelectorAll<HTMLElement>("span, em");
        const target = lines.length ? lines : [el];
        gsap.fromTo(
          target,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: EXPO, stagger: 0.06, overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── Eyebrows (bidirecional via toggleActions) ─────────────────────────
      gsap.utils.toArray<HTMLElement>(".eyebrow").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 10 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: QUINT, overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
      lenis.destroy();
      setLenis(null as unknown as Lenis);
    };
  }, []);
}
