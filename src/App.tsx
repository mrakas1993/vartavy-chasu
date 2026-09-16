import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { HeroView } from './components/views/HeroView';
import { QuestView } from './components/views/QuestView';
import { TimelineView } from './components/views/TimelineView';
import { CodexView } from './components/views/CodexView';
import { QuizView } from './components/views/QuizView';
import { CertificateView } from './components/views/CertificateView';
import { soundEngine } from './utils/audio';
import { RotateCcw } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, language, resetProgress } = useGame();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HeroView />;
      case 'quest':
        return <QuestView />;
      case 'timeline':
        return <TimelineView />;
      case 'codex':
        return <CodexView />;
      case 'quiz':
        return <QuizView />;
      case 'certificate':
        return <CertificateView />;
      default:
        return <HeroView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderView()}
      </main>

      {/* Modern Academic & Educational Footer */}
      <footer className="border-t border-slate-200 bg-white text-slate-600 pt-10 pb-8 mt-12 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* Column 1: Brand & Project Description */}
            <div className="md:col-span-5 space-y-3">
              <span className="font-serif-title font-bold text-lg tracking-wide text-slate-900 block">
                {language === 'by' ? 'Вартавы Часу' : 'Хранители Времени'}
              </span>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                {language === 'by'
                  ? 'Інтэрактыўная адукацыйная платформа, прысвечаная вывучэнню гісторыка-культурнай спадчыны, падзей усенароднага подзвігу і дасягненняў беларускага народа ў навуцы і культуры.'
                  : 'Интерактивная образовательная платформа, посвященная изучению историко-культурного наследия, событий всенародного подвига и достижений белорусского народа в науке и культуре.'}
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono">
                {language === 'by' ? 'Раздзелы' : 'Разделы'}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => { soundEngine.playClick(); setCurrentView('quest'); }}
                    className="hover:text-red-700 transition cursor-pointer text-left"
                  >
                    {language === 'by' ? 'Квесты па эпохах' : 'Квесты по эпохам'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { soundEngine.playClick(); setCurrentView('timeline'); }}
                    className="hover:text-red-700 transition cursor-pointer text-left"
                  >
                    {language === 'by' ? 'Храналогія падзей' : 'Хронология событий'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { soundEngine.playClick(); setCurrentView('codex'); }}
                    className="hover:text-red-700 transition cursor-pointer text-left"
                  >
                    {language === 'by' ? 'Збор рэліквій' : 'Свод реликвий'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { soundEngine.playClick(); setCurrentView('quiz'); }}
                    className="hover:text-red-700 transition cursor-pointer text-left"
                  >
                    {language === 'by' ? 'Гістарычная віктарына' : 'Историческая викторина'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { soundEngine.playClick(); setCurrentView('certificate'); }}
                    className="hover:text-red-700 transition cursor-pointer text-left"
                  >
                    {language === 'by' ? 'Імянны сертыфікат' : 'Именной сертификат'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Archival Sources */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 font-mono">
                {language === 'by' ? 'Архіўная і навуковая база' : 'Архивная и научная база'}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'by'
                  ? 'Матэрыялы праекта падрыхтаваны з выкарыстаннем фондаў Нацыянальнай бібліятэкі Беларусі, Беларускага дзяржаўнага музея гісторыі ВАВ, Інстытута гісторыі НАН Беларусі і Агенцтва па касмічных даследаваннях.'
                  : 'Материалы проекта подготовлены с использованием фондов Национальной библиотеки Беларуси, Белорусского государственного музея истории ВОВ, Института истории НАН Беларуси и Агентства по космическим исследованиям.'}
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <button
              onClick={() => {
                if (window.confirm(language === 'by' ? 'Скінуць захаваны прагрэс і пачаць спачатку?' : 'Сбросить сохраненный прогресс и начать сначала?')) {
                  resetProgress();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 transition cursor-pointer text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'by' ? 'Скінуць захаваны прагрэс' : 'Сбросить сохраненный прогресс'}</span>
            </button>

            <div className="text-center sm:text-right text-[11px] text-slate-400">
              © {new Date().getFullYear()} {language === 'by' ? '«Вартавы Часу». Усе правы абаронены' : '«Хранители Времени». Все права защищены'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;
