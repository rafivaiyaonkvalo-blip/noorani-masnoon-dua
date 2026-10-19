const fs = require('fs');
const path = require('path');

const logoB64 = fs.readFileSync(path.join(__dirname, 'logo_b64.txt'), 'utf-8').trim();
const dataContent = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf-8');

const html = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>নূরানী মাসনূন দু'আ ও কালিমাহ্ - ল্যান্ডস্কেপ স্লাইড প্রিন্ট ও PDF | মারকাযুল ঈমান</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700&family=Hind+Siliguri:wght@400;500;600;700&family=Scheherazade+New:wght@400;600;700&display=swap" rel="stylesheet">
  
  <!-- Dynamic Page Orientation Style -->
  <style id="pageOrientationStyle">
    @page {
      size: A4 landscape;
      margin: 8mm 10mm;
    }
  </style>

  <style>
    :root {
      --primary: #04432c;
      --primary-dark: #02291b;
      --gold: #d4af37;
      --gold-dark: #b8860b;
      --gold-light: #fef08a;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Hind Siliguri', sans-serif;
      background: #0b1a13;
      color: #0f172a;
      padding: 20px;
      -webkit-font-smoothing: antialiased;
    }

    /* Top Floating Print Bar (Hidden in Print) */
    .print-toolbar {
      position: sticky;
      top: 12px;
      z-index: 1000;
      background: linear-gradient(135deg, #02291b 0%, #04432c 100%);
      color: #fff;
      padding: 14px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.5);
      margin: 0 auto 24px auto;
      max-width: 1100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1.5px solid var(--gold);
      flex-wrap: wrap;
      gap: 14px;
    }

    .print-toolbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .print-toolbar-logo {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      background: #fff;
      object-fit: contain;
    }

    .print-toolbar-title {
      font-size: 16px;
      font-weight: 700;
      color: #fef08a;
    }

    .print-toolbar-sub {
      font-size: 12px;
      color: #cbd5e1;
    }

    .print-toolbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    /* Mode Switcher Buttons */
    .orientation-btn-group {
      display: inline-flex;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 8px;
      padding: 3px;
      gap: 4px;
    }

    .btn-toggle {
      background: transparent;
      border: none;
      color: #cbd5e1;
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .btn-toggle.active {
      background: var(--gold);
      color: #02291b;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
    }

    .btn-print {
      background: linear-gradient(135deg, #d4af37 0%, #fef08a 50%, #b8860b 100%);
      color: #02291b;
      border: 1.5px solid #fff;
      padding: 9px 22px;
      font-size: 14.5px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      font-family: inherit;
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-print:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
    }

    .btn-back {
      background: rgba(255, 255, 255, 0.12);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 9px 16px;
      font-size: 13.5px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      font-family: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s ease;
    }

    .btn-back:hover {
      background: rgba(255, 255, 255, 0.25);
      color: #fff;
    }

    /* Helpful Tip Banner */
    .print-tip-banner {
      width: 100%;
      background: rgba(0, 0, 0, 0.35);
      border-top: 1px solid rgba(212, 175, 55, 0.25);
      padding-top: 8px;
      font-size: 12px;
      color: #a7f3d0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .print-tip-banner strong {
      color: #fef08a;
    }

    /* Container */
    #cardsContainer {
      max-width: 1100px;
      margin: 0 auto;
    }

    /* ============================================================
       LANDSCAPE MODE STYLES (Default / Presentation Slides)
       ============================================================ */
    body.mode-landscape {
      background: #071710;
    }

    /* Presentation Cover Slide */
    .mode-landscape .cover-slide {
      background: linear-gradient(135deg, #02291b 0%, #04432c 60%, #02291b 100%);
      border: 3px solid var(--gold);
      border-radius: 16px;
      padding: 40px 48px;
      text-align: center;
      color: #fff;
      margin: 0 auto 30px auto;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 540px;
      aspect-ratio: 16 / 9;
      position: relative;
    }

    .mode-landscape .cover-logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 3px solid var(--gold);
      background: #fff;
      padding: 4px;
      margin-bottom: 18px;
      box-shadow: 0 0 25px rgba(212, 175, 55, 0.6);
    }

    .mode-landscape .cover-title {
      font-size: 36px;
      font-weight: 700;
      color: #fef08a;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }

    .mode-landscape .cover-subtitle {
      font-size: 18px;
      color: #e2e8f0;
      max-width: 780px;
      line-height: 1.5;
      margin-bottom: 18px;
    }

    .mode-landscape .cover-badge {
      display: inline-block;
      background: rgba(212, 175, 55, 0.2);
      border: 1.5px solid var(--gold);
      color: #fef08a;
      padding: 6px 20px;
      border-radius: 20px;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 14px;
    }

    .mode-landscape .cover-footer {
      font-size: 14px;
      color: #a7f3d0;
      font-weight: 600;
    }

    /* Individual Landscape Slide Card */
    .mode-landscape .slide-card {
      background: #ffffff;
      border: 2.5px solid var(--primary);
      border-radius: 14px;
      padding: 20px 28px;
      margin: 0 auto 30px auto;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      aspect-ratio: 16 / 9;
      min-height: 540px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    .mode-landscape .card-header {
      border-bottom: 2px solid var(--gold);
      padding-bottom: 10px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .mode-landscape .card-brand-mini {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mode-landscape .card-logo-mini {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1px solid var(--gold);
    }

    .mode-landscape .card-brand-text {
      font-size: 12px;
      color: var(--primary);
      font-weight: 700;
    }

    .mode-landscape .card-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-dark);
      text-align: center;
      flex: 1;
    }

    .mode-landscape .card-badge {
      background: var(--primary-dark);
      color: #fef08a;
      border: 1.5px solid var(--gold);
      font-weight: 700;
      font-size: 12.5px;
      padding: 4px 12px;
      border-radius: 14px;
      white-space: nowrap;
    }

    .mode-landscape .card-content-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
    }

    .mode-landscape .card-arabic {
      font-family: 'Scheherazade New', serif;
      font-size: 30px;
      line-height: 1.85;
      text-align: center;
      direction: rtl;
      color: var(--primary-dark);
      background: #fcfdfa;
      border: 1.5px solid rgba(4, 67, 44, 0.25);
      border-radius: 10px;
      padding: 12px 20px;
      font-weight: 700;
    }

    .mode-landscape .card-box {
      padding: 9px 16px;
      border-radius: 8px;
      font-size: 14px;
      line-height: 1.6;
    }

    .mode-landscape .box-pron {
      background: #f0fdf4;
      border-left: 4.5px solid var(--primary);
      color: #064e3b;
      font-size: 14.5px;
    }

    .mode-landscape .box-meaning {
      background: #fffdf5;
      border-left: 4.5px solid var(--gold-dark);
      color: #78350f;
      font-size: 15.5px;
      font-weight: 600;
    }

    .mode-landscape .box-extra {
      background: #f8fafc;
      border-left: 4.5px solid #64748b;
      color: #1e293b;
      font-size: 13px;
    }

    .mode-landscape .card-footer {
      border-top: 1.5px solid #e2e8f0;
      padding-top: 8px;
      margin-top: 10px;
      font-size: 12px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Scaling for Long Duas in Landscape */
    .mode-landscape .slide-long .card-arabic {
      font-size: 24px;
      line-height: 1.7;
      padding: 10px 16px;
    }
    .mode-landscape .slide-long .box-pron {
      font-size: 13.5px;
      padding: 8px 14px;
    }
    .mode-landscape .slide-long .box-meaning {
      font-size: 14px;
      padding: 8px 14px;
    }

    .mode-landscape .slide-extra-long .card-arabic {
      font-size: 20px;
      line-height: 1.6;
      padding: 8px 14px;
    }
    .mode-landscape .slide-extra-long .box-pron {
      font-size: 12.5px;
      padding: 6px 12px;
      line-height: 1.45;
    }
    .mode-landscape .slide-extra-long .box-meaning {
      font-size: 13px;
      padding: 6px 12px;
      line-height: 1.45;
    }
    .mode-landscape .slide-extra-long .box-extra {
      font-size: 12px;
      padding: 6px 12px;
    }

    /* ============================================================
       PORTRAIT MODE STYLES (Booklet Flow)
       ============================================================ */
    body.mode-portrait {
      background: #f8fafc;
      color: #0f172a;
    }

    .mode-portrait .cover-slide {
      background: #fff;
      border: 2px solid var(--primary);
      border-radius: 12px;
      padding: 20px 24px;
      text-align: center;
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
      page-break-after: avoid;
    }

    .mode-portrait .cover-logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      margin-bottom: 8px;
    }

    .mode-portrait .cover-title {
      font-size: 22px;
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 4px;
    }

    .mode-portrait .cover-subtitle {
      font-size: 14px;
      color: #334155;
      font-weight: 600;
    }

    .mode-portrait .cover-badge {
      display: none;
    }

    .mode-portrait .cover-footer {
      margin-top: 8px;
      font-size: 12px;
      color: var(--primary);
      font-weight: 700;
      letter-spacing: 0.3px;
    }

    .mode-portrait .slide-card {
      background: #fff;
      border: 2px solid var(--primary);
      border-radius: 10px;
      padding: 18px 20px;
      margin-bottom: 20px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.04);
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .mode-portrait .card-header {
      border-bottom: 2px solid var(--gold);
      padding-bottom: 8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mode-portrait .card-brand-mini {
      display: none;
    }

    .mode-portrait .card-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--primary-dark);
    }

    .mode-portrait .card-badge {
      background: var(--primary-dark);
      color: #fef08a;
      border: 1px solid var(--gold);
      font-weight: 700;
      font-size: 12px;
      padding: 3px 10px;
      border-radius: 12px;
    }

    .mode-portrait .card-arabic {
      font-family: 'Scheherazade New', serif;
      font-size: 28px;
      line-height: 1.85;
      text-align: center;
      direction: rtl;
      color: var(--primary-dark);
      background: #fcfdfa;
      border: 1.5px solid rgba(4, 67, 44, 0.25);
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .mode-portrait .card-box {
      margin-bottom: 10px;
      padding: 10px 14px;
      border-radius: 6px;
      font-size: 14px;
      line-height: 1.6;
    }

    .mode-portrait .box-pron {
      background: #f0fdf4;
      border-left: 4px solid var(--primary);
      color: #064e3b;
    }

    .mode-portrait .box-meaning {
      background: #fffbeb;
      border-left: 4px solid var(--gold-dark);
      color: #78350f;
    }

    .mode-portrait .box-extra {
      background: #f8fafc;
      border-left: 4px solid #64748b;
      color: #1e293b;
      font-size: 13px;
    }

    .mode-portrait .card-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      margin-top: 10px;
      font-size: 12px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* ============================================================
       PRINT MEDIA STYLES (CRITICAL FOR PDF & PRINTER)
       ============================================================ */
    @media print {
      .print-toolbar, .no-print {
        display: none !important;
      }

      body {
        padding: 0 !important;
        margin: 0 !important;
        background: #fff !important;
        color: #000 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      #cardsContainer {
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      /* Landscape Print Rules: EXACTLY 1 SLIDE PER PAGE */
      body.mode-landscape .cover-slide {
        width: 100% !important;
        max-width: 100% !important;
        height: 188mm !important;
        min-height: 188mm !important;
        max-height: 192mm !important;
        aspect-ratio: auto !important;
        page-break-after: always !important;
        break-after: page !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        border: 2.5px solid #04432c !important;
        box-shadow: none !important;
        margin: 0 !important;
        padding: 30px !important;
        background: linear-gradient(135deg, #02291b 0%, #04432c 60%, #02291b 100%) !important;
      }

      body.mode-landscape .slide-card {
        width: 100% !important;
        max-width: 100% !important;
        height: 188mm !important;
        min-height: 188mm !important;
        max-height: 192mm !important;
        aspect-ratio: auto !important;
        page-break-after: always !important;
        break-after: page !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        border: 2px solid #04432c !important;
        border-radius: 8px !important;
        box-shadow: none !important;
        margin: 0 !important;
        padding: 14px 20px !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
      }

      body.mode-landscape .slide-card.slide-extra-long {
        height: auto !important;
        min-height: 188mm !important;
        max-height: none !important;
      }

      body.mode-landscape .card-arabic {
        background: #fff !important;
        border: 1px solid #94a3b8 !important;
      }

      /* Portrait Print Rules */
      body.mode-portrait .cover-slide {
        border: 2px solid #000 !important;
        box-shadow: none !important;
        page-break-after: avoid !important;
        break-after: avoid !important;
        margin-bottom: 16px !important;
      }

      body.mode-portrait .slide-card {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        box-shadow: none !important;
        border: 1.5px solid #04432c !important;
        margin-bottom: 14px !important;
        padding: 14px 18px !important;
      }

      body.mode-portrait .card-arabic {
        background: #fff !important;
        border: 1px solid #94a3b8 !important;
      }
    }
  </style>
</head>
<body class="mode-landscape">

  <!-- Top Floating Print Controls (Hidden on Print) -->
  <div class="print-toolbar">
    <div class="print-toolbar-brand">
      <img src="${logoB64}" alt="মারকাযুল ঈমান" class="print-toolbar-logo">
      <div>
        <div class="print-toolbar-title">নূরানী মাসনূন দু'আ ও কালিমাহ্ (স্লাইড ও PDF সংস্করণ)</div>
        <div class="print-toolbar-sub">মারকাযুল ঈমান দাওয়াহ্ বিভাগ | নূরানী পদ্ধতিতে কুরআন শিক্ষা</div>
      </div>
    </div>

    <div class="print-toolbar-actions">
      <!-- Orientation Switcher -->
      <div class="orientation-btn-group" title="প্রিন্ট ও ভিউয়ের ধরন নির্বাচন করুন">
        <button id="btnModeLandscape" class="btn-toggle active" onclick="setOrientation('landscape')">
          🖥️ ল্যান্ডস্কেপ স্লাইড (ডিফল্ট)
        </button>
        <button id="btnModePortrait" class="btn-toggle" onclick="setOrientation('portrait')">
          📖 পোর্ট্রেট বুক
        </button>
      </div>

      <button id="printActionBtn" class="btn-print" onclick="window.print()">
        🖨️ ল্যান্ডস্কেপ PDF সংরক্ষণ / প্রিন্ট
      </button>

      <a href="index.html" class="btn-back">⬅️ মূল স্লাইড অ্যাপে ফিরুন</a>
    </div>

    <div class="print-tip-banner">
      <span id="helperTipText">💡 <strong>ল্যান্ডস্কেপ টিপ:</strong> ব্রাউজারের প্রিন্ট ডায়ালগে Destination: <strong>"Save as PDF"</strong> এবং Layout: <strong>"Landscape"</strong> সিলেক্ট করুন।</span>
      <span>সর্বমোট ৬১টি দু'আ + ৬টি কালিমাহ্ = ৬৭টি স্লাইড</span>
    </div>
  </div>

  <div id="cardsContainer"></div>

  <script>
    ${dataContent}

    function setOrientation(mode) {
      const styleEl = document.getElementById('pageOrientationStyle');
      const btnLandscape = document.getElementById('btnModeLandscape');
      const btnPortrait = document.getElementById('btnModePortrait');
      const printActionBtn = document.getElementById('printActionBtn');
      const helperTip = document.getElementById('helperTipText');

      if (mode === 'landscape') {
        document.body.classList.remove('mode-portrait');
        document.body.classList.add('mode-landscape');
        styleEl.textContent = \`
          @page {
            size: A4 landscape;
            margin: 8mm 10mm;
          }
        \`;
        btnLandscape.classList.add('active');
        btnPortrait.classList.remove('active');
        printActionBtn.innerHTML = '🖨️ ল্যান্ডস্কেপ PDF সংরক্ষণ / প্রিন্ট';
        helperTip.innerHTML = '💡 <strong>ল্যান্ডস্কেপ টিপ:</strong> ব্রাউজারের প্রিন্ট ডায়ালগে Destination: <strong>"Save as PDF"</strong> এবং Layout: <strong>"Landscape"</strong> সিলেক্ট করুন।';
      } else {
        document.body.classList.remove('mode-landscape');
        document.body.classList.add('mode-portrait');
        styleEl.textContent = \`
          @page {
            size: A4 portrait;
            margin: 12mm 14mm;
          }
        \`;
        btnPortrait.classList.add('active');
        btnLandscape.classList.remove('active');
        printActionBtn.innerHTML = '🖨️ পোর্ট্রেট বুক প্রিন্ট / PDF সংরক্ষণ';
        helperTip.innerHTML = '💡 <strong>পোর্ট্রেট টিপ:</strong> ব্রাউজারের প্রিন্ট ডায়ালগে Destination: <strong>"Save as PDF"</strong> এবং Layout: <strong>"Portrait"</strong> সিলেক্ট করুন।';
      }
      try {
        localStorage.setItem('noorani_print_orientation', mode);
      } catch (e) {}
    }

    const container = document.getElementById('cardsContainer');

    // 1. Cover / Title Slide
    const coverSlide = document.createElement('div');
    coverSlide.className = 'cover-slide';
    coverSlide.innerHTML = \`
      <img src="${logoB64}" alt="মারকাযুল ঈমান" class="cover-logo">
      <h1 class="cover-title">নূরানী মাসনূন দু'আ ও কালিমাহ্</h1>
      <p class="cover-subtitle">আল্লামা কারী বেলায়েত হুসাইন (রহ.) প্রণীত মূল 'নূরানী পদ্ধতিতে কুরআন শিক্ষা' কিতাব অনুযায়ী</p>
      <div class="cover-badge">সর্বমোট ৬১টি মাসনূন দু'আ ও ৬টি মৌলিক কালিমাহ্</div>
      <div class="cover-footer">মারকাযুল ঈমান - দাওয়াহ্ বিভাগ | ডিজিটাল স্লাইড ও প্রেজেন্টেশন সংস্করণ</div>
    \`;
    container.appendChild(coverSlide);

    // 2. All 67 Slides
    DUAS_AND_KALIMAS.forEach((item, idx) => {
      const card = document.createElement('div');
      
      // Dynamic Length Sizing
      const arLen = item.arabic.length;
      const bnLen = (item.bangla || '').length;
      let lengthClass = 'slide-standard';
      if (arLen > 300 || bnLen > 400) {
        lengthClass = 'slide-extra-long';
      } else if (arLen > 180 || bnLen > 250) {
        lengthClass = 'slide-long';
      }

      card.className = 'slide-card ' + lengthClass;

      let badgeText = '';
      if (item.type === 'kalima') badgeText = 'কালিমাহ্ ' + item.no;
      else badgeText = "দু'আ " + item.no;

      let extraHtml = '';
      if (item.fazeelat) {
        extraHtml += '<div class="card-box box-extra"><strong>ফযীলত:</strong> ' + item.fazeelat + '</div>';
      }
      if (item.rule) {
        extraHtml += '<div class="card-box box-extra" style="border-left-color: var(--primary);"><strong>আমলের নিয়ম:</strong> ' + item.rule + '</div>';
      }

      card.innerHTML = \`
        <div class="card-header">
          <div class="card-brand-mini">
            <img src="${logoB64}" alt="মারকাযুল ঈমান" class="card-logo-mini">
            <span class="card-brand-text">মারকাযুল ঈমান</span>
          </div>
          <div class="card-title">\${item.title}</div>
          <div class="card-badge">\${badgeText} • পৃষ্ঠা: \${item.page}</div>
        </div>

        <div class="card-content-body">
          <div class="card-arabic">\${item.arabic}</div>
          <div class="card-box box-pron"><strong>বাংলা উচ্চারণ:</strong> \${item.pronunciation}</div>
          <div class="card-box box-meaning"><strong>বাংলা অর্থ:</strong> \${item.bangla}</div>
          \${extraHtml}
        </div>

        <div class="card-footer">
          <span><strong>উৎস:</strong> \${item.source}</span>
          <span>মারকাযুল ঈমান দাওয়াহ্ বিভাগ | নূরানী পদ্ধতিতে কুরআন শিক্ষা</span>
        </div>
      \`;
      container.appendChild(card);
    });

    // Check query params on load
    const urlParams = new URLSearchParams(window.location.search);
    const orientParam = urlParams.get('orientation') || localStorage.getItem('noorani_print_orientation') || 'landscape';
    setOrientation(orientParam);

    if (urlParams.get('print') === 'true') {
      window.addEventListener('load', () => {
        setTimeout(() => {
          window.print();
        }, 700);
      });
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'slides_printable.html'), html, 'utf-8');
console.log('Successfully generated landscape-first slides_printable.html');
