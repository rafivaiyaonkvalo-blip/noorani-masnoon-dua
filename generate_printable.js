const fs = require('fs');
const path = require('path');

const logoB64 = fs.readFileSync(path.join(__dirname, 'logo_b64.txt'), 'utf-8').trim();
const dataContent = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf-8');

const html = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>নূরানী মাসনূন দু'আ ও কালিমাহ্ - প্রিন্ট সংস্করণ | মারকাযুল ঈমান</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700&family=Hind+Siliguri:wght@400;500;600;700&family=Scheherazade+New:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Hind Siliguri', sans-serif;
      background: #fdfaf3;
      color: #1a0f05;
      padding: 16px;
    }
    .print-btn-bar {
      text-align: center;
      margin-bottom: 20px;
    }
    .print-btn {
      background: #8b5a12;
      color: #fff;
      border: 1px solid #ffd700;
      padding: 10px 24px;
      font-size: 15px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      font-family: inherit;
    }
    .print-btn:hover {
      background: #a86f18;
    }
    @media print {
      .print-btn-bar { display: none; }
      body { padding: 0; background: #fff; }
      .slide-card { page-break-after: always; box-shadow: none !important; border: 2px solid #8f601e !important; }
    }
    .slide-card {
      background: #fdf7e9;
      border: 2px double #8f601e;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 24px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.06);
    }
    .card-header {
      border-bottom: 2px solid #c59b27;
      padding-bottom: 8px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-title {
      font-size: 18px;
      font-weight: 700;
      color: #633c0d;
    }
    .card-badge {
      background: #8b1810;
      color: #ffe6ba;
      font-weight: 700;
      font-size: 12px;
      padding: 3px 10px;
      border-radius: 12px;
    }
    .card-arabic {
      font-family: 'Scheherazade New', serif;
      font-size: 30px;
      line-height: 1.8;
      text-align: center;
      direction: rtl;
      color: #0b3d22;
      background: #fff;
      border: 1.5px solid #8c5b20;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 14px;
    }
    .card-box {
      margin-bottom: 10px;
      padding: 10px 14px;
      border-radius: 6px;
      font-size: 14px;
      line-height: 1.6;
    }
    .box-pron {
      background: #f4f8ee;
      border-left: 4px solid #4a7c29;
    }
    .box-meaning {
      background: #fff9ed;
      border-left: 4px solid #b85d18;
    }
    .box-fazeelat {
      background: #f0fdf4;
      border-left: 4px solid #059669;
      color: #064e3b;
      font-size: 13px;
    }
    .card-footer {
      border-top: 1px solid #d4c29d;
      padding-top: 8px;
      margin-top: 12px;
      font-size: 11.5px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="print-btn-bar">
    <button class="print-btn" onclick="window.print()">🖨️ প্রিন্ট করুন বা PDF হিসেবে সংরক্ষণ করুন</button>
  </div>
  <div id="cardsContainer"></div>

  <script>
    ${dataContent}

    const container = document.getElementById('cardsContainer');
    DUAS_AND_KALIMAS.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'slide-card';

      let badgeText = '';
      if (item.type === 'kalima') badgeText = 'কালিমাহ্ ' + item.no;
      else if (item.type === 'salam') badgeText = 'সালাম ও মুসাফাহা';
      else badgeText = "দু'আ " + item.no;

      let extraHtml = '';
      if (item.fazeelat) {
        extraHtml += '<div class="card-box box-fazeelat"><strong>ফযীলত:</strong> ' + item.fazeelat + '</div>';
      }
      if (item.rule) {
        extraHtml += '<div class="card-box box-fazeelat" style="background:#faf5ff; border-left-color:#8b5cf6;"><strong>আমলের নিয়ম:</strong> ' + item.rule + '</div>';
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
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'slides_printable.html'), html, 'utf-8');
console.log('Successfully generated slides_printable.html');
