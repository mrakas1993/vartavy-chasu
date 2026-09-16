import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { TRANSLATIONS } from '../../data/translations';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Award, ArrowRight, RotateCcw, CheckCircle2, Layers, Sliders } from 'lucide-react';

interface PrintingPressGameProps {
  onSuccess: () => void;
}

export const PrintingPressGame: React.FC<PrintingPressGameProps> = ({ onSuccess }) => {
  const { language, addScore, collectArtifact } = useGame();
  const t = TRANSLATIONS.printingGame;

  const [hasBlock, setHasBlock] = useState(false);
  const [inkApplied, setInkApplied] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePlaceBlock = () => {
    if (hasBlock) return;
    soundEngine.playClick();
    setHasBlock(true);
  };

  const handleApplyInk = () => {
    if (!hasBlock || inkApplied) return;
    soundEngine.playClick();
    setInkApplied(true);
  };

  const handlePressLever = () => {
    if (!inkApplied || isPressing || isCompleted) return;
    soundEngine.playPress();
    setIsPressing(true);

    setTimeout(() => {
      setIsPressing(false);
      setIsCompleted(true);
      soundEngine.playSuccess();
      addScore(100);
      collectArtifact('skaryna-bible');

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleReset = () => {
    soundEngine.playClick();
    setHasBlock(false);
    setInkApplied(false);
    setIsPressing(false);
    setIsCompleted(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-8 shadow-md">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono uppercase tracking-wider font-semibold mb-2 shadow-xs">
          <span>{language === 'by' ? 'Гістарычная Рэканструкцыя' : 'Историческая Реконструкция'}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-serif-title font-bold text-slate-900">
          {t.title[language]}
        </h2>
      </div>

      {/* Steps indicator */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
        <div
          className={`p-3 rounded-lg border text-center transition-all ${
            hasBlock
              ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <span className="text-[11px] font-mono font-bold block mb-0.5">
            {language === 'by' ? 'Крок 1' : 'Шаг 1'}
          </span>
          <span className="text-xs hidden sm:inline font-sans">
            {language === 'by' ? 'Усталяваць матрыцу' : 'Установить матрицу'}
          </span>
        </div>

        <div
          className={`p-3 rounded-lg border text-center transition-all ${
            inkApplied
              ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <span className="text-[11px] font-mono font-bold block mb-0.5">
            {language === 'by' ? 'Крок 2' : 'Шаг 2'}
          </span>
          <span className="text-xs hidden sm:inline font-sans">
            {language === 'by' ? 'Нанесці фарбу' : 'Нанести краску'}
          </span>
        </div>

        <div
          className={`p-3 rounded-lg border text-center transition-all ${
            isCompleted
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <span className="text-[11px] font-mono font-bold block mb-0.5">
            {language === 'by' ? 'Крок 3' : 'Шаг 3'}
          </span>
          <span className="text-xs hidden sm:inline font-sans">
            {language === 'by' ? 'Адціск аркуша' : 'Оттиск листа'}
          </span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Press Simulation */}
        <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 min-h-[340px] flex flex-col items-center justify-center relative">
          <div
            className={`w-64 h-72 border-2 rounded-lg flex flex-col items-center justify-between p-4 transition-all duration-300 bg-white shadow-xs ${
              isPressing
                ? 'scale-95 border-amber-500'
                : 'border-slate-200'
            }`}
          >
            {/* Top Press Screw */}
            <div className="w-full flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-[11px] text-slate-500 font-mono">
                {language === 'by' ? 'Вінтавы прэс XVI ст.' : 'Винтовой пресс XVI в.'}
              </span>
              <div
                className={`w-10 h-2.5 rounded bg-amber-700 transition-transform origin-right duration-300 ${
                  isPressing ? 'rotate-45' : 'rotate-0'
                }`}
              />
            </div>

            {/* Middle Plate / Platen */}
            <div className="w-full my-auto flex items-center justify-center">
              {!hasBlock ? (
                <button
                  onClick={handlePlaceBlock}
                  className="px-4 py-3 rounded-lg border border-dashed border-amber-400 hover:border-amber-500 bg-amber-50 text-amber-800 text-xs font-medium hover:scale-102 transition flex flex-col items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Layers className="w-5 h-5 text-amber-600" />
                  <span>{language === 'by' ? 'Укласці гравіраваную дошку' : 'Вложить гравированную доску'}</span>
                </button>
              ) : (
                <div
                  className={`w-44 h-44 rounded border p-3 flex flex-col items-center justify-center transition-all ${
                    inkApplied
                      ? 'bg-amber-100/60 border-amber-400 text-amber-950 shadow-xs'
                      : 'bg-amber-50 border-amber-300 text-amber-800'
                  }`}
                >
                  {/* Clean Historic Woodcut Seal SVG */}
                  <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                    <circle cx="50" cy="50" r="32" strokeWidth="2" />
                    <path
                      d="M50 18 L50 10 M50 90 L50 82 M18 50 L10 50 M90 50 L82 50 M28 28 L22 22 M78 78 L72 72 M28 72 L22 78 M78 28 L72 22"
                      strokeWidth="2"
                    />
                    <path
                      d="M42 32 A 20 20 0 0 0 62 68 A 18 18 0 1 1 42 32 Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-[10px] font-mono mt-2 uppercase tracking-wider text-center font-bold">
                    {inkApplied
                      ? (language === 'by' ? 'Фарба нанесена' : 'Краска нанесена')
                      : (language === 'by' ? 'Матрыца «Сонца і Месяц»' : 'Матрица «Солнце и Луна»')}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Status */}
            <div className="w-full text-center pt-2 border-t border-slate-200">
              <span className="text-[10px] text-slate-500 font-mono">
                {isCompleted
                  ? (language === 'by' ? 'Адбітак зроблены' : 'Оттиск выполнен')
                  : isPressing
                  ? (language === 'by' ? 'Ціск прэса...' : 'Прижим пресса...')
                  : (language === 'by' ? 'Гатоўнасць да працы' : 'Готовность к работе')}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Real Historical Result */}
        <div className="md:col-span-5 flex flex-col gap-4">
          {!isCompleted ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-mono uppercase font-bold text-amber-800 mb-1">
                  {language === 'by' ? 'Паслядоўнасць аперацый:' : 'Последовательность операций:'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {!hasBlock && t.step1[language]}
                  {hasBlock && !inkApplied && t.step2[language]}
                  {hasBlock && inkApplied && t.step3[language]}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  disabled={!hasBlock || inkApplied}
                  onClick={handleApplyInk}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                    hasBlock && !inkApplied
                      ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer shadow-xs'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>{t.applyInkBtn[language]}</span>
                </button>

                <button
                  disabled={!inkApplied || isPressing}
                  onClick={handlePressLever}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                    inkApplied && !isPressing
                      ? 'bg-red-700 hover:bg-red-800 text-white cursor-pointer shadow-xs'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  }`}
                >
                  <span>{isPressing ? (language === 'by' ? 'Выкананне адбітка...' : 'Выполнение оттиска...') : t.pressLeverBtn[language]}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Printed Result Card with REAL PHOTOGRAPH */
            <div className="p-4 rounded-xl bg-white border border-amber-300 space-y-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-20 h-24 rounded border border-slate-200 overflow-hidden shrink-0 shadow-xs">
                  <img
                    src="/images/skaryna_bible.jpg"
                    alt="Тытульны аркуш Скарыны"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif-title font-bold text-sm text-slate-900">
                    {t.successTitle[language]}
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed font-sans">
                    {t.successDesc[language]}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-700 font-mono font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>+100 б.</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={onSuccess}
                  className="flex-1 py-2 px-3 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <span>{t.continueBtn[language]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleReset}
                  title="Паўтарыць"
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
