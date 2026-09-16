import React, { useState, useEffect } from 'react';
import { DialogStep } from '../data/translations';
import { useGame } from '../context/GameContext';
import { soundEngine } from '../utils/audio';
import { ChevronRight, ArrowRight, User } from 'lucide-react';

interface DialogBoxProps {
  steps: DialogStep[];
  onComplete: () => void;
}

export const DialogBox: React.FC<DialogBoxProps> = ({ steps, onComplete }) => {
  const { language } = useGame();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const step = steps[currentStepIndex];
  const fullText = step ? step.text[language] : '';

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [currentStepIndex, fullText]);

  const handleNext = () => {
    if (isTyping) {
      setDisplayedText(fullText);
      setIsTyping(false);
      soundEngine.playClick();
      return;
    }

    soundEngine.playClick();
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  if (!step) return null;

  return (
    <div className="w-full max-w-3xl mx-auto my-6 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Real Historical Portrait Image */}
        <div className="relative shrink-0 mx-auto sm:mx-0">
          <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
            {step.imageSrc ? (
              <img
                src={step.imageSrc}
                alt={step.speaker[language]}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <User className="w-10 h-10" />
              </div>
            )}
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-mono text-amber-800 font-bold shadow-xs">
            {step.avatar === 'skaryna' && '1517'}
            {step.avatar === 'commander' && '1941–1944'}
            {step.avatar === 'cosmonaut' && '2024'}
            {step.avatar === 'archivist' && 'Архіў'}
          </div>
        </div>

        {/* Content & Dialog Body */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-3">
            <div>
              <h3 className="font-serif-title font-bold text-base sm:text-lg text-slate-900">
                {step.speaker[language]}
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                {step.role[language]}
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {currentStepIndex + 1} / {steps.length}
            </div>
          </div>

          <div className="min-h-[70px] text-slate-700 text-sm leading-relaxed font-sans">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1.5 h-3.5 ml-1 bg-amber-500 animate-pulse" />
            )}
          </div>

          <div className="mt-4 flex items-center justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              <span>
                {currentStepIndex + 1 < steps.length
                  ? (language === 'by' ? 'Далей' : 'Далее')
                  : (language === 'by' ? 'Перайсці да практыкуму' : 'Перейти к практикуму')}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
