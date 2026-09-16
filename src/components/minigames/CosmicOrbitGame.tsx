import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { TRANSLATIONS } from '../../data/translations';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Compass, Award, ArrowRight, CheckCircle2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface CosmicOrbitGameProps {
  onSuccess: () => void;
}

export const CosmicOrbitGame: React.FC<CosmicOrbitGameProps> = ({ onSuccess }) => {
  const { language, addScore, collectArtifact } = useGame();
  const t = TRANSLATIONS.spaceGame;

  const [posX, setPosX] = useState<number>(35);
  const [posY, setPosY] = useState<number>(-40);
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

  const distance = Math.sqrt(posX * posX + posY * posY);
  const isAligned = distance < 12;

  const moveShip = (dx: number, dy: number) => {
    soundEngine.playThruster();
    setPosX(prev => Math.max(-50, Math.min(50, prev + dx)));
    setPosY(prev => Math.max(-50, Math.min(50, prev + dy)));
  };

  const handleConfirmDocking = () => {
    if (!isAligned) return;
    soundEngine.playSuccess();
    setStage(2);
  };

  const handleSelectSensor = (sensorKey: string) => {
    soundEngine.playClick();
    setSelectedSensor(sensorKey);
    soundEngine.playSuccess();
    addScore(100);
    collectArtifact('belarus-satellite');
    collectArtifact('cosmonaut-badge');
    setStage(3);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-8 shadow-md">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-mono uppercase tracking-wider font-semibold mb-2 shadow-xs">
          <Compass className="w-3.5 h-3.5" />
          <span>{language === 'by' ? 'Цэнтр Кіравання Палётамі НАН Беларусі' : 'Центр Управления Полетами НАН Беларуси'}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-serif-title font-bold text-slate-900">
          {t.title[language]}
        </h2>
      </div>

      {stage === 1 && (
        <div className="space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              {t.step1Title[language]}
            </h3>
            <p className="text-xs text-slate-600">
              {t.step1Desc[language]}
            </p>
          </div>

          {/* Telemetry Display with real satellite space background */}
          <div className="relative w-full h-80 bg-[#0a0f1d] border border-slate-300 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
            {/* Real Space Background */}
            <img
              src="./images/satellite_space.jpg"
              alt="Космас"
              className="absolute inset-0 w-full h-full object-cover opacity-25 filter brightness-75"
            />

            {/* Target ISS Docking Ring */}
            <div className="relative w-36 h-36 rounded-full border border-dashed border-cyan-400/60 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-cyan-400/80 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
              <div className="absolute w-full h-px bg-cyan-500/30" />
              <div className="absolute h-full w-px bg-cyan-500/30" />
            </div>

            {/* User Ship Reticle */}
            <div
              className={`absolute w-20 h-20 border rounded flex items-center justify-center transition-transform duration-100 ${
                isAligned
                  ? 'border-emerald-400 bg-emerald-500/10'
                  : 'border-cyan-400 bg-cyan-500/10'
              }`}
              style={{
                transform: `translate(${posX * 2.2}px, ${posY * 2.2}px)`
              }}
            >
              <div className="w-3 h-3 border border-white rounded-full" />
              <span className="absolute -top-4 text-[9px] font-mono text-cyan-300">
                «САЮЗ МС-25»
              </span>
            </div>

            {/* HUD Status */}
            <div className="absolute top-3 left-3 bg-black/80 border border-white/20 p-2 rounded text-[10px] font-mono text-cyan-300">
              <div>DX: {posX > 0 ? `+${posX}` : posX}</div>
              <div>DY: {posY > 0 ? `+${posY}` : posY}</div>
              <div>{t.dockingDistance[language]} {distance.toFixed(1)}%</div>
            </div>

            <div className="absolute bottom-3 right-3 bg-black/80 border border-white/20 px-2.5 py-1 rounded text-[11px] font-mono font-bold">
              {isAligned ? (
                <span className="text-emerald-400">ЗАХОП ДАЗВОЛЕНЫ</span>
              ) : (
                <span className="text-slate-400">ВЫРАЎНОЎВАННЕ...</span>
              )}
            </div>
          </div>

          {/* RCS Thrusters Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="grid grid-cols-3 gap-1.5 w-44 mx-auto sm:mx-0">
              <div />
              <button
                onClick={() => moveShip(0, -10)}
                className="p-2.5 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer shadow-xs"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <div />

              <button
                onClick={() => moveShip(-10, 0)}
                className="p-2.5 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center text-[9px] font-mono text-slate-500 font-bold">
                RCS
              </div>
              <button
                onClick={() => moveShip(10, 0)}
                className="p-2.5 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div />
              <button
                onClick={() => moveShip(0, 10)}
                className="p-2.5 rounded bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer shadow-xs"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <div />
            </div>

            <div className="flex-1 text-center sm:text-right">
              <button
                disabled={!isAligned}
                onClick={handleConfirmDocking}
                className={`py-2.5 px-5 rounded-lg font-bold text-xs inline-flex items-center gap-2 transition ${
                  isAligned
                    ? 'bg-cyan-700 hover:bg-cyan-800 text-white cursor-pointer shadow-xs'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                <span>{language === 'by' ? 'Фіксацыя стыкоўкі' : 'Зафиксировать стыковку'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === 2 && (
        <div className="space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              {t.step2Title[language]}
            </h3>
            <p className="text-xs text-slate-600">
              {t.step2Desc[language]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => handleSelectSensor('forest')}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-white text-left transition cursor-pointer shadow-xs"
            >
              <Eye className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="text-xs font-bold text-slate-900 mb-1">
                {language === 'by' ? 'Лясны маніторынг' : 'Лесной мониторинг'}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                {t.channelForest[language]}
              </p>
            </button>

            <button
              onClick={() => handleSelectSensor('water')}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-500 hover:bg-white text-left transition cursor-pointer shadow-xs"
            >
              <Eye className="w-5 h-5 text-cyan-600 mb-2" />
              <h4 className="text-xs font-bold text-slate-900 mb-1">
                {language === 'by' ? 'Гідрасфера' : 'Гидросфера'}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                {t.channelWater[language]}
              </p>
            </button>

            <button
              onClick={() => handleSelectSensor('agro')}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-500 hover:bg-white text-left transition cursor-pointer shadow-xs"
            >
              <Eye className="w-5 h-5 text-amber-600 mb-2" />
              <h4 className="text-xs font-bold text-slate-900 mb-1">
                {language === 'by' ? 'Аграэкалогія' : 'Агроэкология'}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                {t.channelAgro[language]}
              </p>
            </button>
          </div>
        </div>
      )}

      {stage === 3 && (
        <div className="p-4 rounded-xl bg-white border border-cyan-300 space-y-3 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-20 h-24 rounded border border-slate-200 overflow-hidden shrink-0 shadow-xs">
              <img
                src="./images/vasilevskaya.jpg"
                alt="Марына Васілеўская"
                className="w-full h-full object-cover object-top"
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

          <div className="pt-2 border-t border-slate-200 flex justify-end">
            <button
              onClick={onSuccess}
              className="py-2 px-4 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <span>{language === 'by' ? 'Завяршыць раздзел' : 'Завершить раздел'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
