---
name: Вартавы Часу
description: Рэспубліканскі інтэрактыўны гісторыка-патрыятычны вэб-квест і музейны партал
colors:
  primary: "#b91c1c"
  primary-hover: "#991b1b"
  secondary: "#d97706"
  secondary-light: "#fef3c7"
  secondary-dark: "#78350f"
  accent-emerald: "#059669"
  neutral-bg: "#f8fafc"
  neutral-card: "#ffffff"
  neutral-border: "#e2e8f0"
  neutral-subtle: "#cbd5e1"
  neutral-text: "#0f172a"
  neutral-muted: "#475569"
typography:
  display:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontWeight: 700
    lineHeight: "1.15"
  headline:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontWeight: 700
    lineHeight: "1.25"
  title:
    fontFamily: "'Cinzel', serif"
    fontWeight: 600
    lineHeight: "1.3"
  body:
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontWeight: 400
    lineHeight: "1.6"
  label:
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontWeight: 600
    lineHeight: "1"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.neutral-card}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
---

# Design System: Вартавы Часу

## Overview

**Creative North Star: "Academic Museum Chronograph"**

Візуальная сістэма партала спалучае высакародную эстэтыку класічнага акадэмічнага музея і сучасны дынамічны інтэрфейс навучальнай платформы. Чысты светлы фон слановай косці і каменя (`#f8fafc`, `#faf9f6`), выразная класічная антыква (`Playfair Display`, `Cinzel`) і гарманічная патрыятычная каларыстыка (глыбокі рубінава-чырвоны, вытрыманы бурштынава-залаты, спакойны ізумрудны) ствараюць атмасферу павагі да гісторыі без музейнай сухасці.

Інтэрфейс факусуецца на тактыльным адчуванні артэфактаў: акцэнты нацыянальнай стужкі, паўпразрыстыя шкляныя плашкі (`backdrop-blur`), мяккія цені глыбіні вітрын і выразныя інтэрактыўныя кантрасты для выкарыстання на школьных дошках і персанальных экранах.

**Key Characteristics:**
- **Акадэмічнасць і дакладнасць**: урачыстыя загалоўкі з гістарычным характарам і строгая прапорцыя тэксту.
- **Музейнае асвятленне**: чыстыя мяккія фоны, шклопадобныя загалоўкі і карткі-вітрыны.
- **Інтэрактыўны водгук**: мікра-анімацыі навядзення, тактыльныя кнопкі з працэдурнай гукавой зваротнай сувяззю.

## Colors

Палітра спалучае дзяржаўную патрыятычную ідэнтычнасць і высакародныя музейныя матэрыялы: паперу, дрэва, метал і шкло.

### Primary
- **Heritage Crimson** (`#b91c1c` / Tailwind `red-700`): Асноўны стрыжневы колер патрыятычнай лініі і галоўных дзеянняў. Выкарыстоўваецца для ключавых CTA, значкоў важнасці і асноўных кнопак пачатку квэста.

### Secondary
- **Antique Amber Gold** (`#d97706` / Tailwind `amber-600`): Колер гістарычных рэліквій, узнагарод, падсветкі актыўных элементаў навігацыі і залатых артэфактаў.

### Accent
- **Resilient Emerald** (`#059669` / Tailwind `emerald-600`): Сімвал адраджэння, жыцця і сучаснасці; элемент нацыянальнага градыенту і індыкатар завершаных этапаў.

### Neutral
- **Museum Surface** (`#f8fafc` / `#faf9f6`): Базавы светлы фон старонак, які забяспечвае выдатную чытальнасць.
- **Showcase White** (`#ffffff`): Фотавітрыны, карткі артэфактаў і дыялогавыя вокны з тонкай абводкай.
- **Slate Frame** (`#e2e8f0` / `#cbd5e1`): Элегантныя тонкія раздзяляльнікі і рамкі.
- **Deep Slate Body** (`#0f172a` / `#334155`): Асноўны кантрасны тэкст.

### Named Rules
**The National Ribbon Rule.** Трыкалорны тонкі градыент (`from-red-600 via-amber-400 to-emerald-600`) выкарыстоўваецца выключна як ювелірны дэкаратыўны штрых таўшчынёй 2–3px на верхняй мяжы шапкі або картках вышэйшага ўзроўню, не перагружаючы зрок.

## Typography

**Display Font:** Playfair Display (Georgia, serif)
**Title Font:** Cinzel (serif)
**Body Font:** Inter (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif)
**Technical/Data Font:** ui-monospace, SFMono-Regular, monospace

**Character:** Спалучэнне манументальнай урачыстасці гістарычнай антыквы з крыштальнай чытальнасцю сучаснага геаметрычнага гратэска для інтэрфейсных надпісаў і навучальнага тэксту.

### Hierarchy
- **Display** (700, `text-3xl sm:text-5xl`, `line-height: 1.15`): Галоўныя банэры эпох і стартавага экрана.
- **Headline** (700, `text-2xl sm:text-3xl`, `line-height: 1.25`): Назвы модуляў, катэгорый і міні-гульняў.
- **Title** (600, `text-lg sm:text-xl`, `line-height: 1.3`): Загалоўкі картак, імёны персанажаў у дыялогах.
- **Body** (400, `text-sm sm:text-base`, `line-height: 1.6`): Асноўны гістарычны расповед, дыялогі, пытанні віктарыны.
- **Label / Tag** (600, `text-xs sm:text-sm`, `line-height: 1`): Навігацыйныя пункты, статусы, даты хронаграфа.

## Layout

- **Container**: Цэнтраваныя кантэйнеры `max-w-7xl` для агульнай раскладкі і `max-w-4xl` для канцэнтраванага чытання і дыялогаў.
- **Rhythm**: Прасторавыя адступы `space-y-8` і `space-y-16` паміж буйнымі сэкцыямі для стварэння адчування музейнага павільёна.
- **Density**: Аптымальная шчыльнасць для чытання з праектара і сэнсарных дошак.

## Elevation & Depth

- **Ambient Layering**: Замест цяжкіх ценяў прымяняюцца вельмі мяккія рассеяныя цені (`shadow-xs`, `shadow-sm`, `shadow-md`) і тонкія мяжы `border-slate-200/90`.
- **Glassmorphism**: Навігацыйны загаловак і дыялогі выкарыстоўваюць `bg-white/95 backdrop-blur-md` для плаўнага лунання над кантэнтам.

## Shapes

- **Radius Hierarchy**: 
  - `rounded-xl` (12px) для кнопак, бэйджаў і дробных элементаў кіравання.
  - `rounded-2xl` (16px) для картак рэліквій, пытанняў віктарыны і дыялогавых вокнаў.
  - `rounded-3xl` (24px) для манументальных вітрын і галоўнага банера.

## Components

### Buttons
- **Primary**: Рубінава-чырвоная аснова (`bg-red-700 hover:bg-red-800`), белы кантрасны тэкст, залаты акцэнт значка, мяккі цень `shadow-md shadow-red-700/20`, мікра-маштабаванне `hover:scale-[1.02]`.
- **Secondary / Outline**: Белая база (`bg-white hover:bg-slate-50`), шэрая мяжа `border-slate-300`, значкі бурштынавага адцення.
- **Nav Items**: Плыўныя пераходы, актыўны стан вылучаецца цёплым фонам `bg-amber-50` і акаймаваннем `border-amber-300`.

### Cards & Dialogs
- Беласнежны або градыентны фон з дакладнымі кутамі `rounded-2xl`, кантраснай тыпаграфікай і выразнымі інтэрактыўнымі зонамі.

## Do's and Don'ts

### Do:
- Заўсёды захоўваць чытэльнасць і высокі кантраст на светлым фоне.
- Выкарыстоўваць шрыфт `Playfair Display` толькі для загалоўкаў, а `Inter` — для ўсіх інфармацыйных блокаў і кнопак.
- Суправаджаць ключавыя інтэрактыўныя дзеянні мікра-эфектамі (клік гукавога рухавіка, мяккая трансфармацыя).

### Don't:
- Не выкарыстоўваць крыклівыя неонавыя або неадпаведныя колеры, якія парушаюць акадэмічны стыль.
- Не рабіць тэкст дробным (< 12px), каб захаваць зручнасць для школьных класаў і інтэрактыўных дошак.
