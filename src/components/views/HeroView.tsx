import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { TRANSLATIONS } from '../../data/translations';
import { soundEngine } from '../../utils/audio';
import { Compass, BookOpen, Clock, HelpCircle, Award, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

const HERO_SLIDES = [
  {
    src: '/images/skaryna_bible.jpg',
    label: { by: 'XVI стагоддзе · Кнігадрукаванне', ru: 'XVI век · Книгопечатание' },
  },
  {
    src: '/images/mir_castle.jpg',
    label: { by: 'XVI–XVIII стст. · Замкавае дойлідства', ru: 'XVI–XVIII вв. · Замковое зодчество' },
  },
  {
    src: '/images/brest_fortress.jpg',
    label: { by: '1941–1944 гг. · Усенародны подзвіг', ru: '1941–1944 гг. · Всенародный подвиг' },
  },
  {
    src: '/images/satellite_space.jpg',
    label: { by: '2024 г. · Сучасная навука і космас', ru: '2024 г. · Современная наука и космос' },
  },
];

const SLIDE_DURATION = 4500; // ms per slide

export const HeroView: React.FC = () => {
  const {
    language,
    setCurrentView,
    setCurrentEpoch,
    unlockedEpochs,
    completedEpochs
  } = useGame();

  const [slideIdx, setSlideIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const t = TRANSLATIONS.hero;
  const ep = TRANSLATIONS.epochs;

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setSlideIdx(prev => (prev + 1) % HERO_SLIDES.length);
        setTransitioning(false);
      }, 600);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (idx: number) => {
    if (idx === slideIdx) return;
    setTransitioning(true);
    setTimeout(() => {
      setSlideIdx(idx);
      setTransitioning(false);
    }, 600);
  };

  const handleStartQuest = (epoch: 1 | 2 | 3 | 4 = 1) => {
    soundEngine.playClick();
    setCurrentEpoch(epoch);
    setCurrentView('quest');
  };

  const epochList = [
    { num: 1 as const, data: ep.epoch1, btnText: language === 'by' ? 'Адкрыць раздзел XVI ст.' : 'Открыть раздел XVI в.' },
    { num: 2 as const, data: ep.epoch2, btnText: language === 'by' ? 'Даследаваць замак Мір' : 'Исследовать замок Мир' },
    { num: 3 as const, data: ep.epoch3, btnText: language === 'by' ? 'Адкрыць раздзел 1941–1944 гг.' : 'Открыть раздел 1941–1944 гг.' },
    { num: 4 as const, data: ep.epoch4, btnText: language === 'by' ? 'Адкрыць раздзел космасу' : 'Открыть раздел космоса' },
  ];

  const slide = HERO_SLIDES[slideIdx];

  return (
    <div className="space-y-16 pb-20 pt-4">
      {/* Hero Showcase Banner — full-bleed photo background with slideshow */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-200/60 shadow-xl min-h-[420px] sm:min-h-[480px] flex flex-col justify-end">

        {/* Background photo slideshow */}
        <div className="absolute inset-0">
          {HERO_SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                i === slideIdx && !transitioning ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        {/* Slide label (epoch name) */}
        <div className="absolute top-5 left-5 z-10">
          <span className="inline-block px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20 text-[10px] font-mono font-bold text-amber-300 tracking-widest uppercase">
            {slide.label[language]}
          </span>
        </div>

        {/* Slideshow dots */}
        <div className="absolute top-5 right-5 z-10 flex gap-1.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`Слайд ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === slideIdx ? 'bg-amber-400 scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Text content over the photo */}
        <div className="relative z-10 p-8 sm:p-14 space-y-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-white leading-tight tracking-tight drop-shadow-lg">
              {t.title[language]}
            </h1>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl font-sans drop-shadow">
              {t.desc[language]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleStartQuest(1)}
              className="px-6 py-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-sm flex items-center gap-2 shadow-md shadow-red-900/40 hover:scale-[1.02] transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-200" />
              <span>{t.startQuestBtn[language]}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setCurrentView('codex');
              }}
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/30 font-semibold text-sm flex items-center gap-2 transition hover:scale-[1.02] cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>{t.exploreCodexBtn[language]}</span>
            </button>
          </div>
        </div>
      </section>

      {/* The 4 Historical Chapters */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-slate-900 tracking-tight">
            {language === 'by' ? 'Чатыры раздзелы даследавання' : 'Четыре раздела исследования'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {language === 'by'
              ? 'Навукова-рэканструкцыйныя этапы праекта, заснаваныя на архіўных матэрыялах музеяў і акадэмічных даследаваннях.'
              : 'Научно-реконструкционные этапы проекта, основанные на архивных материалах музеев и академических исследованиях.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {epochList.map((item) => {
            const isUnlocked = unlockedEpochs.includes(item.num);
            const isCompleted = completedEpochs.includes(item.num);

            return (
              <div
                key={item.num}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all shadow-xs hover:shadow-lg ${
                  isCompleted
                    ? 'bg-white border-emerald-300'
                    : isUnlocked
                    ? 'bg-white border-slate-200 hover:border-amber-400'
                    : 'bg-slate-50/90 border-slate-200 opacity-80'
                }`}
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden border-b border-slate-200">
                  <img
                    src={item.data.image}
                    alt={item.data.title[language]}
                    className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-black/80 backdrop-blur-xs border border-white/20 text-[10px] font-mono text-amber-300 font-bold">
                    {item.data.badge[language]}
                  </div>

                  {!isUnlocked ? (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/80 border border-white/20 text-slate-300 text-[10px] flex items-center gap-1 shadow-sm">
                      <Lock className="w-3 h-3" />
                      <span>{language === 'by' ? 'Закрыта' : 'Закрыто'}</span>
                    </div>
                  ) : isCompleted ? (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-emerald-700 border border-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{language === 'by' ? 'Выканана' : 'Выполнено'}</span>
                    </div>
                  ) : null}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-serif-title font-bold text-slate-900 line-clamp-2">
                      {item.data.title[language]}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.data.desc[language]}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <strong className="text-amber-800 font-mono block text-[9px] uppercase tracking-wider mb-0.5">
                      {language === 'by' ? 'Заданне:' : 'Задание:'}
                    </strong>
                    <span className="line-clamp-2 text-[11px]">{item.data.task[language]}</span>
                  </div>

                  <button
                    disabled={!isUnlocked}
                    onClick={() => handleStartQuest(item.num)}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                      isUnlocked
                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs cursor-pointer'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    }`}
                  >
                    <span>{item.btnText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Module Shortcuts */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <button
          onClick={() => {
            soundEngine.playClick();
            setCurrentView('timeline');
          }}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md flex items-center gap-4 text-left transition cursor-pointer group shadow-xs"
        >
          <div className="p-3 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-100 transition">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition">
              {language === 'by' ? 'Храналогія Беларусі' : 'Хронология Беларуси'}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'by' ? '16 ключавых падзей (862–2024 гг.)' : '16 ключевых событий (862–2024 гг.)'}
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setCurrentView('quiz');
          }}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md flex items-center gap-4 text-left transition cursor-pointer group shadow-xs"
        >
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 transition">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition">
              {language === 'by' ? 'Практыкум для школ' : 'Практикум для школ'}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'by' ? '30 пытанняў у 3 тэматычных блоках' : '30 вопросов в 3 тематических блоках'}
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setCurrentView('certificate');
          }}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md flex items-center gap-4 text-left transition cursor-pointer group shadow-xs"
        >
          <div className="p-3 rounded-xl bg-red-50 text-red-700 group-hover:bg-red-100 transition">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-800 transition">
              {language === 'by' ? 'Сертыфікат удзельніка' : 'Сертификат участника'}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'by' ? 'Выдача выніковага дыплома (PNG/друк)' : 'Выдача итогового диплома (PNG/печать)'}
            </p>
          </div>
        </button>
      </section>
    </div>
  );
};
