const fs = require('fs');
const path = require('path');

const logoB64 = fs.readFileSync(path.join(__dirname, 'logo_b64.txt'), 'utf-8').trim();
const dataContent = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf-8');

const html = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>নূরানী মাসনূন দু'আ ও কালিমাহ্ - প্রিন্ট ও PDF সংস্করণ | মারকাযুল ঈমান</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700&family=Hind+Siliguri:wght@400;500;600;700&family=Scheherazade+New:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #04432c;
      --primary-dark: #02291b;
      --gold: #d4af37;
      --gold-dark: #b8860b;
    }

    @page {
      size: A4 portrait;
      margin: 12mm 14mm;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Hind Siliguri', sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 20px;
      -webkit-font-smoothing: antialiased;
    }

    /* Top Floating Print Bar (Hidden in Print) */
    .print-toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: linear-gradient(135deg, #02291b 0%, #04432c 100%);
      color: #fff;
      padding: 12px 24px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid rgba(212, 175, 55, 0.4);
    }

    .print-toolbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .print-toolbar-logo {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1.5px solid var(--gold);
      background: #fff;
    }

    .print-toolbar-title {
      font-size: 15px;
      font-weight: 700;
      color: #fef08a;
    }

    .print-toolbar-sub {
      font-size: 11.5px;
      color: #cbd5e1;
    }

    .print-toolbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-print {
      background: linear-gradient(135deg, #d4af37 0%, #fef08a 50%, #b8860b 100%);
      color: #02291b;
      border: 1px solid #fff;
      padding: 9px 20px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      font-family: inherit;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      transition: transform 0.15s ease;
    }

    .btn-print:hover {
      transform: translateY(-1px);
    }

    .btn-back {
      background: rgba(255, 255, 255, 0.12);
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 9px 16px;
      font-size: 13.5px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      font-family: inherit;
      text-decoration: none;
      display: inline-block;
    }

    .btn-back:hover {
      background: rgba(255, 255, 255, 0.22);
      color: #fff;
    }

    /* Printable Book Header */
    .book-header {
      background: #fff;
      border: 2px solid var(--primary);
      border-radius: 12px;
      padding: 20px 24px;
      text-align: center;
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
      page-break-after: avoid;
    }

    .book-logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      margin-bottom: 8px;
    }

    .book-title {
      font-size: 22px;
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 4px;
    }

    .book-subtitle {
      font-size: 14px;
      color: #334155;
      font-weight: 600;
    }

    .book-meta {
      margin-top: 8px;
      font-size: 12px;
      color: var(--primary);
      font-weight: 700;
      letter-spacing: 0.3px;
    }

    /* Dua Slide Card */
    .slide-card {
      background: #fff;
      border: 2px solid var(--primary);
      border-radius: 10px;
      padding: 20px 22px;
      margin-bottom: 22px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.04);
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .card-header {
      border-bottom: 2px solid var(--gold);
      padding-bottom: 8px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--primary-dark);
    }

    .card-badge {
      background: var(--primary-dark);
      color: #fef08a;
      border: 1px solid var(--gold);
      font-weight: 700;
      font-size: 12px;
      padding: 3px 10px;
      border-radius: 12px;
    }

    .card-arabic {
      font-family: 'Scheherazade New', serif;
      font-size: 30px;
      line-height: 1.85;
      text-align: center;
      direction: rtl;
      color: var(--primary-dark);
      background: #fcfdfa;
      border: 1.5px solid rgba(4, 67, 44, 0.25);
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 14px;
    }

    .card-box {
      margin-bottom: 10px;
      padding: 11px 15px;
      border-radius: 6px;
      font-size: 14px;
      line-height: 1.65;
    }

    .box-pron {
      background: #f0fdf4;
      border-left: 4px solid var(--primary);
      color: #064e3b;
    }

    .box-meaning {
      background: #fffbeb;
      border-left: 4px solid var(--gold-dark);
      color: #78350f;
    }

    .box-extra {
      background: #f8fafc;
      border-left: 4px solid #64748b;
      color: #1e293b;
      font-size: 13px;
    }

    .card-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      margin-top: 12px;
      font-size: 12px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    @media print {
      .print-toolbar { display: none !important; }
      body {
        padding: 0;
        background: #fff;
      }
      .book-header {
        border: 2px solid #000;
        box-shadow: none !important;
      }
      .slide-card {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        box-shadow: none !important;
        border: 1.5px solid #04432c !important;
        margin-bottom: 16px !important;
      }
      .card-arabic {
        background: #fff !important;
        border: 1px solid #94a3b8 !important;
      }
    }
  </style>
</head>
<body>

  <!-- Top Floating Print Controls (Hidden on Print) -->
  <div class="print-toolbar">
    <div class="print-toolbar-brand">
      <img src="${logoB64}" alt="মারকাযুল ঈমান" class="print-toolbar-logo">
      <div>
        <div class="print-toolbar-title">নূরানী মাসনূন দু'আ ও কালিমাহ্ (প্রিন্ট ও PDF সংস্করণ)</div>
        <div class="print-toolbar-sub">মারকাযুল ঈমান দাওয়াহ্ বিভাগ | নূরানী পদ্ধতিতে কুরআন শিক্ষা</div>
      </div>
    </div>
    <div class="print-toolbar-actions">
      <a href="index.html" class="btn-back">⬅️ মূল স্লাইড অ্যাপে ফিরে যান</a>
      <button class="btn-print" onclick="window.print()">🖨️ প্রিন্ট / PDF সংরক্ষণ করুন</button>
    </div>
  </div>

  <!-- Book Header -->
  <header class="book-header">
    <img src="${logoB64}" alt="মারকাযুল ঈমান" class="book-logo">
    <h1 class="book-title">নূরানী মাসনূন দু'আ ও কালিমাহ্</h1>
    <p class="book-subtitle">আল্লামা কারী বেলায়েত হুসাইন (রহ.) প্রণীত মূল 'নূরানী পদ্ধতিতে কুরআন শিক্ষা' কিতাব অনুযায়ী</p>
    <div class="book-meta">মারকাযুল ঈমান - দাওয়াহ্ বিভাগ | সর্বমোট ৬১টি মাসনূন দু'আ ও ৬টি মৌলিক কালিমাহ্</div>
  </header>

  <div id="cardsContainer"></div>

  <script>
    ${dataContent}

    const container = document.getElementById('cardsContainer');
    DUAS_AND_KALIMAS.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'slide-card';

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
          <span class="card-badge">\${badgeText} (পৃষ্ঠা: \${item.page})</span>
          <span class="card-title">\${item.title}</span>
        </div>
        <div class="card-arabic">\${item.arabic}</div>
        <div class="card-box box-pron"><strong>বাংলা উচ্চারণ:</strong><br>\${item.pronunciation}</div>
        <div class="card-box box-meaning"><strong>বাংলা অর্থ:</strong><br>\${item.bangla}</div>
        \${extraHtml}
        <div class="card-footer">
          <span><strong>উৎস:</strong> \${item.source}</span>
          <span>মারকাযুল ঈমান দাওয়াহ্ বিভাগ</span>
        </div>
      \`;
      container.appendChild(card);
    });

    // Auto-trigger print dialog if requested via ?print=true
    if (window.location.search.includes('print=true')) {
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
console.log('Successfully generated slides_printable.html');
