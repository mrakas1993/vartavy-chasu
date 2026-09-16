import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ARTIFACTS, Artifact } from '../../data/artifacts';
import { soundEngine } from '../../utils/audio';
import { BookOpen, Lock, Calendar, MapPin, CheckCircle2, X, Archive, FileText, Sparkles, Shield, Satellite } from 'lucide-react';

export const CodexView: React.FC = () => {
  const { language, collectedArtifacts } = useGame();
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [activeTab, setActiveTab] = useState<'catalog' | 'library'>('catalog');
  const [filterEpoch, setFilterEpoch] = useState<number | 'all'>('all');

  const filteredArtifacts = ARTIFACTS.filter((art) => {
    if (filterEpoch === 'all') return true;
    return art.epoch === filterEpoch;
  });

  const handleOpenArtifact = (art: Artifact) => {
    soundEngine.playClick();
    setSelectedArtifact(art);
  };

  const handleClose = () => {
    soundEngine.playClick();
    setSelectedArtifact(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 pt-2">
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono uppercase tracking-wider font-semibold shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>{language === 'by' ? 'Архіўны Каталог і Даведнік' : 'Архивный Каталог и Справочник'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif-title font-bold text-slate-900 tracking-tight">
          {language === 'by' ? 'Звод Нацыянальных Рэліквій і Спадчыны' : 'Свод Национальных Реликвий и Наследия'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {language === 'by'
            ? `12 выдатных помнікаў дзяржаўнасці, духоўнай культуры, усенароднага подзвігу і навуковых дасягненняў Беларусі з фондаў вядучых музеяў і бібліятэк. Даследавана: ${collectedArtifacts.length} з ${ARTIFACTS.length}.`
            : `12 выдающихся памятников государственности, духовной культуры, всенародного подвига и научных достижений Беларуси из фондов музеев и библиотек. Исследовано: ${collectedArtifacts.length} из ${ARTIFACTS.length}.`}
        </p>
      </div>

      {/* View Switcher: Catalog vs Archival Library */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('catalog');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs ${
            activeTab === 'catalog'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{language === 'by' ? 'Каталог рэліквій' : 'Каталог реликвий'} (12)</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('library');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs ${
            activeTab === 'library'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{language === 'by' ? 'Архіўная чытальня і крыніцы' : 'Архивная читальня и источники'}</span>
        </button>
      </div>

      {/* CATALOG VIEW */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Epoch Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                setFilterEpoch('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shadow-xs ${
                filterEpoch === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {language === 'by' ? 'Усе раздзелы' : 'Все разделы'} (12)
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setFilterEpoch(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shadow-xs ${
                filterEpoch === 1
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {language === 'by' ? 'I. Асветніцтва і права' : 'I. Просвещение и право'}
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setFilterEpoch(2);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shadow-xs ${
                filterEpoch === 2
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {language === 'by' ? 'II. Замкі і мастацтва' : 'II. Замки и искусство'}
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setFilterEpoch(3);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shadow-xs ${
                filterEpoch === 3
                  ? 'bg-red-100 text-red-900 border border-red-300'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {language === 'by' ? 'III. Вялікая Айчынная вайна' : 'III. Великая Отечественная война'}
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setFilterEpoch(4);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer shadow-xs ${
                filterEpoch === 4
                  ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {language === 'by' ? 'IV. Космас і прамысловасць' : 'IV. Космос и промышленность'}
            </button>
          </div>

          {/* Grid of 12 Artifacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtifacts.map((art) => {
              const isUnlocked = collectedArtifacts.includes(art.id);

              return (
                <div
                  key={art.id}
                  onClick={() => handleOpenArtifact(art)}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between cursor-pointer transition-all shadow-xs hover:shadow-lg ${
                    isUnlocked
                      ? 'bg-white border-slate-200 hover:border-amber-400'
                      : 'bg-slate-50/90 border-slate-200 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Real Photo with Catalog Tag */}
                  <div className="relative h-48 overflow-hidden bg-slate-100 border-b border-slate-200">
                    <img
                      src={art.image}
                      alt={art.title[language]}
                      className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
                        !isUnlocked ? 'filter grayscale contrast-90 brightness-90' : ''
                      }`}
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs border border-white/20 text-[10px] font-mono text-slate-200 font-semibold">
                      {art.catalogNumber}
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      {isUnlocked ? (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-700 border border-emerald-600 text-white text-[10px] font-bold shadow-xs">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{language === 'by' ? 'Даследавана' : 'Изучено'}</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/80 border border-white/20 text-slate-300 text-[10px] shadow-xs">
                          <Lock className="w-3 h-3" />
                          <span>{language === 'by' ? 'Закрыта' : 'Закрыто'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase font-bold text-amber-800">
                        {art.badge[language]}
                      </span>
                      <h3 className="text-base font-serif-title font-bold text-slate-900 leading-snug">
                        {art.title[language]}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans">
                        {art.subtitle[language]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{art.date}</span>
                      </span>
                      <span className="text-amber-800 font-semibold hover:underline">
                        {language === 'by' ? 'Пашпарт экспаната' : 'Паспорт экспоната'} →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ARCHIVAL LIBRARY / READING ROOM VIEW */}
      {activeTab === 'library' && (
        <div className="space-y-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-md">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-slate-900">
              {language === 'by' ? 'Архіўная чытальня і гістарычныя крыніцы' : 'Архивная читальня и исторические источники'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {language === 'by'
                ? 'Аўтэнтычныя цытаты з летапісаў, заканадаўчых актаў, успамінаў удзельнікаў падзей і бібліяграфія праекта.'
                : 'Аутентичные цитаты из летописей, законодательных актов, воспоминаний участников событий и библиография проекта.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Article 1: Skaryna's Foreword */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <span className="text-amber-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                {language === 'by' ? 'ПРАДМОВА ФРАНЦЫСКА СКАРЫНЫ • 1517 Г.' : 'ПРЕДИСЛОВИЕ ФРАНЦИСКА СКОРИНЫ • 1517 Г.'}
              </span>
              <h4 className="text-base font-serif-title font-bold text-slate-900">
                {language === 'by'
                  ? '«Панявож ад нараджэння звяры, што ходзяць у пустыні...»'
                  : '«Понеже от прирождения звери, яже ходят в пустыни...»'}
              </h4>
              <p className="text-xs text-slate-700 italic leading-relaxed border-l-2 border-amber-600 pl-3">
                {language === 'by'
                  ? '«Панявож ад нараджэння звяры, што ходзяць у пустыні, ведаюць ямы свае; птушкі, што лётаюць у паветры, ведаюць гнёзды свае; рыбы, што плаваюць па моры і ў рэках, чуюць віры свае; пчолы і тым падобныя бароняць вуллі свае, — так і людзі, дзе нарадзіліся і ўскормлены, да таго месца вялікую ласку маюць».'
                  : '«Понеже от прирождения звери, яже ходят в пустыни, ведают ямы своя; птици, летающие по воздуху, ведают гнезда своя; рыбы, плывущие по морю и в реках, чуют виры своя; пчелы и тым подобная боронят ульев своих, — тако ж и люди, где зродилися и вскормлены суть по бозе, к тому месту великую ласку имеют».'}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {language === 'by'
                  ? 'Крыніца: Прадмова да кнігі «Юдзіф» (Прага, 1519 г.).'
                  : 'Источник: Предисловие к книге «Юдифь» (Прага, 1519 г.).'}
              </p>
            </div>

            {/* Article 2: Lev Sapieha & 1588 Statut */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <span className="text-amber-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                {language === 'by' ? 'ТРЭЦІ СТАТУТ ВКЛ • 1588 Г. • ЛЕЎ САПЕГА' : 'ТРЕТИЙ СТАТУТ ВКЛ • 1588 Г. • ЛЕВ САПЕГА'}
              </span>
              <h4 className="text-base font-serif-title font-bold text-slate-900">
                {language === 'by'
                  ? '«Не чужым якім языкам, але сваім уласным правы пісаныя маем...»'
                  : '«Не чужим каким языком, но своим собственным законы писаны имеем...»'}
              </h4>
              <p className="text-xs text-slate-700 italic leading-relaxed border-l-2 border-amber-600 pl-3">
                {language === 'by'
                  ? '«А пісар земскі мае па-руску літарамі і словамі рускімі ўсе лісты, запісы і позвы пісаці, а не іншым якім языком і словамі... Бо тым мы ся вельмі хваліць мочам, іж не чужым якім языкам, але сваім уласным правы пісаныя маем і кожнага часу, што нам патрэба да ведама правоў нашых, ведаці мочам».'
                  : '«А писарь земский должен по-русски буквами и словами русскими все листы, записи и повестки писать, а не иным каким языком... Ибо тем мы можем весьма гордиться, что не чужим каким языком, но своим собственным законы писаны имеем и во всякое время всё, что нам потребно знать о правах наших, ведать можем».'}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {language === 'by'
                  ? 'Крыніца: Зварот канцлера Льва Сапегі да саслоўяў ВКЛ. Раздзел IV, арт. 1.'
                  : 'Источник: Обращение канцлера Льва Сапеги к сословиям ВКЛ. Раздел IV, арт. 1.'}
              </p>
            </div>

            {/* Article 3: Brest Fortress */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <span className="text-red-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                {language === 'by' ? 'БРЭСТСКАЯ КРЭПАСЦЬ-ГЕРОЙ • ЧЭРВЕНЬ-ЛІПЕНЬ 1941 Г.' : 'БРЕСТСКАЯ КРЕПОСТЬ-ГЕРОЙ • ИЮНЬ-ИЮЛЬ 1941 Г.'}
              </span>
              <h4 className="text-base font-serif-title font-bold text-slate-900">
                {language === 'by'
                  ? '«Нас было трое, нам было цяжка, але мы не паўлі духам...»'
                  : '«Нас было трое, нам было трудно, но мы не пали духом...»'}
              </h4>
              <p className="text-xs text-slate-700 italic leading-relaxed border-l-2 border-red-600 pl-3">
                {language === 'by'
                  ? '«Я паміраю, але не здаюся! Бывай, Радзіма. 20/VII-41 г.» — надпіс багнетамі на цаглянай сцяне падвалаў казармы 132-га асобнага батальёна канвойных войскаў НКУС. Гарнізон паказаў усяму свету прыклад непахіснай вернасці воінскай прысязе.'
                  : '«Я умираю, но не сдаюсь! Прощай, Родина. 20/VII-41 г.» — легендарная надпись штыком на кирпичной стене казармы 132-го отдельного батальона. Гарнизон цитадели показал всему миру образец несгибаемой стойкости и верности присяге.'}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {language === 'by'
                  ? 'Крыніца: Экспазіцыя Музея абароны Брэсцкай крэпасці.'
                  : 'Источник: Экспозиция Музея обороны Брестской крепости.'}
              </p>
            </div>

            {/* Article 4: Cosmonautics & Space */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <span className="text-cyan-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                {language === 'by' ? 'БЕЛАРУСКІ КОСМАС • П. КЛІМУК І М. ВАСІЛЕЎСКАЯ' : 'БЕЛОРУССКИЙ КОСМОС • П. КЛИМУК И М. ВАСИЛЕВСКАЯ'}
              </span>
              <h4 className="text-base font-serif-title font-bold text-slate-900">
                {language === 'by'
                  ? 'Ад касмічнага тэлескопа «Арыён» да эксперыментаў на МКС'
                  : 'От космического телескопа «Орион» до экспериментов на МКС'}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed border-l-2 border-cyan-600 pl-3 font-sans">
                {language === 'by'
                  ? 'Пётр Клімук успамінаў: «З вышыні арбіты Беларусь бачыцца асабліва прыгожай — неабсяжныя зялёныя пушчы, люстэркі азёр і срэбныя стужкі рэк». У 2024 годзе Марына Васілеўская выканала праграму Інстытута мікрабіялогіі і Інстытута мясамалочнай прамысловасці НАНБ па даследаванні штаммаў лактабактэрый у бязважкасці.'
                  : 'Петр Климук вспоминал: «С высоты орбиты Беларусь видится особенно красивой — бескрайние пущи, зеркала озер и серебряные ленты рек». В 2024 году Марина Василевская выполнила комплексную научную программу Института микробиологии и Института мясо-молочной промышленности НАНБ в невесомости.'}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {language === 'by'
                  ? 'Крыніца: Агенцтва па касмічных даследаваннях НАН Беларусі.'
                  : 'Источник: Агентство по космическим исследованиям НАН Беларуси.'}
              </p>
            </div>
          </div>

          {/* Bibliography / Archival Sources List */}
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-900">
              {language === 'by' ? 'Бібліяграфія і архіўная база праекта:' : 'Библиография и архивная база проекта:'}
            </h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside font-sans">
              <li>{language === 'by' ? 'Францыск Скарына і яго час: Энцыклапедычны даведнік. — Мінск: БелСЭ, 1988.' : 'Франциск Скорина и его время: Энциклопедический справочник. — Минск: БелСЭ, 1988.'}</li>
              <li>{language === 'by' ? 'Статут Вялікага княства Літоўскага 1588: Тэксты. Даведнік. Каментарыі. — Мінск: БелСЭ, 1989.' : 'Статут Великого княжества Литовского 1588: Тексты. Справочник. Комментарии. — Минск: БелСЭ, 1989.'}</li>
              <li>{language === 'by' ? 'Памяць: Гісторыка-дакументальныя хронікі гарадоў і раёнаў Беларусі (серыя выданняў).' : 'Память: Историко-документальные хроники городов и районов Беларуси (серия изданий).'}</li>
              <li>{language === 'by' ? 'Беларусь у Вялікай Айчыннай вайне 1941–1945: Энцыклапедыя. — Мінск: БелЭн, 1990.' : 'Беларусь в Великой Отечественной войне 1941–1945: Энциклопедия. — Минск: БелЭн, 1990.'}</li>
              <li>{language === 'by' ? 'Клімук П. І. Зоры побач: Запіскі касманаўта. — Мінск: Мастацкая літаратура, 1977.' : 'Климук П. И. Звезды рядом: Записки космонавта. — Минск: Мастацкая литература, 1977.'}</li>
              <li>{language === 'by' ? 'Аэракасмічныя даследаванні і спадарожнік БКА: Афіцыйныя справаздачы НАН Беларусі (2012–2024).' : 'Аэрокосмические исследования и спутник БКА: Официальные отчеты НАН Беларуси (2012–2024).'}</li>
            </ul>
          </div>
        </div>
      )}

      {/* Relic Detail Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-60 h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 shadow-sm">
                <img
                  src={selectedArtifact.image}
                  alt={selectedArtifact.title[language]}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-bold uppercase shadow-xs">
                    {selectedArtifact.badge[language]}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {selectedArtifact.catalogNumber}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-slate-900 leading-snug">
                  {selectedArtifact.title[language]}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {selectedArtifact.subtitle[language]}
                </p>

                <div className="pt-2 grid grid-cols-1 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>{language === 'by' ? 'Датаванне:' : 'Датировка:'}</strong> {selectedArtifact.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>{language === 'by' ? 'Месца захавання:' : 'Место хранения:'}</strong> {selectedArtifact.location[language]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Archive className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>{language === 'by' ? 'Архіўны фонд:' : 'Архивный фонд:'}</strong> {selectedArtifact.archiveSource[language]}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200">
              <h4 className="text-xs font-mono uppercase font-bold text-slate-900">
                {language === 'by' ? 'Гістарычны нарыс і апісанне:' : 'Исторический очерк и описание:'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {selectedArtifact.description[language]}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs leading-relaxed">
              <strong className="text-amber-800 font-mono text-[10px] uppercase block mb-1">
                {language === 'by' ? 'Гісторыка-культурная значнасць:' : 'Историко-культурная значимость:'}
              </strong>
              {selectedArtifact.significance[language]}
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer shadow-xs"
              >
                {language === 'by' ? 'Закрыць картку' : 'Закрыть карточку'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
