"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import Lenis from "lenis";
import DashboardIntro from "@/components/DashboardIntro";
import EnvelopeIntroScreen from "@/components/EnvelopeIntroScreen";
import MagicalBackground from "@/components/MagicalBackground";
import GoldSparkles from "@/components/GoldSparkles";
import CountdownSection from "@/components/CountdownSection";
import WelcomeSection from "@/components/WelcomeSection";
import InvitationSection from "@/components/InvitationSection";
import ParentsSection from "@/components/ParentsSection";
import TimelineSection from "@/components/TimelineSection";
import LocationSection from "@/components/LocationSection";
import ThankYouSection from "@/components/ThankYouSection";
import FireworksEnding from "@/components/FireworksEnding";
import MusicControl from "@/components/MusicControl";
import { ConfettiBurst, Bubbles, SparkleTrail, Butterflies } from "@/components/SectionEffects";

function SectionEffect({ children, effect }: { children: ReactNode; effect: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <div ref={ref} className="relative">
      {inView && (
        <>
          {effect === "confetti" && <ConfettiBurst trigger={true} />}
          {effect === "bubbles" && <Bubbles active={true} />}
          {effect === "sparkles" && <SparkleTrail active={true} />}
          {effect === "butterflies" && <Butterflies active={true} />}
        </>
      )}
      {children}
    </div>
  );
}

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); lenisRef.current = null; };
  }, []);

  return (
    <>
      {showDashboard && <DashboardIntro onStart={() => { setShowDashboard(false); setShowEnvelope(true); }} />}

      {showEnvelope && <EnvelopeIntroScreen />}

      <MagicalBackground />

      <main className="relative z-10">
        <GoldSparkles count={18} />

        <SectionEffect effect="bubbles"><WelcomeSection /></SectionEffect>
        <SectionEffect effect="sparkles"><InvitationSection /></SectionEffect>
        <SectionEffect effect="confetti"><CountdownSection /></SectionEffect>
        <SectionEffect effect="butterflies"><ParentsSection /></SectionEffect>
        <SectionEffect effect="confetti"><TimelineSection /></SectionEffect>
        <SectionEffect effect="bubbles"><LocationSection /></SectionEffect>
        <SectionEffect effect="sparkles"><ThankYouSection /></SectionEffect>
        <FireworksEnding />

        <MusicControl />

        <footer className="relative z-10 py-8 text-center px-6">
          <p className="text-[14px] font-[var(--font-poppins)] tracking-wider" style={{ color: "rgba(58,90,122,0.2)" }}>
            — Esta invitación fue hecha con amor para michi —
          </p>
        </footer>
      </main>
    </>
  );
}
