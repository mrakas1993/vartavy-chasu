import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../data/translations';
import { soundEngine } from '../utils/audio';

export type AppView = 'home' | 'quest' | 'timeline' | 'codex' | 'quiz' | 'certificate';

interface GameContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  currentEpoch: 1 | 2 | 3 | 4;
  setCurrentEpoch: (epoch: 1 | 2 | 3 | 4) => void;
  unlockedEpochs: number[];
  completedEpochs: number[];
  collectedArtifacts: string[];
  score: number;
  soundMuted: boolean;
  userName: string;
  userSchool: string;
  setUserName: (name: string) => void;
  setUserSchool: (school: string) => void;
  addScore: (amount: number) => void;
  collectArtifact: (id: string) => void;
  completeEpoch: (epoch: 1 | 2 | 3 | 4) => void;
  toggleSound: () => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('patriot_lang') as Language) || 'by';
  });

  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentEpoch, setCurrentEpoch] = useState<1 | 2 | 3 | 4>(1);

  const [unlockedEpochs, setUnlockedEpochs] = useState<number[]>(() => {
    const saved = localStorage.getItem('patriot_unlocked');
    return saved ? JSON.parse(saved) : [1];
  });

  const [completedEpochs, setCompletedEpochs] = useState<number[]>(() => {
    const saved = localStorage.getItem('patriot_completed');
    return saved ? JSON.parse(saved) : [];
  });

  const [collectedArtifacts, setCollectedArtifacts] = useState<string[]>(() => {
    const saved = localStorage.getItem('patriot_artifacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('patriot_score');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [soundMuted, setSoundMuted] = useState<boolean>(() => {
    const saved = localStorage.getItem('patriot_muted');
    return saved === 'true';
  });

  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('patriot_user_name') || '';
  });

  const [userSchool, setUserSchool] = useState<string>(() => {
    return localStorage.getItem('patriot_user_school') || '';
  });

  useEffect(() => {
    localStorage.setItem('patriot_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('patriot_unlocked', JSON.stringify(unlockedEpochs));
  }, [unlockedEpochs]);

  useEffect(() => {
    localStorage.setItem('patriot_completed', JSON.stringify(completedEpochs));
  }, [completedEpochs]);

  useEffect(() => {
    localStorage.setItem('patriot_artifacts', JSON.stringify(collectedArtifacts));
  }, [collectedArtifacts]);

  useEffect(() => {
    localStorage.setItem('patriot_score', score.toString());
  }, [score]);

  useEffect(() => {
    localStorage.setItem('patriot_muted', soundMuted.toString());
    soundEngine.setMuted(soundMuted);
  }, [soundMuted]);

  useEffect(() => {
    localStorage.setItem('patriot_user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('patriot_user_school', userSchool);
  }, [userSchool]);

  const setLanguage = (lang: Language) => {
    soundEngine.playClick();
    setLanguageState(lang);
  };

  const toggleSound = () => {
    setSoundMuted(prev => {
      const next = !prev;
      soundEngine.setMuted(next);
      if (!next) soundEngine.playClick();
      return next;
    });
  };

  const addScore = (amount: number) => {
    setScore(prev => prev + amount);
  };

  const collectArtifact = (id: string) => {
    setCollectedArtifacts(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const completeEpoch = (epoch: 1 | 2 | 3 | 4) => {
    setCompletedEpochs(prev => (prev.includes(epoch) ? prev : [...prev, epoch]));
    if (epoch < 4) {
      const nextEpoch = (epoch + 1) as 1 | 2 | 3 | 4;
      setUnlockedEpochs(prev => (prev.includes(nextEpoch) ? prev : [...prev, nextEpoch]));
    }
  };

  const resetProgress = () => {
    soundEngine.playClick();
    setUnlockedEpochs([1]);
    setCompletedEpochs([]);
    setCollectedArtifacts([]);
    setScore(0);
    setCurrentEpoch(1);
    setCurrentView('home');
    localStorage.removeItem('patriot_unlocked');
    localStorage.removeItem('patriot_completed');
    localStorage.removeItem('patriot_artifacts');
    localStorage.removeItem('patriot_score');
  };

  return (
    <GameContext.Provider
      value={{
        language,
        setLanguage,
        currentView,
        setCurrentView,
        currentEpoch,
        setCurrentEpoch,
        unlockedEpochs,
        completedEpochs,
        collectedArtifacts,
        score,
        soundMuted,
        userName,
        userSchool,
        setUserName,
        setUserSchool,
        addScore,
        collectArtifact,
        completeEpoch,
        toggleSound,
        resetProgress
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
