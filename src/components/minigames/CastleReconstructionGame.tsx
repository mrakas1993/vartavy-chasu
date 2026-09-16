import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Award, ArrowRight, RotateCcw, CheckCircle2, Shield, Eye, Compass } from 'lucide-react';

interface CastleReconstructionGameProps {
  onSuccess: () => void;
}

export const CastleReconstructionGame: React.FC<CastleReconstructionGameProps> = ({ onSuccess }) => {
  const { language, addScore, collectArtifact } = useGame();

  // 3 modules to inspect/restore:
  // 1: Tower defense / gate
  // 2: Wall masonry (тоўстыя муры)
  // 3: Palace courtyard (рэнесансны палац)
  const [inspectedTower, setInspectedTower] = useState(false);
  const [inspectedWalls, setInspectedWalls] = useState(false);
  const [inspectedPalace, setInspectedPalace] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInspect = (part: 'tower' | 'walls' | 'palace') => {
    soundEngine.playClick();
    if (part === 'tower') setInspectedTower(true);
    if (part === 'walls') setInspectedWalls(true);
    if (part === 'palace') setInspectedPalace(true);

    const willComplete =
      (part === 'tower' || inspectedTower) &&
      (part === 'walls' || inspectedWalls) &&
      (part === 'palace' || inspectedPalace);

    if (willComplete && !isCompleted) {
      setTimeout(() => {
        setIsCompleted(true);
        soundEngine.playSuccess();
        addScore(100);
        collectArtifact('mir-castle');
        collectArtifact('slutsk-belts');
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 400);
    }
  };

  const handleReset = () => {
    soundEngine.playClick();
    setInspectedTower(false);
    setInspectedWalls(false);
    setInspectedPalace(false);
    setIsCompleted(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-md">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono uppercase tracking-wider font-semibold mb-2 shadow-xs">
          <Shield className="w-3.5 h-3.5 text-amber-700" />
          <span>{language === 'by' ? 'Архітэктурная Рэканструкцыя' : 'Архитектурная Реконструкция'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif-title font-bold text-slate-900">
          {language === 'by'
            ? 'Абарончае дойлідства: Замкавы комплекс «Мір»'
            : 'Оборонительное зодчество: Замковый комплекс «Мир»'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-1">
          {language === 'by'
            ? 'Даследуйце тры ключавыя фартыфікацыйныя элементы цытадэлі XVI стагоддзя для аднаўлення поўнай абарончай схемы.'
            : 'Исследуйте три ключевых фортификационных узла цитадели XVI века для восстановления полной оборонительной схемы.'}
        </p>
      </div>

      {/* Main Castle Stage with REAL PHOTO */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 mb-6 shadow-md">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src="./images/mir_castle.jpg"
            alt="Мірскі замак"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Hotspots / Interactive Points on the Castle */}
          {/* Point 1: Entrance Tower */}
          <button
            onClick={() => handleInspect('tower')}
            className={`absolute top-[48%] left-[28%] -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg cursor-pointer ${
              inspectedTower
                ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-300'
                : 'bg-black/85 border border-amber-400 text-amber-300 hover:scale-105 animate-pulse'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${inspectedTower ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span>{language === 'by' ? 'Уязная вежа' : 'Въездная башня'}</span>
          </button>

          {/* Point 2: Walls */}
          <button
            onClick={() => handleInspect('walls')}
            className={`absolute top-[58%] left-[62%] -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg cursor-pointer ${
              inspectedWalls
                ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-300'
                : 'bg-black/85 border border-amber-400 text-amber-300 hover:scale-105 animate-pulse'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${inspectedWalls ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span>{language === 'by' ? 'Цагляныя муры' : 'Крепостные стены'}</span>
          </button>

          {/* Point 3: Radziwill Palace */}
          <button
            onClick={() => handleInspect('palace')}
            className={`absolute top-[32%] left-[54%] -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg cursor-pointer ${
              inspectedPalace
                ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-300'
                : 'bg-black/85 border border-amber-400 text-amber-300 hover:scale-105 animate-pulse'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${inspectedPalace ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span>{language === 'by' ? 'Палац Радзівілаў' : 'Дворец Радзивиллов'}</span>
          </button>

          {/* Bottom Overlay Legend */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-xs border border-white/20 font-mono">
            <span>
              {language === 'by' ? 'Даследавана вузлоў:' : 'Исследовано узлов:'}{' '}
              {[inspectedTower, inspectedWalls, inspectedPalace].filter(Boolean).length} / 3
            </span>
            <span className="text-amber-300">
              {isCompleted
                ? (language === 'by' ? 'Схема абароны пацверджана' : 'Схема обороны подтверждена')
                : (language === 'by' ? 'Націсніце на кропкі замка' : 'Нажмите на точки замка')}
            </span>
          </div>
        </div>
      </div>

      {/* Details for Inspected Parts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div
          onClick={() => handleInspect('tower')}
          className={`p-4 rounded-xl border text-left cursor-pointer transition ${
            inspectedTower
              ? 'bg-emerald-50 border-emerald-300 text-slate-800 shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-amber-400'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold font-serif-title text-amber-800">
              {language === 'by' ? '1. Уязная вежа' : '1. Въездная башня'}
            </span>
            {inspectedTower && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600">
            {language === 'by'
              ? '25-метровая дамінанта з каванымі варотамі, пад’ёмным мостам і байніцамі падэшвеннага бою.'
              : '25-метровая доминанта с коваными воротами, подъемным мостом и бойницами подошвенного боя.'}
          </p>
        </div>

        <div
          onClick={() => handleInspect('walls')}
          className={`p-4 rounded-xl border text-left cursor-pointer transition ${
            inspectedWalls
              ? 'bg-emerald-50 border-emerald-300 text-slate-800 shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-amber-400'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold font-serif-title text-amber-800">
              {language === 'by' ? '2. Сцены і байніцы' : '2. Стены и бойницы'}
            </span>
            {inspectedWalls && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600">
            {language === 'by'
              ? 'Муроўка таўшчынёй да 3 метраў з чырвонай цэглы і валуноў на вапнавым растворы.'
              : 'Кладка толщиной до 3 метров из красного кирпича и валунов на известковом растворе.'}
          </p>
        </div>

        <div
          onClick={() => handleInspect('palace')}
          className={`p-4 rounded-xl border text-left cursor-pointer transition ${
            inspectedPalace
              ? 'bg-emerald-50 border-emerald-300 text-slate-800 shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-amber-400'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold font-serif-title text-amber-800">
              {language === 'by' ? '3. Палац Радзівілаў' : '3. Дворец Радзивиллов'}
            </span>
            {inspectedPalace && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600">
            {language === 'by'
              ? 'Трохпавярховы рэнесансны корпус з раскошнымі залямі, ляпнінай і кафлянымі печкамі.'
              : 'Трехэтажный ренессансный корпус с роскошными залами, лепниной и изразцовыми печами.'}
          </p>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-5 rounded-2xl bg-white border border-emerald-300 space-y-3 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-xs">
              <img
                src="./images/slutsk_belt.jpg"
                alt="Слуцкі пояс"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif-title font-bold text-base text-slate-900">
                {language === 'by'
                  ? 'Архітэктурны комплекс паспяхова засвоены!'
                  : 'Архитектурный комплекс успешно освоен!'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === 'by'
                  ? 'Вы аднавілі поўнае разуменне абарончай фартыфікацыі Беларусі эпохі Рэнесансу. Узнагароды дададзены ў Звод Рэліквій.'
                  : 'Вы восстановили полное понимание оборонительной фортификации Беларуси эпохи Ренессанса. Награды добавлены в Свод Реликвий.'}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-emerald-700 font-mono font-bold">
                <Award className="w-4 h-4" />
                <span>+100 б. • Адкрыты экспанаты: «Замак Мір» і «Слуцкі пояс»</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              onClick={handleReset}
              title="Паўтарыць"
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onSuccess}
              className="py-2.5 px-5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <span>{language === 'by' ? 'Перайсці далей' : 'Перейти далее'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
