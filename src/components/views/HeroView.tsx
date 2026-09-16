import React from 'react';
import { useGame } from '../../context/GameContext';
import { TRANSLATIONS } from '../../data/translations';
import { soundEngine } from '../../utils/audio';
import { Compass, BookOpen, Clock, HelpCircle, Award, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

export const HeroView: React.FC = () => {
  const {
    language,
    setCurrentView,
    setCurrentEpoch,
    unlockedEpochs,
    completedEpochs
  } = useGame();

  const t = TRANSLATIONS.hero;
  const ep = TRANSLATIONS.epochs;

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

  return (
    <div className="space-y-16 pb-20 pt-4">
      {/* Hero Showcase Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white via-[#faf9f6] to-[#f1f5f9] border border-slate-200/90 p-8 sm:p-14 shadow-md">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-56 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-serif-title font-bold text-slate-900 leading-tight tracking-tight">
            {t.title[language]}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans">
            {t.desc[language]}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleStartQuest(1)}
              className="px-6 py-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-sm flex items-center gap-2 shadow-md shadow-red-700/20 hover:scale-[1.02] transition cursor-pointer"
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
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm flex items-center gap-2 shadow-xs transition hover:scale-[1.02] cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
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
