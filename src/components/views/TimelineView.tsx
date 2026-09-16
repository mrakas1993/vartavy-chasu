import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { TIMELINE_EVENTS, TimelineEvent } from '../../data/timeline';
import { soundEngine } from '../../utils/audio';
import { Clock, Shield, Sparkles, Satellite } from 'lucide-react';

export const TimelineView: React.FC = () => {
  const { language } = useGame();
  const [filter, setFilter] = useState<'all' | 'heritage' | 'feat' | 'science'>('all');

  const filteredEvents = TIMELINE_EVENTS.filter((ev) => {
    if (filter === 'all') return true;
    return ev.category === filter;
  });

  const getCategoryBadge = (cat: TimelineEvent['category']) => {
    switch (cat) {
      case 'heritage':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>{language === 'by' ? 'Спадчына' : 'Наследие'}</span>
          </span>
        );
      case 'feat':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase px-2.5 py-1 rounded-lg bg-red-50 text-red-800 border border-red-200 shadow-xs">
            <Shield className="w-3 h-3 text-red-600" />
            <span>{language === 'by' ? 'Подзвіг' : 'Подвиг'}</span>
          </span>
        );
      case 'science':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-xs">
            <Satellite className="w-3 h-3 text-cyan-600" />
            <span>{language === 'by' ? 'Навука' : 'Наука'}</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 pt-2">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono uppercase tracking-wider font-semibold shadow-xs">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          <span>862 – 2024 гг. • {language === 'by' ? 'Летапіс Беларусі' : 'Летопись Беларуси'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          {language === 'by' ? 'Храналогія слаўных старонак' : 'Хронология славных страниц'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          {language === 'by'
            ? 'Ключавыя вехі дзяржаўнасці, духоўнага асветніцтва, усенароднай абароны Айчыны і касмічных адкрыццяў.'
            : 'Ключевые вехи государственности, духовного просвещения, всенародной защиты Отечества и космических открытий.'}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 p-1.5 bg-white border border-slate-200 rounded-2xl max-w-2xl mx-auto shadow-xs">
        <button
          onClick={() => {
            soundEngine.playClick();
            setFilter('all');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            filter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          {language === 'by' ? 'Усе падзеі' : 'Все события'} ({TIMELINE_EVENTS.length})
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setFilter('heritage');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            filter === 'heritage'
              ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          {language === 'by' ? 'Культура і Спадчына' : 'Культура и Наследие'}
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setFilter('feat');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            filter === 'feat'
              ? 'bg-red-100 text-red-900 border border-red-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          {language === 'by' ? 'Гераічны Подзвіг' : 'Героический Подвиг'}
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setFilter('science');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            filter === 'science'
              ? 'bg-cyan-100 text-cyan-900 border border-cyan-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          {language === 'by' ? 'Навука і Космас' : 'Наука и Космос'}
        </button>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-10">
        {filteredEvents.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Year Stamp */}
            <div className="sm:absolute sm:-left-44 sm:top-1 text-left sm:text-right w-28 sm:pr-3 mb-2 sm:mb-0">
              <span className="font-mono font-bold text-lg text-amber-800 tracking-wider">
                {item.year}
              </span>
            </div>

            {/* Indicator Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-white border-2 border-amber-600 shadow-xs group-hover:scale-125 transition" />

            {/* Event Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 transition space-y-3 shadow-xs hover:shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <h3 className="text-base sm:text-lg font-serif-title font-bold text-slate-900 group-hover:text-amber-800 transition">
                  {item.title[language]}
                </h3>
                {getCategoryBadge(item.category)}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description[language]}
              </p>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <span className="text-amber-800 font-bold uppercase text-[10px] font-mono tracking-wider">
                  {language === 'by' ? 'Гістарычнае значэнне:' : 'Историческое значение:'}
                </span>
                <span className="text-slate-800 font-medium">{item.impact[language]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
