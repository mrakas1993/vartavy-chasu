import pptxgen from 'pptxgenjs';
import fs from 'fs';

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Вартавы Часу';
pptx.company = 'Республика Беларусь';
pptx.title = 'Презентация проекта «Вартавы Часу» («Хранители Времени»)';

const C_BG = 'F8FAFC';
const C_CARD = 'FFFFFF';
const C_BORDER = 'E2E8F0';
const C_TITLE = '0F172A';
const C_TEXT = '334155';
const C_MUTED = '64748B';
const C_GOLD = 'B45309';
const C_RED = '991B1B';
const C_GREEN = '047857';

function addHeader(slide, category, title) {
  // Top ribbon line
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { color: C_GOLD }, line: { color: C_GOLD }
  });

  // Category badge
  if (category) {
    slide.addText(category.toUpperCase(), {
      x: 0.8, y: 0.35, w: 8.4, h: 0.3,
      fontFace: 'Arial', fontSize: 10, color: C_GOLD, bold: true, letterSpacing: 1.5
    });
  }

  // Main slide title
  slide.addText(title, {
    x: 0.8, y: 0.62, w: 8.4, h: 0.6,
    fontFace: 'Georgia', fontSize: 22, color: C_TITLE, bold: true
  });
}

function addCard(slide, x, y, w, h, fill = C_CARD, border = C_BORDER) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.12,
    fill: { color: fill },
    line: { color: border, width: 1 }
  });
}

// ==========================================
// СЛАЙД 1: ТИТУЛЬНЫЙ
// ==========================================
const s1 = pptx.addSlide();
s1.background = { color: 'FAF9F6' };

// Decorative frame
s1.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 10, h: 0.1,
  fill: { color: C_RED }, line: { color: C_RED }
});
s1.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 0.8, w: 8.4, h: 4.0, rectRadius: 0.2,
  fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.5 }
});

s1.addText('ИНТЕРАКТИВНЫЙ ОБРАЗОВАТЕЛЬНЫЙ ВЕБ-ПОРТАЛ', {
  x: 1.2, y: 1.2, w: 7.6, h: 0.35,
  fontFace: 'Arial', fontSize: 11, color: C_GOLD, bold: true, align: 'center', letterSpacing: 2
});

s1.addText('«ВАРТАВЫ ЧАСУ»\n(«ХРАНИТЕЛИ ВРЕМЕНИ»)', {
  x: 1.2, y: 1.6, w: 7.6, h: 1.4,
  fontFace: 'Georgia', fontSize: 32, color: C_TITLE, bold: true, align: 'center'
});

s1.addText('Историко-культурное наследие, всенародный подвиг и научные достижения Беларуси в интерактивном цифровом пространстве', {
  x: 1.5, y: 3.05, w: 7.0, h: 0.65,
  fontFace: 'Arial', fontSize: 13, color: C_TEXT, align: 'center', italic: true
});

s1.addText('2026 год', {
  x: 1.2, y: 4.1, w: 7.6, h: 0.35,
  fontFace: 'Arial', fontSize: 11, color: C_MUTED, align: 'center'
});

// ==========================================
// СЛАЙД 2: АКТУАЛЬНОСТЬ И ПРОБЛЕМАТИКА
// ==========================================
const s2 = pptx.addSlide();
s2.background = { color: C_BG };
addHeader(s2, 'Обоснование проекта', 'Актуальность темы и вызовы образования');

addCard(s2, 0.8, 1.4, 4.0, 3.6);
s2.addText('Проблематика традиционного подхода', {
  x: 1.0, y: 1.6, w: 3.6, h: 0.4,
  fontFace: 'Georgia', fontSize: 14, color: C_RED, bold: true
});
s2.addText([
  { text: '• Пассивное восприятие: ', options: { bold: true } },
  { text: 'чтение текстовых учебников не всегда вовлекает внимание современных учащихся.\n\n' },
  { text: '• Фрагментарность знаний: ', options: { bold: true } },
  { text: 'отсутствие единой платформы, связывающей древние истоки, события ВОВ и современную науку.\n\n' },
  { text: '• Дефицит интерактивности: ', options: { bold: true } },
  { text: 'нехватка качественных белорусских образовательных веб-симуляций.' }
], {
  x: 1.0, y: 2.1, w: 3.6, h: 2.6,
  fontFace: 'Arial', fontSize: 11.5, color: C_TEXT
});

addCard(s2, 5.2, 1.4, 4.0, 3.6);
s2.addText('Решение проекта «Вартавы Часу»', {
  x: 5.4, y: 1.6, w: 3.6, h: 0.4,
  fontFace: 'Georgia', fontSize: 14, color: C_GREEN, bold: true
});
s2.addText([
  { text: '• Принцип «Исследуй, действуя»: ', options: { bold: true } },
  { text: 'пользователь сам нажимает рычаг станка, настраивает рацию, стыкует космический корабль.\n\n' },
  { text: '• Сквозной исторический нарратив: ', options: { bold: true } },
  { text: '4 фундаментальные эпохи (XI–XXI века) в едином маршруте.\n\n' },
  { text: '• Музейная эстетика: ', options: { bold: true } },
  { text: 'благородный академический светлый дизайн без мультяшных клише и эмодзи.' }
], {
  x: 5.4, y: 2.1, w: 3.6, h: 2.6,
  fontFace: 'Arial', fontSize: 11.5, color: C_TEXT
});

// ==========================================
// СЛАЙД 3: ЦЕЛЬ И ЗАДАЧИ
// ==========================================
const s3 = pptx.addSlide();
s3.background = { color: C_BG };
addHeader(s3, 'Концепция разработки', 'Цель и ключевые задачи проекта');

addCard(s3, 0.8, 1.35, 8.4, 0.95, 'FEF3C7', 'FDE68A');
s3.addText('ЦЕЛЬ ПРОЕКТА:', {
  x: 1.0, y: 1.45, w: 2.0, h: 0.3,
  fontFace: 'Arial', fontSize: 11, color: C_GOLD, bold: true
});
s3.addText('Создание общедоступного интерактивного веб-портала по истории, культуре, подвигу и научным достижениям Беларуси, обеспечивающего деятельностное погружение в историю через квесты, каталог реликвий и викторины.', {
  x: 1.0, y: 1.75, w: 8.0, h: 0.45,
  fontFace: 'Arial', fontSize: 11.5, color: C_TITLE, bold: true
});

const taskCards = [
  { title: 'Историко-архивные', text: 'Исследование фондов Национальной библиотеки Беларуси, Музея истории ВОВ и НАН Беларуси.', x: 0.8 },
  { title: 'Инженерные', text: 'Проектирование SPA-архитектуры на React 19, TypeScript, Vite и развертывание на GitHub Pages.', x: 2.95 },
  { title: 'Игровые (Геймификация)', text: 'Создание 4 симуляторов (станок Скорины, замок, рация Морзе, стыковка «Союз МС-25»).', x: 5.1 },
  { title: 'Дидактические', text: 'Банк из 30 тестов, 12 реликвий и процедурная генерация диплома на HTML5 Canvas.', x: 7.25 }
];

taskCards.forEach(tc => {
  addCard(s3, tc.x, 2.5, 1.95, 2.5);
  s3.addText(tc.title, {
    x: tc.x + 0.12, y: 2.7, w: 1.71, h: 0.5,
    fontFace: 'Georgia', fontSize: 12, color: C_GOLD, bold: true, align: 'center'
  });
  s3.addText(tc.text, {
    x: tc.x + 0.12, y: 3.3, w: 1.71, h: 1.5,
    fontFace: 'Arial', fontSize: 10.5, color: C_TEXT, align: 'center'
  });
});

// ==========================================
// СЛАЙД 4: ЗАГЛАВНЫЙ МОДУЛЬ (HERO)
// ==========================================
const s4 = pptx.addSlide();
s4.background = { color: C_BG };
addHeader(s4, 'Интерфейс системы', 'Заглавный модуль и навигация портала');

if (fs.existsSync('public/images/screen_home.png')) {
  s4.addImage({
    path: 'public/images/screen_home.png',
    x: 0.8, y: 1.35, w: 5.2, h: 3.7
  });
}

addCard(s4, 6.2, 1.35, 3.0, 3.7);
s4.addText('Особенности реализации:', {
  x: 6.4, y: 1.55, w: 2.6, h: 0.35,
  fontFace: 'Georgia', fontSize: 13, color: C_GOLD, bold: true
});
s4.addText([
  { text: '• Светлая музейная палитра: ', options: { bold: true } },
  { text: 'фон слоновой кости, золотые и карминные акценты.\n\n' },
  { text: '• Панель состояния: ', options: { bold: true } },
  { text: 'отображение баланса очков, открытых реликвий, звука и языка (BY / RU).\n\n' },
  { text: '• Четыре исторические главы: ', options: { bold: true } },
  { text: 'интерактивные карточки с фото и статусом доступа.\n\n' },
  { text: '• Полная адаптивность: ', options: { bold: true } },
  { text: 'поддержка мобильных устройств и широкоформатных экранов.' }
], {
  x: 6.4, y: 1.95, w: 2.6, h: 2.9,
  fontFace: 'Arial', fontSize: 10.5, color: C_TEXT
});

// ==========================================
// СЛАЙД 5: МОДУЛЬ КВЕСТОВ И СИМУЛЯЦИЙ
// ==========================================
const s5 = pptx.addSlide();
s5.background = { color: C_BG };
addHeader(s5, 'Геймификация и реконструкция', 'Интерактивные исторические квесты');

if (fs.existsSync('public/images/screen_quest.png')) {
  s5.addImage({
    path: 'public/images/screen_quest.png',
    x: 0.8, y: 1.35, w: 5.2, h: 3.7
  });
}

addCard(s5, 6.2, 1.35, 3.0, 3.7);
s5.addText('4 уникальных симулятора:', {
  x: 6.4, y: 1.55, w: 2.6, h: 0.35,
  fontFace: 'Georgia', fontSize: 13, color: C_GOLD, bold: true
});
s5.addText([
  { text: '1. Печатный станок 1517 г.: ', options: { bold: true } },
  { text: 'укладка матрицы, краска, оттиск гравюры Скорины.\n\n' },
  { text: '2. Экспертиза Мирского замка: ', options: { bold: true } },
  { text: 'анализ башен и стен с открытием Слуцких поясов.\n\n' },
  { text: '3. Партизанская рация Морзе: ', options: { bold: true } },
  { text: 'настройка волны 7.15 МГц, звук тона 700 Гц и дешифровка.\n\n' },
  { text: '4. Стыковка корабля «Союз МС-25»: ', options: { bold: true } },
  { text: 'управление двигателями ориентации до захвата шлюза МКС.' }
], {
  x: 6.4, y: 1.95, w: 2.6, h: 2.9,
  fontFace: 'Arial', fontSize: 10, color: C_TEXT
});

// ==========================================
// СЛАЙД 6: ХРОНОЛОГИЧЕСКАЯ ЛЕНТА
// ==========================================
const s6 = pptx.addSlide();
s6.background = { color: C_BG };
addHeader(s6, 'Исторический континуум', 'Интерактивная хронология (862–2024 гг.)');

if (fs.existsSync('public/images/screen_timeline.png')) {
  s6.addImage({
    path: 'public/images/screen_timeline.png',
    x: 0.8, y: 1.35, w: 5.2, h: 3.7
  });
}

addCard(s6, 6.2, 1.35, 3.0, 3.7);
s6.addText('Тысячелетие истории:', {
  x: 6.4, y: 1.55, w: 2.6, h: 0.35,
  fontFace: 'Georgia', fontSize: 13, color: C_GOLD, bold: true
});
s6.addText([
  { text: '• 16 ключевых вех: ', options: { bold: true } },
  { text: 'от основания Полоцка до полета первого суверенного космонавта.\n\n' },
  { text: '• Тематическая рубрикация: ', options: { bold: true } },
  { text: 'разделение событий на Просвещение, Зодчество, Подвиг и Науку.\n\n' },
  { text: '• Аналитические справки: ', options: { bold: true } },
  { text: 'каждое событие раскрывает вклад в формирование белорусской государственности и духовной культуры.' }
], {
  x: 6.4, y: 1.95, w: 2.6, h: 2.9,
  fontFace: 'Arial', fontSize: 10.5, color: C_TEXT
});

// ==========================================
// СЛАЙД 7: СВОД РЕЛИКВИЙ И ЧИТАЛЬНЯ
// ==========================================
const s7 = pptx.addSlide();
s7.background = { color: C_BG };
addHeader(s7, 'Музейный фонд', 'Цифровой свод реликвий и читальня');

if (fs.existsSync('public/images/screen_codex.png')) {
  s7.addImage({
    path: 'public/images/screen_codex.png',
    x: 0.8, y: 1.35, w: 5.2, h: 3.7
  });
}

addCard(s7, 6.2, 1.35, 3.0, 3.7);
s7.addText('Научная достоверность:', {
  x: 6.4, y: 1.55, w: 2.6, h: 0.35,
  fontFace: 'Georgia', fontSize: 13, color: C_GOLD, bold: true
});
s7.addText([
  { text: '• 12 национальных святынь: ', options: { bold: true } },
  { text: 'от Креста Евфросинии Полоцкой до скафандра и самосвала БЕЛАЗ.\n\n' },
  { text: '• Аутентичные шифры: ', options: { bold: true } },
  { text: 'каждый артефакт снабжен музейным номером (КП-НББ, МГВОВ и др.).\n\n' },
  { text: '• Зал первоисточников: ', options: { bold: true } },
  { text: 'библиография, архивные цитаты и ссылки на музейные фонды.' }
], {
  x: 6.4, y: 1.95, w: 2.6, h: 2.9,
  fontFace: 'Arial', fontSize: 10.5, color: C_TEXT
});

// ==========================================
// СЛАЙД 8: ИНТЕЛЛЕКТУАЛЬНАЯ ВИКТОРИНА
// ==========================================
const s8 = pptx.addSlide();
s8.background = { color: C_BG };
addHeader(s8, 'Контроль знаний', 'Интеллектуальный викторинный комплекс');

if (fs.existsSync('public/images/screen_quiz.png')) {
  s8.addImage({
    path: 'public/images/screen_quiz.png',
    x: 0.8, y: 1.35, w: 5.2, h: 3.7
  });
}

addCard(s8, 6.2, 1.35, 3.0, 3.7);
s8.addText('Методическая ценность:', {
  x: 6.4, y: 1.55, w: 2.6, h: 0.35,
  fontFace: 'Georgia', fontSize: 13, color: C_GOLD, bold: true
});
s8.addText([
  { text: '• 30 верифицированных вопросов: ', options: { bold: true } },
  { text: 'по 10 вопросов в категориях «Спадчына», «ВАВ», «Космас і навука».\n\n' },
  { text: '• Мгновенный отклик: ', options: { bold: true } },
  { text: 'цветовая индикация верных и неверных вариантов.\n\n' },
  { text: '• Обучающий эффект: ', options: { bold: true } },
  { text: 'к каждому ответу выводится историческое пояснение с точными фактами и датами.' }
], {
  x: 6.4, y: 1.95, w: 2.6, h: 2.9,
  fontFace: 'Arial', fontSize: 10.5, color: C_TEXT
});

// ==========================================
// СЛАЙД 9: НАГРАДНОЙ ДИПЛОМ НА CANVAS
// ==========================================
const s9 = pptx.addSlide();
s9.background = { color: C_BG };
addHeader(s9, 'Академическая верификация', 'Генератор наградного диплома на Canvas');

if (fs.existsSync('public/images/screen_certificate.png')) {
  s9.addImage({
    path: 'public/images/screen_certificate.png',
    x: 0.8, y: 1.35, w: 5.2, h: 3.7
  });
}

addCard(s9, 6.2, 1.35, 3.0, 3.7);
s9.addText('Процедурный рендеринг:', {
  x: 6.4, y: 1.55, w: 2.6, h: 0.35,
  fontFace: 'Georgia', fontSize: 13, color: C_GOLD, bold: true
});
s9.addText([
  { text: '• HTML5 Canvas (1000×800 px): ', options: { bold: true } },
  { text: 'пергаментный градиент, геральдические рамки, сургучная печать.\n\n' },
  { text: '• Персонализация: ', options: { bold: true } },
  { text: 'динамическая подстановка имени исследователя и школы.\n\n' },
  { text: '• Документная выгрузка: ', options: { bold: true } },
  { text: 'скачивание в формате PNG высокой четкости и прямая печать из браузера.' }
], {
  x: 6.4, y: 1.95, w: 2.6, h: 2.9,
  fontFace: 'Arial', fontSize: 10.5, color: C_TEXT
});

// ==========================================
// СЛАЙД 10: 3D WEBGL ВИЗУАЛИЗАЦИЯ
// ==========================================
const s10 = pptx.addSlide();
s10.background = { color: '060a14' };

// Top ribbon
s10.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 10, h: 0.08,
  fill: { color: '0891b2' }, line: { color: '0891b2' }
});

s10.addText('3D ТЕХНОЛОГИЯ / OVERDRIVE', {
  x: 0.8, y: 0.35, w: 8.4, h: 0.3,
  fontFace: 'Arial', fontSize: 10, color: '06b6d4', bold: true, letterSpacing: 2
});

s10.addText('Интерактивная 3D WebGL Симуляция Орбитальной Стыковки', {
  x: 0.8, y: 0.62, w: 8.4, h: 0.6,
  fontFace: 'Georgia', fontSize: 20, color: 'e2e8f0', bold: true
});

if (fs.existsSync('scripts/overdrive_3d_preview.png')) {
  s10.addImage({
    path: 'scripts/overdrive_3d_preview.png',
    x: 0.5, y: 1.35, w: 5.5, h: 3.7
  });
}

const features3d = [
  { label: 'Three.js WebGL', text: 'Процедурная Земля, 600-частичное звёздное поле, орбитальная станция МКС.' },
  { label: 'RCS Тяга', text: 'Импульсные газовые двигатели с динамическими частицами при каждом манёвре.' },
  { label: 'Управление', text: 'Мышь, сенсор, клавиши стрелок и WASD. Кнопка переключения 3D / 2D.' },
  { label: '100% Offline', text: 'Нулевые внешние запросы, процедурная генерация текстур без CDN.' }
];

features3d.forEach((f, i) => {
  const fy = 1.35 + i * 0.93;
  s10.addShape(pptx.ShapeType.roundRect, {
    x: 6.2, y: fy, w: 3.3, h: 0.78, rectRadius: 0.1,
    fill: { color: '0f172a' },
    line: { color: '0e7490', width: 1 }
  });
  s10.addText(f.label, {
    x: 6.4, y: fy + 0.06, w: 2.9, h: 0.25,
    fontFace: 'Arial', fontSize: 10, color: '22d3ee', bold: true
  });
  s10.addText(f.text, {
    x: 6.4, y: fy + 0.32, w: 2.9, h: 0.4,
    fontFace: 'Arial', fontSize: 9.5, color: '94a3b8'
  });
});

// ==========================================
// СЛАЙД 11: ТЕХНОЛОГИИ И ХОСТИНГ
// ==========================================
const s11_tech = pptx.addSlide();
s11_tech.background = { color: C_BG };
addHeader(s11_tech, 'Технический базис', 'Технологический стек и развертывание');

const techItems = [
  { name: 'React 19 & TypeScript', desc: 'Компонентная модель, типобезопасность, реактивное состояние.', x: 0.8, y: 1.4 },
  { name: 'Tailwind CSS & Vite', desc: 'Строгая дизайн-система, скорость сборки проекта менее 600 мс.', x: 5.2, y: 1.4 },
  { name: 'Web Audio API', desc: 'Программный синтез звуковых волн азбуки Морзе без внешних mp3.', x: 0.8, y: 2.65 },
  { name: 'HTML5 Canvas API + Three.js WebGL', desc: 'Дипломы на Canvas и 3D-сцена орбитальной стыковки без внешних ресурсов.', x: 5.2, y: 2.65 },
  { name: 'GitHub Pages & CI/CD', desc: 'Автоматический конвейер сборки и публикации через GitHub Actions.', x: 0.8, y: 3.9 },
  { name: 'Живой онлайн-доступ', desc: 'https://mrakas1993.github.io/vartavy-chasu/ (доступно на любых устройствах)', x: 5.2, y: 3.9 }
];

techItems.forEach(item => {
  addCard(s11_tech, item.x, item.y, 4.0, 1.05);
  s11_tech.addText(item.name, {
    x: item.x + 0.2, y: item.y + 0.15, w: 3.6, h: 0.3,
    fontFace: 'Georgia', fontSize: 12, color: C_GOLD, bold: true
  });
  s11_tech.addText(item.desc, {
    x: item.x + 0.2, y: item.y + 0.45, w: 3.6, h: 0.5,
    fontFace: 'Arial', fontSize: 10.5, color: C_TEXT
  });
});

// ==========================================
// СЛАЙД 11: ПРАКТИЧЕСКАЯ ЗНАЧИМОСТЬ
// ==========================================
const s11 = pptx.addSlide();
s11.background = { color: C_BG };
addHeader(s11, 'Образовательный потенциал', 'Практическая значимость и внедрение');

const useCases = [
  { title: 'Уроки истории Беларуси', text: 'Интерактивное пособие для изучения тем эпохи Скорины, ВКЛ, Великой Отечественной войны и современной науки.', x: 0.8, y: 1.4 },
  { title: 'Единые уроки памяти', text: 'Проведение классных часов и патриотических викторин ко Дню Победы, Дню Независимости и Дню космонавтики.', x: 5.2, y: 1.4 },
  { title: 'Научные исследования МАН', text: 'База первоисточников и архивных материалов для подготовки докладов и олимпиадных заданий.', x: 0.8, y: 3.1 },
  { title: 'Музейный терминал', text: 'Использование в качестве виртуального интерактивного киоска в музеях и библиотеках учреждений образования.', x: 5.2, y: 3.1 }
];

useCases.forEach(uc => {
  addCard(s11, uc.x, uc.y, 4.0, 1.5);
  s11.addText(uc.title, {
    x: uc.x + 0.2, y: uc.y + 0.2, w: 3.6, h: 0.35,
    fontFace: 'Georgia', fontSize: 13, color: C_TITLE, bold: true
  });
  s11.addText(uc.text, {
    x: uc.x + 0.2, y: uc.y + 0.6, w: 3.6, h: 0.75,
    fontFace: 'Arial', fontSize: 11, color: C_TEXT
  });
});

// ==========================================
// СЛАЙД 12: ЗАКЛЮЧЕНИЕ
// ==========================================
const s12 = pptx.addSlide();
s12.background = { color: 'FAF9F6' };

s12.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 10, h: 0.1,
  fill: { color: C_RED }, line: { color: C_RED }
});
s12.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 0.8, w: 8.4, h: 4.0, rectRadius: 0.2,
  fill: { color: C_CARD }, line: { color: C_BORDER, width: 1.5 }
});

s12.addText('БЛАГОДАРЮ ЗА ВНИМАНИЕ!', {
  x: 1.2, y: 1.4, w: 7.6, h: 0.8,
  fontFace: 'Georgia', fontSize: 28, color: C_TITLE, bold: true, align: 'center'
});

s12.addText('Проект «Вартавы Часу» («Хранители Времени»)\nГотов ответить на ваши вопросы', {
  x: 1.2, y: 2.3, w: 7.6, h: 0.8,
  fontFace: 'Arial', fontSize: 14, color: C_TEXT, align: 'center'
});

s12.addText('Онлайн-адрес проекта: https://mrakas1993.github.io/vartavy-chasu/', {
  x: 1.2, y: 3.3, w: 7.6, h: 0.4,
  fontFace: 'Arial', fontSize: 12, color: C_GOLD, bold: true, align: 'center'
});

const outPptx = 'Презентация_Вартавы_Часу.pptx';
pptx.writeFile({ fileName: outPptx }).then(() => {
  console.log('Presentation successfully created:', outPptx);
}).catch(err => {
  console.error('Error writing presentation:', err);
  process.exit(1);
});
