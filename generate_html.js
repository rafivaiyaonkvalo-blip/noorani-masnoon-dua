const fs = require('fs');
const path = require('path');

const logoB64 = fs.readFileSync(path.join(__dirname, 'logo_b64.txt'), 'utf-8').trim();
const dataContent = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf-8');

const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>নূরানী মাসনূন দু'আ ও কালিমাহ্ | মারকাযুল ঈমান - দাওয়াহ্ বিভাগ</title>
  
  <!-- Google Fonts: Amiri, Harmattan, Lateef, Noto Naskh Arabic, Scheherazade New, Hind Siliguri -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Harmattan:wght@400;700&family=Hind+Siliguri:wght@400;500;600;700&family=Lateef:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&family=Scheherazade+New:wght@400;600;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      /* Official Markazul Iman Signature Palette */
      --primary: #04432c;
      --primary-dark: #02291b;
      --primary-deep: #011910;
      --primary-light: #065f3e;
      --primary-accent: #10b981;
      
      --gold-primary: #d4af37;
      --gold-light: #fef08a;
      --gold-deep: #b8860b;
      --gold-gradient: linear-gradient(135deg, #d4af37 0%, #fef08a 50%, #b8860b 100%);
      
      --bg-stage: #021a11;
      --card-bg: #ffffff;
      --text-main: #111827;
      --text-muted: #4b5563;
      --border-soft: rgba(212, 175, 55, 0.35);
      
      --arabic-font: 'Scheherazade New', serif;
      --arabic-size: 40px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Hind Siliguri', sans-serif;
      background-color: var(--bg-stage);
      background-image: 
        radial-gradient(circle at 50% 15%, #053b26 0%, #01140c 100%);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      position: relative;
    }

    /* Top Control Bar */
    .top-bar {
      background: linear-gradient(180deg, #02291b 0%, #011810 100%);
      color: #fff;
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1.5px solid var(--gold-primary);
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      z-index: 100;
      flex-wrap: wrap;
      gap: 12px;
    }

    .org-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      user-select: none;
    }

    .org-logo-mini {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: #fff;
      object-fit: contain;
      padding: 2px;
      border: 2px solid var(--gold-primary);
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
    }

    .org-title-group h1 {
      font-size: 16px;
      font-weight: 700;
      color: #f3e5ab;
      line-height: 1.25;
      letter-spacing: 0.3px;
    }

    .org-title-group p {
      font-size: 11px;
      color: #a7f3d0;
      letter-spacing: 0.2px;
      opacity: 0.9;
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .btn {
      font-family: 'Hind Siliguri', sans-serif;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.2s ease;
      text-decoration: none;
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      transform: translateY(-1px);
    }

    /* Dedicated Glowing Kalima Button */
    .btn-kalima-special {
      background: var(--gold-gradient);
      color: #02291b !important;
      font-weight: 700;
      border: 1px solid #fff2a8;
      box-shadow: 0 0 12px rgba(212, 175, 55, 0.5);
      animation: goldPulse 2.8s infinite;
    }

    .btn-kalima-special:hover {
      background: linear-gradient(135deg, #fff2a8 0%, #ffd700 100%);
      transform: translateY(-2px);
      box-shadow: 0 0 18px rgba(255, 215, 0, 0.8);
    }

    @keyframes goldPulse {
      0% { box-shadow: 0 0 6px rgba(212, 175, 55, 0.4); }
      50% { box-shadow: 0 0 16px rgba(255, 215, 0, 0.8); }
      100% { box-shadow: 0 0 6px rgba(212, 175, 55, 0.4); }
    }

    .btn-gold {
      background: rgba(212, 175, 55, 0.18);
      border-color: var(--gold-primary);
      color: #fef08a;
    }
    .btn-gold:hover {
      background: var(--gold-primary);
      color: #02291b;
    }

    /* Font Controls */
    .font-control-group {
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.35);
      border-radius: 6px;
      padding: 3px 8px;
      gap: 6px;
      border: 1px solid rgba(212, 175, 55, 0.35);
    }

    .font-control-group label {
      font-size: 11px;
      color: #a7f3d0;
      font-weight: 500;
    }

    .font-control-group select {
      background: #04432c;
      color: #fff;
      border: 1px solid var(--gold-primary);
      border-radius: 4px;
      padding: 3px 6px;
      font-size: 12px;
      outline: none;
      cursor: pointer;
      font-family: inherit;
    }

    .size-btn {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
      border: 1px solid rgba(212, 175, 55, 0.4);
      width: 24px;
      height: 24px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .size-btn:hover {
      background: var(--gold-primary);
      color: #02291b;
    }

    /* Print Media Styles */
    @media print {
      .top-bar, .bottom-bar, .nav-arrow, .toast, .modal-overlay {
        display: none !important;
      }
      body {
        background: #fff !important;
        padding: 0 !important;
      }
      .slide-stage {
        padding: 0 !important;
      }
      .slide-card {
        box-shadow: none !important;
        border: 2px solid var(--primary) !important;
        max-width: 100% !important;
        width: 100% !important;
      }
    }

    /* Main Slide Stage */
    .slide-stage {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 20px;
      position: relative;
      z-index: 5;
    }

    /* PREMIUM WIDESCREEN SLIDE CARD (Clean, Luxurious, Breathable) */
    .slide-card {
      width: 100%;
      max-width: 1080px;
      min-height: 570px;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      position: relative;
      background: var(--card-bg);
      border: 1px solid var(--border-soft);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 4px 15px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Clean Slide Header Inside Card */
    .slide-header {
      padding: 16px 32px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      background: linear-gradient(to bottom, rgba(4, 67, 44, 0.05), transparent);
    }

    .slide-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .badge-number {
      background: linear-gradient(135deg, #04432c 0%, #065f3e 100%);
      color: #fef08a;
      font-weight: 700;
      font-size: 13.5px;
      padding: 5px 14px;
      border-radius: 20px;
      border: 1px solid var(--gold-primary);
      box-shadow: 0 2px 6px rgba(0,0,0,0.12);
    }

    .badge-cat {
      background: #f0fdf4;
      color: #065f3e;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 14px;
      border: 1px solid #bbf7d0;
    }

    .badge-page {
      background: #fffbeb;
      color: #92400e;
      font-size: 11.5px;
      padding: 4px 10px;
      border-radius: 10px;
      border: 1px solid #fde68a;
      font-weight: 600;
    }

    .slide-header-title {
      font-size: 18px;
      font-weight: 700;
      color: #04432c;
      text-align: right;
      letter-spacing: 0.2px;
    }

    /* Slide Content Body (Spacious, Elegant, Centered Hierarchy) */
    .slide-body {
      padding: 28px 48px 24px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      overflow-y: auto;
      gap: 16px;
    }

    /* Arabic Calligraphy Section */
    .arabic-wrapper {
      width: 100%;
      margin-bottom: 4px;
    }

    .arabic-text {
      font-family: var(--arabic-font);
      font-size: var(--arabic-size);
      line-height: 1.85;
      color: #02291b;
      direction: rtl;
      word-spacing: 4px;
      text-rendering: optimizeLegibility;
      font-weight: 700;
      text-shadow: 0 1px 1px rgba(0,0,0,0.06);
    }


    /* Clean Pronunciation Pill */
    .pronunciation-pill {
      font-size: 16px;
      color: #065f3e;
      font-weight: 500;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 24px;
      padding: 6px 22px;
      max-width: 920px;
      line-height: 1.6;
      white-space: pre-line;
      box-shadow: 0 1px 4px rgba(0,0,0,0.03);
    }

    /* Bold Bengali Meaning */
    .meaning-container {
      max-width: 920px;
      width: 100%;
    }

    .meaning-text {
      font-size: 21px;
      font-weight: 600;
      color: #111827;
      line-height: 1.65;
      white-space: pre-line;
    }

    /* Clean Fazeelat & Rule Cards (Zero Blue, Zero Clutter) */
    .meta-cards-group {
      width: 100%;
      max-width: 920px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 6px;
      text-align: left;
    }

    .meta-info-card {
      background: #f0fdf4;
      border-left: 4px solid #10b981;
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 13.5px;
      color: #064e3b;
      line-height: 1.55;
      border-top: 1px solid #dcfce7;
      border-bottom: 1px solid #dcfce7;
      border-right: 1px solid #dcfce7;
    }

    .meta-info-card strong {
      color: #04432c;
      font-weight: 700;
    }

    .meta-rule-card {
      background: #fefce8;
      border-left: 4px solid #ca8a04;
      border-radius: 8px;
      padding: 10px 16px;
      font-size: 13.5px;
      color: #713f12;
      line-height: 1.55;
      border-top: 1px solid #fef9c3;
      border-bottom: 1px solid #fef9c3;
      border-right: 1px solid #fef9c3;
    }

    .meta-rule-card strong {
      color: #854d0e;
      font-weight: 700;
    }

    /* Slide Footer */
    .slide-footer {
      padding: 12px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(212, 175, 55, 0.2);
      background: #fafaf9;
      font-size: 12.5px;
      color: #4b5563;
      flex-wrap: wrap;
      gap: 10px;
    }

    .source-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #ecfdf5;
      color: #04432c;
      padding: 4px 12px;
      border-radius: 6px;
      border: 1px solid #a7f3d0;
      font-weight: 600;
    }

    .footer-brand-credit {
      font-weight: 700;
      color: #04432c;
    }

    /* Floating Navigation Controls */
    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(2, 41, 27, 0.9);
      color: #fef08a;
      border: 2px solid var(--gold-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      cursor: pointer;
      transition: all 0.25s ease;
      z-index: 20;
      box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    }
    .nav-arrow:hover {
      background: #04432c;
      transform: translateY(-50%) scale(1.08);
      color: #fff;
      border-color: #ffd700;
    }
    .nav-prev { left: 24px; }
    .nav-next { right: 24px; }

    /* Bottom Control Bar */
    .bottom-bar {
      background: linear-gradient(180deg, #02291b 0%, #011810 100%);
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      border-top: 1.5px solid var(--gold-primary);
      box-shadow: 0 -4px 20px rgba(0,0,0,0.4);
      flex-wrap: wrap;
      gap: 12px;
      z-index: 100;
    }

    .bottom-left-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .slide-select-dropdown {
      background: #04432c;
      color: #fef08a;
      border: 1px solid var(--gold-primary);
      border-radius: 6px;
      padding: 6px 14px;
      font-family: 'Hind Siliguri', sans-serif;
      font-size: 13.5px;
      font-weight: 600;
      outline: none;
      cursor: pointer;
      max-width: 360px;
    }

    .slide-counter-badge {
      font-weight: 700;
      color: #fef08a;
      min-width: 80px;
      text-align: right;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.4);
      padding: 4px 10px;
      border-radius: 12px;
      border: 1px solid rgba(212, 175, 55, 0.35);
    }

    /* Modal Grid (সূচিপত্র) */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(1, 24, 16, 0.88);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 20px;
      backdrop-filter: blur(6px);
    }

    .modal-content {
      background: #f8fafc;
      width: 100%;
      max-width: 960px;
      max-height: 85vh;
      border-radius: 14px;
      border: 2px solid var(--gold-primary);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(0,0,0,0.7);
    }

    .modal-header {
      background: linear-gradient(180deg, #02291b 0%, #011810 100%);
      color: #fef08a;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid var(--gold-primary);
    }

    .modal-search {
      padding: 12px 24px;
      background: #fff;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      gap: 12px;
    }

    .search-input {
      flex: 1;
      padding: 9px 16px;
      border-radius: 6px;
      border: 1.5px solid #cbd5e1;
      background: #fff;
      color: var(--text-main);
      font-family: 'Hind Siliguri', sans-serif;
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;
    }
    .search-input:focus {
      border-color: #04432c;
      box-shadow: 0 0 0 3px rgba(4, 67, 44, 0.2);
    }

    .modal-grid {
      padding: 20px 24px;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 14px;
    }

    .grid-item {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px;
      cursor: pointer;
      transition: all 0.25s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
    }
    .grid-item:hover {
      border-color: #04432c;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(4, 67, 44, 0.12);
    }

    .grid-item.kalima-item {
      border-left: 5px solid #d4af37;
      background: #fffdf5;
    }

    .grid-item-no {
      font-size: 11.5px;
      font-weight: 700;
      color: #04432c;
      margin-bottom: 4px;
    }

    .grid-item-title {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 8px;
      line-height: 1.35;
    }

    .grid-item-arabic {
      font-family: 'Scheherazade New', serif;
      font-size: 16px;
      color: #065f3e;
      direction: rtl;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Toast Notification */
    .toast {
      position: fixed;
      bottom: 75px;
      right: 24px;
      background: #02291b;
      color: #fef08a;
      border: 1.5px solid var(--gold-primary);
      padding: 12px 22px;
      border-radius: 8px;
      font-size: 13.5px;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      z-index: 1000;
      opacity: 0;
      transform: translateY(12px);
      transition: all 0.3s ease;
      pointer-events: none;
    }
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    /* Responsive Styling */
    @media (max-width: 820px) {
      .top-bar { padding: 8px 14px; }
      .org-title-group h1 { font-size: 14px; }
      .org-title-group p { font-size: 10px; }
      .slide-card { min-height: 480px; }
      .slide-header { padding: 12px 16px; }
      .slide-header-title { font-size: 15px; }
      .slide-body { padding: 18px 20px; }
      .arabic-text { font-size: 28px !important; }
      .meaning-text { font-size: 18px !important; }
      .pronunciation-pill { font-size: 14px !important; }
      .nav-arrow { display: none; }
      .bottom-bar { justify-content: center; }
      .slide-select-dropdown { max-width: 100%; width: 100%; }
    }
  </style>
</head>
<body>

  <!-- Top Bar -->
  <header class="top-bar">
    <div class="org-brand" onclick="resetToFirst()" title="প্রথম স্লাইডে ফিরে যান">
      <img src="${logoB64}" alt="মারকাযুল ঈমান" class="org-logo-mini">
      <div class="org-title-group">
        <h1>নূরানী মাসনূন দু'আ ও কালিমাহ্</h1>
        <p>মারকাযুল ঈমান - দাওয়াহ্ বিভাগ | নূরানী পদ্ধতিতে কুরআন শিক্ষা অনুযায়ী</p>
      </div>
    </div>

    <div class="toolbar-actions">
      <!-- Dedicated Special Kalima Button -->
      <button class="btn btn-kalima-special" id="topKalimaBtn" onclick="switchToKalima()" title="কিতাবের ৬টি মৌলিক কালিমাহ্ দেখুন">
        <span>📜 কালিমাহ্ (মৌলিক ঈমান)</span>
      </button>

      <button class="btn btn-gold" onclick="openGridModal()">
        <span>📑 সূচিপত্র</span>
      </button>

      <button class="btn btn-gold" onclick="downloadPDF()" title="সম্পূর্ণ দু'আ ও কালিমাহ্ বই PDF হিসেবে ডাউনলোড / প্রিন্ট করুন">
        <span>📄 PDF ডাউনলোড</span>
      </button>

      <button class="btn" onclick="copyCurrentSlideText()" title="আরবী ও অর্থ কপি করুন">
        <span>📋 কপি</span>
      </button>

      <div class="font-control-group">
        <label for="fontSelect">আরবী ফন্ট:</label>
        <select id="fontSelect" onchange="changeArabicFont(this.value)">
          <option value="'Scheherazade New', serif">Scheherazade</option>
          <option value="'Amiri', serif">Amiri</option>
          <option value="'Noto Naskh Arabic', serif">Noto Naskh</option>
          <option value="'Lateef', serif">Lateef</option>
          <option value="'Harmattan', sans-serif">Harmattan</option>
        </select>
        <button class="size-btn" onclick="changeFontSize(-2)" title="ফন্ট ছোট করুন">-</button>
        <button class="size-btn" onclick="changeFontSize(2)" title="ফন্ট বড় করুন">+</button>
      </div>

      <button class="btn" onclick="toggleFullscreen()">
        <span id="fsIcon">⛶ ফুলস্ক্রিন</span>
      </button>
    </div>
  </header>

  <!-- Main Slide Stage -->
  <main class="slide-stage" id="slideStage">
    <button class="nav-arrow nav-prev" onclick="navigateSlide(-1)" title="পূর্ববর্তী স্লাইড (বাম তীর / Left Arrow)">❮</button>

    <!-- PREMIUM SLIDE CARD -->
    <div class="slide-card" id="slideCard">
      <!-- Card Header -->
      <div class="slide-header">
        <div class="slide-header-left">
          <span class="badge-number" id="cardBadgeNum">মাসনূন দু'আ</span>
          <span class="badge-cat" id="cardBadgeCat">ক্যাটাগরি</span>
          <span class="badge-page" id="cardBadgePage">পৃষ্ঠা</span>
        </div>
        <div class="slide-header-title" id="cardTitle">শিরোনাম</div>
      </div>

      <!-- Slide Body (Spacious & Clean) -->
      <div class="slide-body">
        <!-- Arabic Calligraphy -->
        <div class="arabic-wrapper">
          <div class="arabic-text" id="cardArabic">اَللّٰهُمَّ</div>
        </div>

        <!-- Clean Pronunciation Pill -->
        <div class="pronunciation-pill" id="cardPronunciation"></div>

        <!-- Bold Meaning -->
        <div class="meaning-container">
          <div class="meaning-text" id="cardMeaning"></div>
        </div>

        <!-- Meta Info Cards (Only when available) -->
        <div class="meta-cards-group" id="cardMetaGroup">
          <div class="meta-info-card" id="cardFazeelatBox" style="display:none;">
            <strong>✨ ফযীলত ও তা'লীম:</strong> <span id="cardFazeelat"></span>
          </div>
          <div class="meta-rule-card" id="cardRuleBox" style="display:none;">
            <strong>📌 আমলের নিয়ম:</strong> <span id="cardRule"></span>
          </div>
        </div>
      </div>

      <!-- Slide Footer -->
      <div class="slide-footer">
        <div>
          <span class="source-badge">
            <span>📚 উৎস ও সনদ:</span>
            <span id="cardSource" style="font-weight: 500;">নূরানী পদ্ধতিতে কুরআন শিক্ষা</span>
          </span>
        </div>
        <div>
          <span class="footer-brand-credit">মারকাযুল ঈমান দাওয়াহ্ বিভাগ</span>
        </div>
      </div>
    </div>

    <button class="nav-arrow nav-next" onclick="navigateSlide(1)" title="পরবর্তী স্লাইড (ডান তীর / Right Arrow)">❯</button>
  </main>

  <!-- Bottom Navigation Bar -->
  <footer class="bottom-bar">
    <div class="bottom-left-group">
      <button class="btn" onclick="navigateSlide(-1)">◀ পূর্ববর্তী</button>
      <button class="btn btn-gold" onclick="navigateSlide(1)">পরবর্তী ▶</button>
      <button class="btn btn-kalima-special" onclick="switchToKalima()">📜 কালিমাহ্</button>
    </div>

    <div style="display:flex; align-items:center; gap:12px;">
      <select id="slideSelect" class="slide-select-dropdown" onchange="jumpToFilteredIndex(parseInt(this.value))">
        <!-- Populated dynamically -->
      </select>
      <span id="slideStatus" class="slide-counter-badge">১ / ৬৭</span>
    </div>
  </footer>

  <!-- Modal Grid (সূচিপত্র) -->
  <div class="modal-overlay" id="gridModal" onclick="closeGridModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 style="font-size: 17px; color: #fef08a;">📑 সূচিপত্র (মাসনূন দু'আ ও কালিমাহ্ নির্দেশিকা)</h2>
        <button onclick="closeGridModal()" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #cbd5e1;">✕</button>
      </div>
      <div class="modal-search">
        <input type="text" id="modalSearchInput" class="search-input" placeholder="দু'আ বা কালিমার নাম, আরবী বা অর্থ দিয়ে অনুসন্ধান করুন..." oninput="renderModalGrid(this.value)">
      </div>
      <div class="modal-grid" id="modalGridContainer">
        <!-- Populated via JS -->
      </div>
    </div>
  </div>

  <div class="toast" id="toastMsg"></div>

  <!-- Raw Data Embedded -->
  <script>
    ${dataContent}

    // State Variables
    let currentCategory = 'all';
    let filteredItems = [...DUAS_AND_KALIMAS];
    let currentIndex = 0;
    let currentArabicFont = localStorage.getItem('noorani_dua_arabic_font') || "'Scheherazade New', serif";
    let currentArabicSize = parseInt(localStorage.getItem('noorani_dua_arabic_size')) || 40;

    // Initialize UI
    window.addEventListener('DOMContentLoaded', () => {
      document.getElementById('fontSelect').value = currentArabicFont;
      applyArabicStyles();
      filterByCategory('all');

      // Keyboard Controls
      window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
          navigateSlide(1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          navigateSlide(-1);
        } else if (e.key === 'f' || e.key === 'F') {
          toggleFullscreen();
        } else if (e.key === 'Escape') {
          closeGridModal();
        } else if (e.key === 'k' || e.key === 'K') {
          switchToKalima();
        } else if (e.key === 'c' || e.key === 'C') {
          copyCurrentSlideText();
        }
      });

      // Touch Swipe Support
      let touchStartX = 0;
      let touchEndX = 0;
      const stage = document.getElementById('slideStage');
      stage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      stage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          navigateSlide(1);
        } else if (touchEndX - touchStartX > 50) {
          navigateSlide(-1);
        }
      }, { passive: true });
    });

    // Dedicated Switch to Kalima function
    function switchToKalima() {
      filterByCategory('all');
      const idx = DUAS_AND_KALIMAS.findIndex(item => item.type === 'kalima');
      if (idx !== -1) {
        currentIndex = idx;
        renderSlide();
        showToast("📜 কিতাবের ৬টি মৌলিক কালিমাহ্ সেকশনে যাওয়া হয়েছে");
      }
    }

    // Reset to First Slide
    function resetToFirst() {
      filterByCategory('all');
      currentIndex = 0;
      renderSlide();
    }

    // Filter by Category
    function filterByCategory(cat) {
      currentCategory = cat;

      // Update pills
      document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.remove('active');
        if (cat === 'all' && pill.textContent === 'সবগুলো') {
          pill.classList.add('active');
        } else if (pill.textContent.includes(cat) || (cat === 'কালেমা' && pill.classList.contains('kalima-pill'))) {
          pill.classList.add('active');
        }
      });

      if (cat === 'all') {
        filteredItems = [...DUAS_AND_KALIMAS];
      } else {
        filteredItems = DUAS_AND_KALIMAS.filter(item => item.category === cat);
      }

      currentIndex = 0;
      populateDropdown();
      renderSlide();
    }

    // Populate Slide Dropdown
    function populateDropdown() {
      const select = document.getElementById('slideSelect');
      select.innerHTML = '';
      filteredItems.forEach((item, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        let prefix = '';
        if (item.type === 'kalima') prefix = 'কালিমাহ্ ' + item.no + ': ';
        else prefix = item.no ? item.no + '. ' : '';
        opt.textContent = prefix + item.title;
        select.appendChild(opt);
      });
    }

    // Render Current Slide
    function renderSlide() {
      if (filteredItems.length === 0) return;
      const item = filteredItems[currentIndex];

      // Update badges
      const badgeNum = document.getElementById('cardBadgeNum');
      if (item.type === 'kalima') {
        badgeNum.textContent = 'কালিমাহ্ ' + item.no;
        badgeNum.style.background = 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)';
        badgeNum.style.color = '#02291b';
      } else {
        badgeNum.textContent = "মাসনূন দু'আ " + item.no;
        badgeNum.style.background = 'linear-gradient(135deg, #04432c 0%, #065f3e 100%)';
        badgeNum.style.color = '#fef08a';
      }

      document.getElementById('cardBadgeCat').textContent = item.category;
      document.getElementById('cardBadgePage').textContent = 'পৃষ্ঠা: ' + item.page;
      document.getElementById('cardTitle').textContent = item.title;

      // Texts
      document.getElementById('cardArabic').textContent = item.arabic;
      document.getElementById('cardPronunciation').textContent = item.pronunciation;
      document.getElementById('cardMeaning').textContent = item.bangla;
      document.getElementById('cardSource').textContent = item.source;

      // Meta Info Cards (Fazeelat / Rules)
      const fazeelatBox = document.getElementById('cardFazeelatBox');
      const ruleBox = document.getElementById('cardRuleBox');
      const metaGroup = document.getElementById('cardMetaGroup');

      if (item.fazeelat) {
        document.getElementById('cardFazeelat').textContent = item.fazeelat;
        fazeelatBox.style.display = 'block';
      } else {
        fazeelatBox.style.display = 'none';
      }

      if (item.rule) {
        document.getElementById('cardRule').textContent = item.rule;
        ruleBox.style.display = 'block';
      } else {
        ruleBox.style.display = 'none';
      }

      if (!item.fazeelat && !item.rule) {
        metaGroup.style.display = 'none';
      } else {
        metaGroup.style.display = 'flex';
      }

      // Update footer controls
      document.getElementById('slideSelect').value = currentIndex;
      document.getElementById('slideStatus').textContent = (currentIndex + 1) + ' / ' + filteredItems.length;

      // Card animation refresh
      const card = document.getElementById('slideCard');
      card.style.animation = 'none';
      card.offsetHeight; /* trigger reflow */
      card.style.animation = 'fadeIn 0.25s ease';
    }

    // Navigation Controls
    function navigateSlide(direction) {
      if (filteredItems.length === 0) return;
      currentIndex += direction;
      if (currentIndex >= filteredItems.length) {
        currentIndex = 0;
      } else if (currentIndex < 0) {
        currentIndex = filteredItems.length - 1;
      }
      renderSlide();
    }

    function jumpToFilteredIndex(idx) {
      if (idx >= 0 && idx < filteredItems.length) {
        currentIndex = idx;
        renderSlide();
      }
    }

    function jumpToItemById(id) {
      filterByCategory('all');
      const targetIdx = DUAS_AND_KALIMAS.findIndex(item => item.id === id);
      if (targetIdx !== -1) {
        currentIndex = targetIdx;
        renderSlide();
        closeGridModal();
      }
    }

    // Copy Current Slide Text
    function copyCurrentSlideText() {
      if (filteredItems.length === 0) return;
      const item = filteredItems[currentIndex];
      const textToCopy = item.title + "\\n\\n" +
                         "আরবী:\\n" + item.arabic + "\\n\\n" +
                         "উচ্চারণ:\\n" + item.pronunciation + "\\n\\n" +
                         "অর্থ:\\n" + item.bangla + "\\n\\n" +
                         "উৎস: " + item.source + "\\n" +
                         "মারকাযুল ঈমান দাওয়াহ্ বিভাগ";
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("✅ দু'আ ও অর্থ সফলভাবে কপি করা হয়েছে!");
      }).catch(err => {
        showToast("কপি করা যায়নি: " + err);
      });
    }

    // Arabic Font & Size Controls
    function changeArabicFont(fontName) {
      currentArabicFont = fontName;
      localStorage.setItem('noorani_dua_arabic_font', fontName);
      applyArabicStyles();
    }

    function changeFontSize(delta) {
      currentArabicSize = Math.max(22, Math.min(54, currentArabicSize + delta));
      localStorage.setItem('noorani_dua_arabic_size', currentArabicSize);
      applyArabicStyles();
      showToast('আরবী ফন্ট সাইজ: ' + currentArabicSize + 'px');
    }

    function applyArabicStyles() {
      const root = document.documentElement;
      root.style.setProperty('--arabic-font', currentArabicFont);
      root.style.setProperty('--arabic-size', currentArabicSize + 'px');
    }

    // Modal Grid (সূচিপত্র)
    function openGridModal() {
      document.getElementById('modalSearchInput').value = '';
      renderModalGrid('');
      document.getElementById('gridModal').style.display = 'flex';
      setTimeout(() => document.getElementById('modalSearchInput').focus(), 100);
    }

    function closeGridModal(e) {
      if (!e || e.target.id === 'gridModal' || e.target.tagName === 'BUTTON') {
        document.getElementById('gridModal').style.display = 'none';
      }
    }

    function renderModalGrid(filterQuery) {
      const container = document.getElementById('modalGridContainer');
      container.innerHTML = '';
      const q = filterQuery.trim().toLowerCase();

      const matched = DUAS_AND_KALIMAS.filter(item => {
        if (!q) return true;
        return item.title.toLowerCase().includes(q) ||
               item.bangla.toLowerCase().includes(q) ||
               item.arabic.includes(q) ||
               item.pronunciation.toLowerCase().includes(q);
      });

      matched.forEach(item => {
        const div = document.createElement('div');
        div.className = 'grid-item' + (item.type === 'kalima' ? ' kalima-item' : '');
        div.onclick = () => jumpToItemById(item.id);

        let noStr = '';
        if (item.type === 'kalima') noStr = 'কালিমাহ্ ' + item.no;
        else noStr = "মাসনূন দু'আ " + item.no;

        div.innerHTML = \`
          <div>
            <div class="grid-item-no">\${noStr} • পৃষ্ঠা: \${item.page}</div>
            <div class="grid-item-title">\${item.title}</div>
          </div>
          <div class="grid-item-arabic">\${item.arabic}</div>
        \`;
        container.appendChild(div);
      });
    }

    // Fullscreen Toggle
    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          showToast('ফুলস্ক্রিন শুরু করা সম্ভব হয়নি: ' + err.message);
        });
        document.getElementById('fsIcon').textContent = '✕ উইন্ডো';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          document.getElementById('fsIcon').textContent = '⛶ ফুলস্ক্রিন';
        }
      }
    }

    // Toast Notification
    function showToast(msg) {
      const toast = document.getElementById('toastMsg');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }

    // PDF Download & Print Version
    function downloadPDF() {
      showToast("📄 সম্পূর্ণ দু'আ ও কালিমাহ্ বই PDF/প্রিন্ট সংস্করণ খোলা হচ্ছে...");
      window.open('slides_printable.html?print=true', '_blank');
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf-8');
console.log('Successfully generated clean, premium, spacious index.html.');
