import React from 'react';
import { useGame, AppView } from '../context/GameContext';
import { TRANSLATIONS } from '../data/translations';
import { soundEngine } from '../utils/audio';
import { Volume2, VolumeX, Award, BookOpen, Clock, HelpCircle, Compass, FileText } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    currentView,
    setCurrentView,
    score,
    collectedArtifacts,
    soundMuted,
    toggleSound
  } = useGame();

  const t = TRANSLATIONS.nav;

  const navItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'quest', label: t.quest[language], icon: <Compass className="w-4 h-4" /> },
    { view: 'timeline', label: t.timeline[language], icon: <Clock className="w-4 h-4" /> },
    { view: 'codex', label: t.codex[language], icon: <BookOpen className="w-4 h-4" /> },
    { view: 'quiz', label: t.quiz[language], icon: <HelpCircle className="w-4 h-4" /> },
    { view: 'certificate', label: t.certificate[language], icon: <FileText className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: AppView) => {
    soundEngine.playClick();
    setCurrentView(view);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-900 shadow-xs">
      {/* Refined National Ribbon Accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-red-600 via-amber-400 to-emerald-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand / Title */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left transition hover:opacity-85 shrink-0 cursor-pointer"
        >
          <span className="font-serif-title font-bold text-lg sm:text-xl tracking-wide text-slate-900 whitespace-nowrap">
            {t.title[language]}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 shrink-0">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Relics Counter */}
          <button
            onClick={() => handleNavClick('codex')}
            title={language === 'by' ? 'Каталог рэліквій' : 'Каталог реликвий'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 hover:border-amber-500/60 transition cursor-pointer whitespace-nowrap shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-bold">{collectedArtifacts.length}/12</span>
          </button>

          {/* Score Counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700 whitespace-nowrap shadow-xs">
            <Award className="w-3.5 h-3.5" />
            <span className="font-bold">{score} б.</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            title={soundMuted ? (language === 'by' ? 'Уключыць гук' : 'Включить звук') : (language === 'by' ? 'Выключыць гук' : 'Выключить звук')}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition cursor-pointer shrink-0 shadow-xs"
          >
            {soundMuted ? (
              <VolumeX className="w-4 h-4 text-red-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0 shadow-xs">
            <button
              onClick={() => setLanguage('by')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition cursor-pointer ${
                language === 'by'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              BY
            </button>
            <button
              onClick={() => setLanguage('ru')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition cursor-pointer ${
                language === 'ru'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              RU
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 px-2 py-2 bg-white overflow-x-auto gap-1">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                isActive
                  ? 'bg-amber-50 text-amber-900 border border-amber-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
