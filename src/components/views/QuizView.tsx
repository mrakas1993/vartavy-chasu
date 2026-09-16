import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { QUIZ_QUESTIONS, QuizCategory, QuizQuestion } from '../../data/quiz';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { HelpCircle, Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen, Shield, Sparkles, Satellite } from 'lucide-react';

export const QuizView: React.FC = () => {
  const { language, addScore, setCurrentView } = useGame();

  const [activeCategory, setActiveCategory] = useState<QuizCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (activeCategory === 'all') return true;
    return q.category === activeCategory;
  });

  const question = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectCategory = (cat: QuizCategory) => {
    soundEngine.playClick();
    setActiveCategory(cat);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    soundEngine.playClick();
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctIndex) {
      soundEngine.playSuccess();
      setCorrectCount(prev => prev + 1);
      addScore(20);
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 pt-2">
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono uppercase tracking-wider font-semibold shadow-xs">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
          <span>{language === 'by' ? 'Метадычны тэставы комплекс' : 'Методический тестовый комплекс'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          {language === 'by' ? 'Практыкум і віктарыны для школ' : 'Практикум и викторины для школ'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          {language === 'by'
            ? '30 тэматычных пытанняў з падрабязнымі гістарычнымі даведкамі для ўрокаў гісторыі Беларусі і класных гадзін.'
            : '30 тематических вопросов с подробными историческими справками для уроков истории Беларуси и классных часов.'}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl max-w-3xl mx-auto shadow-xs">
        <button
          onClick={() => handleSelectCategory('all')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span>{language === 'by' ? 'Генеральны тэст' : 'Генеральный тест'} (30)</span>
        </button>

        <button
          onClick={() => handleSelectCategory('heritage')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeCategory === 'heritage'
              ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>{language === 'by' ? 'Спадчына і культура' : 'Наследие и культура'} (10)</span>
        </button>

        <button
          onClick={() => handleSelectCategory('feat')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeCategory === 'feat'
              ? 'bg-red-100 text-red-900 border border-red-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Shield className="w-3 h-3 text-red-600" />
          <span>{language === 'by' ? 'Вялікая Айчынная вайна' : 'Великая Отечественная война'} (10)</span>
        </button>

        <button
          onClick={() => handleSelectCategory('science')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeCategory === 'science'
              ? 'bg-cyan-100 text-cyan-900 border border-cyan-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Satellite className="w-3 h-3 text-cyan-600" />
          <span>{language === 'by' ? 'Навука і Космас' : 'Наука и Космос'} (10)</span>
        </button>
      </div>

      {/* Quiz Card */}
      {!isFinished ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-9 shadow-md space-y-6">
          {/* Progress & Stats */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-200 pb-3">
            <span className="font-semibold text-slate-900">
              {language === 'by' ? 'Пытанне' : 'Вопрос'} {currentIndex + 1} / {filteredQuestions.length}
            </span>
            <span className="text-emerald-700 font-bold">
              {language === 'by' ? 'Дакладна:' : 'Верно:'} {correctCount}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-serif-title font-bold text-slate-900 leading-snug">
            {question.question[language]}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {question.options[language].map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;

              let btnStyle = 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-800 shadow-xs';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm';
                } else if (isSelected) {
                  btnStyle = 'bg-red-50 border-red-400 text-red-900 shadow-sm';
                } else {
                  btnStyle = 'bg-slate-50/70 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(idx)}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between ${btnStyle} ${
                    !isAnswered ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <span className="leading-relaxed">{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 shrink-0 ml-3" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 space-y-1 shadow-xs">
              <span className="font-mono text-amber-900 font-bold block uppercase text-[10px] tracking-wider">
                {language === 'by' ? 'Гістарычны каментар і крыніца:' : 'Исторический комментарий и источник:'}
              </span>
              <p className="leading-relaxed font-sans text-slate-700">
                {question.explanation[language]}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition cursor-pointer"
              >
                <span>
                  {currentIndex + 1 < filteredQuestions.length
                    ? (language === 'by' ? 'Наступнае пытанне' : 'Следующий вопрос')
                    : (language === 'by' ? 'Падвесці вынікі' : 'Подвести итоги')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Summary Card */
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-700 shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-serif-title font-bold text-slate-900">
              {language === 'by' ? 'Тэставы модуль завершаны' : 'Тестовый модуль завершен'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-mono">
              {language === 'by' ? 'Вынік у катэгорыі:' : 'Результат в категории:'}{' '}
              <strong className="text-emerald-700 text-base">
                {correctCount} / {filteredQuestions.length}
              </strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-md mx-auto leading-relaxed shadow-xs">
            {correctCount >= Math.floor(filteredQuestions.length * 0.8)
              ? (language === 'by'
                  ? 'Выдатны паказчык ведаў айчыннай гісторыі, гераічнага мінулага і навуковага патэнцыялу краіны.'
                  : 'Отличный показатель знаний отечественной истории, героического прошлого и научного потенциала страны.')
              : (language === 'by'
                  ? 'Добры вынік. Для паглыблення ведаў рэкамендуецца азнаёміцца з карткамі ў Каталогу Рэліквій.'
                  : 'Хороший результат. Для углубления знаний рекомендуется ознакомиться с карточками в Каталоге Реликвий.')}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-2 border border-slate-200 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'by' ? 'Паўтарыць тэст' : 'Повторить тест'}</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setCurrentView('certificate');
              }}
              className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-200" />
              <span>{language === 'by' ? 'Перайсці да Дыплома' : 'Перейти к Диплому'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
