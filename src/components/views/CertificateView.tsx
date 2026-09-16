import React, { useRef, useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { TRANSLATIONS } from '../../data/translations';
import { soundEngine } from '../../utils/audio';
import { Award, Download, Printer } from 'lucide-react';

export const CertificateView: React.FC = () => {
  const {
    language,
    score,
    collectedArtifacts,
    userName,
    setUserName,
    userSchool,
    setUserSchool
  } = useGame();

  const t = TRANSLATIONS.certificateModal;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [name, setName] = useState(userName || '');
  const [school, setSchool] = useState(userSchool || '');

  useEffect(() => {
    drawCertificate();
  }, [name, school, language, score, collectedArtifacts]);

  const handleNameChange = (val: string) => {
    setName(val);
    setUserName(val);
  };

  const handleSchoolChange = (val: string) => {
    setSchool(val);
    setUserSchool(val);
  };

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 850;
    canvas.width = width;
    canvas.height = height;

    // Background: Noble ivory / light museum parchment
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, 750);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(0.7, '#faf8f5');
    bgGrad.addColorStop(1, '#f1ede4');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Deep Maroon & Bronze Archival Double Border
    ctx.strokeStyle = '#991b1b'; // Belarus State Carmine
    ctx.lineWidth = 10;
    ctx.strokeRect(28, 28, width - 56, height - 56);

    ctx.strokeStyle = '#b45309'; // Antique bronze
    ctx.lineWidth = 3;
    ctx.strokeRect(38, 38, width - 76, height - 76);

    ctx.strokeStyle = '#166534'; // Green accent
    ctx.lineWidth = 1.5;
    ctx.strokeRect(45, 45, width - 90, height - 90);

    // Corner rosettes
    const drawRosette = (x: number, y: number) => {
      ctx.fillStyle = '#991b1b';
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    };
    drawRosette(45, 45);
    drawRosette(width - 45, 45);
    drawRosette(45, height - 45);
    drawRosette(width - 45, height - 45);

    // Main Diploma Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 46px "Cinzel", Georgia, serif';
    ctx.fillText(
      language === 'by' ? 'ГАНАРОВЫ ДЫПЛОМ' : 'ПОЧЕТНЫЙ ДИПЛОМ',
      width / 2,
      150
    );

    ctx.fillStyle = '#b45309';
    ctx.font = 'italic 19px "Playfair Display", Georgia, serif';
    ctx.fillText(
      language === 'by'
        ? 'сапраўдным сведчыцца, што'
        : 'настоящим подтверждается, что',
      width / 2,
      195
    );

    // Recipient Name
    const displayName = name.trim() || (language === 'by' ? 'Прозвішча і Імя Удзельніка' : 'Фамилия и Имя Участника');
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
    ctx.fillText(displayName, width / 2, 255);

    // Decorative underline
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 240, 272);
    ctx.lineTo(width / 2 + 240, 272);
    ctx.stroke();

    // Institution
    const displaySchool = school.trim() || (language === 'by' ? 'Установа адукацыі' : 'Учреждение образования');
    ctx.fillStyle = '#475569';
    ctx.font = '500 18px "Inter", sans-serif';
    ctx.fillText(displaySchool, width / 2, 310);

    // Merits description
    ctx.fillStyle = '#1e293b';
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillText(
      language === 'by'
        ? 'паспяхова выканаў(-ла) комплекс навукова-даследчых і практычных заданняў,'
        : 'успешно выполнил(-а) комплекс научно-исследовательских и практических заданий,',
      width / 2,
      370
    );
    ctx.fillText(
      language === 'by'
        ? 'прадэманстраваў(-ла) высокі ўзровень ведаў гісторыка-культурнай спадчыны,'
        : 'продемонстрировал(-а) высокий уровень знаний историко-культурного наследия,',
      width / 2,
      398
    );
    ctx.fillText(
      language === 'by'
        ? 'гераічнага мінулага і сучасных навуковых дасягненняў беларускага народа.'
        : 'героического прошлого и современных научных достижений белорусского народа.',
      width / 2,
      426
    );

    // Qualification Status Box
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.fillRect(width / 2 - 360, 470, 720, 65);
    ctx.strokeRect(width / 2 - 360, 470, 720, 65);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 11px "Cinzel", sans-serif';
    ctx.fillText(t.rankTitle[language].toUpperCase(), width / 2, 493);

    ctx.fillStyle = '#7f1d1d';
    ctx.font = 'bold 15px "Cinzel", sans-serif';
    ctx.fillText(t.rankName[language], width / 2, 517);

    // Metrics
    ctx.fillStyle = '#334155';
    ctx.font = '500 14px "Inter", sans-serif';
    ctx.fillText(
      `${language === 'by' ? 'Даследавана рэліквій:' : 'Исследовано реликвий:'} ${collectedArtifacts.length}/12    |    ${language === 'by' ? 'Набрана балаў:' : 'Набрано баллов:'} ${score}`,
      width / 2,
      580
    );

    // Seal (Left)
    const sealX = 220;
    const sealY = 690;
    ctx.save();
    ctx.beginPath();
    ctx.arc(sealX, sealY, 44, 0, Math.PI * 2);
    ctx.fillStyle = '#fafaf9';
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 39, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#7f1d1d';
    ctx.font = 'bold 10px "Cinzel", sans-serif';
    ctx.fillText(language === 'by' ? 'ВАРТАВЫ ЧАСУ' : 'ХРАНИТЕЛИ', sealX, sealY - 12);
    ctx.fillText(language === 'by' ? 'АСВЕТА' : 'ВРЕМЕНИ', sealX, sealY + 3);
    ctx.fillText('БЕЛАРУСЬ', sealX, sealY + 18);
    ctx.restore();

    // Date & Signature (Right)
    const today = new Date().toLocaleDateString(language === 'by' ? 'be-BY' : 'ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    ctx.textAlign = 'right';
    ctx.fillStyle = '#475569';
    ctx.font = '13px "Inter", sans-serif';
    ctx.fillText(`${language === 'by' ? 'Дата фарміравання:' : 'Дата формирования:'} ${today}`, width - 120, 685);
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.fillText(
      language === 'by'
        ? 'Навукова-асветніцкі партал «Вартавы Часу»'
        : 'Научно-просветительский портал «Хранители Времени»',
      width - 120,
      715
    );
  };

  const handleDownload = () => {
    soundEngine.playSuccess();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `dyplom-${name.trim() || 'vartavy'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    soundEngine.playClick();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono uppercase tracking-wider font-semibold shadow-xs">
          <Award className="w-3.5 h-3.5 text-amber-700" />
          <span>{language === 'by' ? 'Пацверджанне кампетэнцый' : 'Подтверждение компетенций'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-slate-900">
          {t.title[language]}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          {language === 'by'
            ? 'Увядзіце прозвішча і ўстанову адукацыі для фарміравання імяннога сертыфіката даследчыка.'
            : 'Введите фамилию и учреждение образования для формирования именного сертификата исследователя.'}
        </p>
      </div>

      {/* Inputs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-xs">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            {t.nameLabel[language]}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder={t.namePlaceholder[language]}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            {t.schoolLabel[language]}
          </label>
          <input
            type="text"
            value={school}
            onChange={(e) => handleSchoolChange(e.target.value)}
            placeholder={t.schoolPlaceholder[language]}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* Canvas preview */}
      <div className="w-full bg-slate-100 p-3 sm:p-5 rounded-2xl border border-slate-200 flex justify-center shadow-xs">
        <canvas
          ref={canvasRef}
          className="w-full h-auto max-w-[850px] rounded-lg shadow-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleDownload}
          className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-sm transition cursor-pointer"
        >
          <Download className="w-4 h-4 text-amber-200" />
          <span>{t.downloadBtn[language]}</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium text-xs sm:text-sm flex items-center gap-2 shadow-xs transition cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>{t.printBtn[language]}</span>
        </button>
      </div>
    </div>
  );
};
