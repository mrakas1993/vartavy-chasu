import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { TRANSLATIONS } from '../../data/translations';
import { DialogBox } from '../DialogBox';
import { PrintingPressGame } from '../minigames/PrintingPressGame';
import { CastleReconstructionGame } from '../minigames/CastleReconstructionGame';
import { MorseRadioGame } from '../minigames/MorseRadioGame';
import { CosmicOrbitGame } from '../minigames/CosmicOrbitGame';
import { soundEngine } from '../../utils/audio';
import { Award, ArrowRight, BookOpen, CheckCircle2, Lock } from 'lucide-react';

export const QuestView: React.FC = () => {
  const {
    language,
    currentEpoch,
    setCurrentEpoch,
    unlockedEpochs,
    completedEpochs,
    completeEpoch,
    setCurrentView
  } = useGame();

  const [phase, setPhase] = useState<'dialog' | 'game' | 'completed'>('dialog');

  const handleSelectEpoch = (epoch: 1 | 2 | 3 | 4) => {
    if (!unlockedEpochs.includes(epoch)) return;
    soundEngine.playClick();
    setCurrentEpoch(epoch);
    setPhase('dialog');
  };

  const handleDialogComplete = () => {
    soundEngine.playClick();
    setPhase('game');
  };

  const handleGameSuccess = () => {
    completeEpoch(currentEpoch);
    setPhase('completed');
  };

  const handleNextEpoch = () => {
    soundEngine.playClick();
    if (currentEpoch < 4) {
      const next = (currentEpoch + 1) as 1 | 2 | 3 | 4;
      setCurrentEpoch(next);
      setPhase('dialog');
    } else {
      setCurrentView('certificate');
    }
  };

  const getDialogsForEpoch = () => {
    switch (currentEpoch) {
      case 1:
        return TRANSLATIONS.dialogs.skarynaEpoch;
      case 2:
        return TRANSLATIONS.dialogs.castleEpoch;
      case 3:
        return TRANSLATIONS.dialogs.partisanEpoch;
      case 4:
        return TRANSLATIONS.dialogs.spaceEpoch;
    }
  };

  return (
    <div className="space-y-8 pb-20 pt-2">
      {/* 4 Epoch Selection Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl max-w-3xl mx-auto shadow-xs">
        {([1, 2, 3, 4] as const).map((ep) => {
          const isUnlocked = unlockedEpochs.includes(ep);
          const isCompleted = completedEpochs.includes(ep);
          const isActive = currentEpoch === ep;

          return (
            <button
              key={ep}
              disabled={!isUnlocked}
              onClick={() => handleSelectEpoch(ep)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-xs'
                  : isUnlocked
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  : 'text-slate-400 cursor-not-allowed'
              }`}
            >
              <span className="font-mono text-[11px]">
                {ep === 1 ? '1517 г.' : ep === 2 ? 'XVI–XVIII ст.' : ep === 3 ? '1941–1944 гг.' : '2024 г.'}
              </span>
              <span>
                {ep === 1
                  ? (language === 'by' ? 'Скарына' : 'Скорина')
                  : ep === 2
                  ? (language === 'by' ? 'Замкі' : 'Замки')
                  : ep === 3
                  ? (language === 'by' ? 'Партызаны' : 'Партизаны')
                  : (language === 'by' ? 'Космас' : 'Космос')}
              </span>
              {isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ) : !isUnlocked ? (
                <Lock className="w-3 h-3 text-slate-400" />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Main Quest Content */}
      <div className="min-h-[460px] flex flex-col justify-center">
        {phase === 'dialog' && (
          <DialogBox
            steps={getDialogsForEpoch()}
            onComplete={handleDialogComplete}
          />
        )}

        {phase === 'game' && (
          <div>
            {currentEpoch === 1 && (
              <PrintingPressGame onSuccess={handleGameSuccess} />
            )}
            {currentEpoch === 2 && (
              <CastleReconstructionGame onSuccess={handleGameSuccess} />
            )}
            {currentEpoch === 3 && (
              <MorseRadioGame onSuccess={handleGameSuccess} />
            )}
            {currentEpoch === 4 && (
              <CosmicOrbitGame onSuccess={handleGameSuccess} />
            )}
          </div>
        )}

        {phase === 'completed' && (
          <div className="max-w-xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-8 text-center space-y-6 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700 shadow-xs">
              <Award className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-slate-900">
                {language === 'by'
                  ? `Раздзел ${currentEpoch} паспяхова засвоены!`
                  : `Раздел ${currentEpoch} успешно освоен!`}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-md mx-auto">
                {language === 'by'
                  ? 'Матэрыялы даследавання пацверджаны. Новыя рэліквіі і навуковыя даведкі разблакаваны ў Каталогу.'
                  : 'Материалы исследования подтверждены. Новые реликвии и научные справки разблокированы в Каталоге.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleNextEpoch}
                className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition cursor-pointer"
              >
                <span>
                  {currentEpoch < 4
                    ? (language === 'by' ? 'Перайсці да наступнага раздзела' : 'Перейти к следующему разделу')
                    : (language === 'by' ? 'Атрымаць выніковы дыплом' : 'Получить итоговый диплом')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setCurrentView('codex');
                }}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>{language === 'by' ? 'Адкрыць каталог' : 'Открыть каталог'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
