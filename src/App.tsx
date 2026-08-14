import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ChapterViewer } from './components/ChapterViewer';
import { SkillifyEngine } from './components/SkillifyEngine';
import { FieldOfVisionSim } from './components/FieldOfVisionSim';
import { WhitePillMatrix } from './components/WhitePillMatrix';
import { EarnestnessRadar } from './components/EarnestnessRadar';
import { CivicFlywheel } from './components/CivicFlywheel';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [videoTimestamp, setVideoTimestamp] = useState<number>(0);

  const handleOpenVideo = (seconds: number = 0) => {
    setVideoTimestamp(seconds);
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#f1f1f5] flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* HUD Navigation */}
      <Navigation
        activeSection={activeSection}
        onSelectSection={scrollToSection}
        onOpenVideo={handleOpenVideo}
      />

      {/* Main Canvas */}
      <main className="flex-grow">
        <Hero
          onOpenVideo={handleOpenVideo}
          onExploreThemes={() => scrollToSection('chapters')}
          onLaunchSkillify={() => scrollToSection('skillify')}
        />

        {/* 01 // The 5 Core Thematic Pillars */}
        <ChapterViewer onOpenVideo={handleOpenVideo} />

        {/* 02 // The Skillify Engine Playground */}
        <SkillifyEngine />

        {/* 03 // Field of Vision: 2015 vs 2026 Simulation */}
        <FieldOfVisionSim />

        {/* 04 // The "White Pill" on AI Adoption Matrix */}
        <WhitePillMatrix />

        {/* 05 // The Earnestness Founder Diagnostic Radar */}
        <EarnestnessRadar />

        {/* 06 // The Physical & Civic Flywheel */}
        <CivicFlywheel />
      </main>

      {/* Footer & Playbook Bundle Exporter */}
      <Footer />

      {/* Embedded YouTube Video Theater Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        initialSeconds={videoTimestamp}
        onClose={handleCloseVideo}
      />

    </div>
  );
};

export default App;
