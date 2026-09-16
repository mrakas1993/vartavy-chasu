import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { TRANSLATIONS } from '../../data/translations';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Radio, Volume2, Award, ArrowRight, Shield } from 'lucide-react';

interface MorseRadioGameProps {
  onSuccess: () => void;
}

export const MorseRadioGame: React.FC<MorseRadioGameProps> = ({ onSuccess }) => {
  const { language, addScore, collectArtifact } = useGame();
  const t = TRANSLATIONS.radioGame;

  const [frequency, setFrequency] = useState<number>(6.2);
  const [isPlayingMorse, setIsPlayingMorse] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showMorseTable, setShowMorseTable] = useState<boolean>(false);

  const isTuned = Math.abs(frequency - 7.15) < 0.08;

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setFrequency(val);
    if (!isTuned) {
      soundEngine.playRadioStatic(100);
    }
  };

  const playMorseSequence = async () => {
    if (isPlayingMorse || !isTuned) return;
    setIsPlayingMorse(true);

    const morsePattern = [
      false, true, true, false, // П
      'pause',
      false, true, // А
      'pause',
      false, true, false, // Р
      'pause',
      true, // Т
      'pause',
      false, true, false, false, // Ы
      'pause',
      true, true, false, // З
      'pause',
      false, true, // А
      'pause',
      true, false // Н
    ];

    for (const item of morsePattern) {
      if (item === 'pause') {
        await new Promise((r) => setTimeout(r, 200));
      } else {
        await soundEngine.playMorse(item as boolean);
        await new Promise((r) => setTimeout(r, 60));
      }
    }

    setIsPlayingMorse(false);
  };

  const handleSelectWord = (choice: 'opt1' | 'opt2' | 'opt3') => {
    soundEngine.playClick();
    setSelectedWord(choice);

    if (choice === 'opt1') {
      setIsCompleted(true);
      soundEngine.playSuccess();
      addScore(100);
      collectArtifact('partizan-medal');

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-8 shadow-md">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 border border-red-200 text-red-800 text-xs font-mono uppercase tracking-wider font-semibold mb-2 shadow-xs">
          <Shield className="w-3.5 h-3.5" />
          <span>{language === 'by' ? 'Радыёсувязь Партызанскага Руху' : 'Радиосвязь Партизанского Движения'}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-serif-title font-bold text-slate-900">
          {t.title[language]}
        </h2>
      </div>

      {/* Military Field Radio Panel */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6 mb-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Frequency Tuning */}
          <div className="w-full md:w-1/2 bg-white border border-slate-200 rounded-lg p-4 flex flex-col items-center shadow-xs">
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
              <span>{t.currentFreq[language]}</span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full inline-block ${
                    isTuned ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
                <span className="font-bold text-[11px] text-slate-700">
                  {isTuned
                    ? (language === 'by' ? 'СІГНАЛ' : 'СИГНАЛ')
                    : (language === 'by' ? 'ШУМ' : 'ШУМ')}
                </span>
              </div>
            </div>

            <div className="text-3xl sm:text-4xl font-mono font-bold tracking-widest text-slate-900 my-2">
              {frequency.toFixed(2)}{' '}
              <span className="text-base text-slate-500 font-sans">МГц</span>
            </div>

            <p className="text-[11px] text-slate-500 font-mono mb-4 text-center">
              {t.targetFreqNotice[language]}
            </p>

            <div className="w-full px-2">
              <input
                type="range"
                min="5.00"
                max="9.00"
                step="0.05"
                value={frequency}
                onChange={handleFrequencyChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-700"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>5.00 МГц</span>
                <span className="text-amber-800 font-bold">7.15 МГц</span>
                <span>9.00 МГц</span>
              </div>
            </div>
          </div>

          {/* Audio Morse Player */}
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <div
              className={`p-3 rounded-lg border text-xs font-mono transition-all ${
                isTuned
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {isTuned ? t.signalClear[language] : t.signalNoisy[language]}
            </div>

            <button
              disabled={!isTuned || isPlayingMorse}
              onClick={playMorseSequence}
              className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${
                isTuned && !isPlayingMorse
                  ? 'bg-red-700 hover:bg-red-800 text-white cursor-pointer shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>
                {isPlayingMorse
                  ? (language === 'by' ? 'Прыём танальнай пасылкі...' : 'Прием тональной посылки...')
                  : t.playSignalBtn[language]}
              </span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setShowMorseTable(!showMorseTable);
              }}
              className="text-xs text-slate-600 hover:text-slate-900 underline text-center cursor-pointer"
            >
              {showMorseTable
                ? (language === 'by' ? 'Схаваць табліцу кодаў' : 'Скрыть таблицу кодов')
                : (language === 'by' ? 'Паказаць табліцу Морзэ' : 'Показать таблицу Морзе')}
            </button>

            {showMorseTable && (
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-700 shadow-xs">
                {t.morseClue[language]}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Word Options */}
      {!isCompleted ? (
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase font-bold text-slate-600">
            {t.decodePrompt[language]}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              disabled={!isTuned}
              onClick={() => handleSelectWord('opt1')}
              className={`p-3 rounded-lg border text-left text-xs font-medium transition ${
                isTuned
                  ? 'bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 border-slate-200 cursor-pointer shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{t.options.opt1[language]}</span>
            </button>

            <button
              disabled={!isTuned}
              onClick={() => handleSelectWord('opt2')}
              className={`p-3 rounded-lg border text-left text-xs font-medium transition ${
                isTuned
                  ? 'bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 border-slate-200 cursor-pointer shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{t.options.opt2[language]}</span>
            </button>

            <button
              disabled={!isTuned}
              onClick={() => handleSelectWord('opt3')}
              className={`p-3 rounded-lg border text-left text-xs font-medium transition ${
                isTuned
                  ? 'bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 border-slate-200 cursor-pointer shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{t.options.opt3[language]}</span>
            </button>
          </div>

          {selectedWord && selectedWord !== 'opt1' && (
            <p className="text-xs text-red-600 font-mono text-center">
              {language === 'by'
                ? 'Няправільны пазыўны. Зверцеся з табліцай Морзэ.'
                : 'Неверный позывной. Сверьтесь с таблицей Морзе.'}
            </p>
          )}
        </div>
      ) : (
        /* Victory Report with REAL MEDAL PHOTO */
        <div className="p-4 rounded-xl bg-white border border-emerald-300 space-y-3 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 rounded border border-slate-200 overflow-hidden bg-slate-50 p-1 flex items-center justify-center shrink-0 shadow-xs">
              <img
                src="./images/partizan_medal.png"
                alt="Медаль Партызану"
                className="max-h-full max-w-full object-contain"
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
              className="py-2 px-4 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <span>{language === 'by' ? 'Працягнуць' : 'Продолжить'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
