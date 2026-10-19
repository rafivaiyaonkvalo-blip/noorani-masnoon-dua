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
  
  <!-- PPTXGenJS for 1-click PowerPoint export -->
  <script src="https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js"></script>

  <style>
    :root {
      /* Official Markazul Iman Signature Brand Palette */
      --primary: #04432c;
      --primary-dark: #02291b;
      --primary-deep: #011a11;
      --primary-light: #065f3e;
      --primary-surface: #0a4f35;
      
      --accent-gold: #c69214;
      --accent-gold-light: #f59e0b;
      --accent-gold-bright: #ffd700;
      --gold-gradient: linear-gradient(135deg, #d4af37 0%, #fef08a 50%, #b8860b 100%);
      --gold-border: #d4af37;
      
      --bg-cream: #fdfbf7;
      --bg-card: #ffffff;
      --text-dark: #111827;
      --text-muted: #374151;
      --text-light-green: #a7f3d0;
      
      --arabic-font: 'Scheherazade New', serif;
      --arabic-size: 38px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Hind Siliguri', sans-serif;
      background-color: var(--primary-deep);
      background-image: 
        radial-gradient(circle at 50% 25%, #053b26 0%, #01140c 100%),
        repeating-linear-gradient(45deg, rgba(212, 175, 55, 0.02) 0px, rgba(212, 175, 55, 0.02) 2px, transparent 2px, transparent 18px);
      color: var(--text-dark);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      position: relative;
    }

    /* Subtle Islamic Geometric Medallion in Background */
    body::before {
      content: "";
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, transparent 40%, rgba(212, 175, 55, 0.025) 41%, transparent 42%),
                  radial-gradient(circle, transparent 70%, rgba(212, 175, 55, 0.02) 71%, transparent 72%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
    }

    /* Top Control Bar (Markazul Iman Emerald & Gold) */
    .top-bar {
      background: linear-gradient(180deg, #02291b 0%, #011810 100%);
      color: #fff;
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid var(--gold-border);
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      z-index: 100;
      flex-wrap: wrap;
      gap: 12px;
      position: relative;
    }

    .top-bar::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, #fef08a 50%, transparent 100%);
      opacity: 0.6;
    }

    .org-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      user-select: none;
    }

    .org-logo-wrapper {
      position: relative;
      width: 44px;
      height: 44px;
    }

    .org-logo-mini {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #fff;
      object-fit: contain;
      padding: 2px;
      border: 2px solid var(--gold-border);
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
    }

    .org-title-group h1 {
      font-size: 16px;
      font-weight: 700;
      color: #f3e5ab;
      line-height: 1.25;
      text-shadow: 0 1px 3px rgba(0,0,0,0.6);
      letter-spacing: 0.3px;
    }

    .org-title-group p {
      font-size: 11px;
      color: var(--text-light-green);
      letter-spacing: 0.2px;
      opacity: 0.9;
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
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
      border: 1px solid rgba(212, 175, 55, 0.4);
      transition: all 0.25s ease;
      text-decoration: none;
      color: #fff;
      background: rgba(255, 255, 255, 0.12);
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.22);
      border-color: #fef08a;
      color: #fef08a;
      transform: translateY(-1px);
    }

    /* Dedicated Special Kalima Button (Markazul Iman Radiant Gold) */
    .btn-kalima-special {
      background: linear-gradient(135deg, #ffd700 0%, #d4af37 50%, #a87910 100%);
      color: #02291b !important;
      font-weight: 700;
      border: 1.5px solid #fff2a8;
      box-shadow: 0 0 14px rgba(212, 175, 55, 0.6), inset 0 1px 0 rgba(255,255,255,0.8);
      position: relative;
      animation: goldPulse 2.8s infinite;
      letter-spacing: 0.2px;
    }

    .btn-kalima-special:hover {
      background: linear-gradient(135deg, #fff2a8 0%, #ffd700 50%, #b8860b 100%);
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 0 22px rgba(255, 215, 0, 0.85);
      color: #02291b !important;
    }

    @keyframes goldPulse {
      0% { box-shadow: 0 0 8px rgba(212, 175, 55, 0.4); }
      50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.85); }
      100% { box-shadow: 0 0 8px rgba(212, 175, 55, 0.4); }
    }

    .btn-gold {
      background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
      border-color: #fef08a;
      color: #02291b;
      font-weight: 700;
    }
    .btn-gold:hover {
      background: linear-gradient(135deg, #fef08a 0%, #d4af37 100%);
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
      border: 1px solid rgba(212, 175, 55, 0.4);
    }

    .font-control-group label {
      font-size: 11px;
      color: #a7f3d0;
      font-weight: 500;
    }

    .font-control-group select {
      background: #04432c;
      color: #fff;
      border: 1px solid var(--gold-border);
      border-radius: 4px;
      padding: 3px 8px;
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
      background: var(--gold-border);
      color: #02291b;
    }

    /* Category Navigation Ribbon (Markazul Iman Emerald Bar) */
    .category-bar {
      background: linear-gradient(180deg, #033221 0%, #022417 100%);
      padding: 8px 24px;
      display: flex;
      align-items: center;
      gap: 10px;
      overflow-x: auto;
      white-space: nowrap;
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
      scrollbar-width: thin;
      scrollbar-color: var(--primary-light) transparent;
      z-index: 10;
    }

    .category-bar::-webkit-scrollbar {
      height: 5px;
    }
    .category-bar::-webkit-scrollbar-thumb {
      background: var(--primary-light);
      border-radius: 4px;
    }

    .category-pill {
      background: rgba(2, 41, 27, 0.65);
      color: #cbd5e1;
      border: 1px solid rgba(212, 175, 55, 0.3);
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    }

    .category-pill:hover {
      background: rgba(6, 95, 62, 0.85);
      color: #fff;
      border-color: var(--gold-border);
    }

    .category-pill.active {
      background: var(--gold-gradient);
      color: #02291b;
      font-weight: 700;
      border-color: #fff2a8;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
    }

    .category-pill.kalima-pill {
      background: linear-gradient(135deg, #c69214 0%, #8b6508 100%);
      color: #fff;
      font-weight: 600;
      border-color: #fef08a;
      box-shadow: 0 0 8px rgba(212, 175, 55, 0.3);
    }
    .category-pill.kalima-pill:hover {
      background: linear-gradient(135deg, #dfa528 0%, #a87910 100%);
      color: #fff;
      border-color: #ffd700;
    }
    .category-pill.kalima-pill.active {
      background: linear-gradient(135deg, #ffd700 0%, #dfa528 100%);
      color: #02291b;
      font-weight: 700;
      border-color: #fff;
      box-shadow: 0 0 14px rgba(255, 215, 0, 0.7);
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

    /* MARKAZUL IMAN SLIDE CARD */
    .slide-card {
      width: 100%;
      max-width: 1060px;
      min-height: 580px;
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      position: relative;
      animation: fadeIn 0.3s ease;
      
      background-color: var(--bg-cream);
      background-image: 
        radial-gradient(ellipse at 50% 50%, #ffffff 0%, #fdfbf7 75%, #f7f2e7 100%);
      box-shadow: 
        0 25px 60px rgba(0, 0, 0, 0.55),
        0 4px 15px rgba(0, 0, 0, 0.3);
      border: 2px solid var(--gold-border);
      outline: 1.5px dashed rgba(198, 146, 20, 0.35);
      outline-offset: -7px;
      overflow: hidden;
    }

    /* Elegant Islamic Corner Ornaments */
    .slide-card::before {
      content: "❖";
      position: absolute;
      top: 10px;
      left: 14px;
      font-size: 16px;
      color: #c69214;
      opacity: 0.85;
      z-index: 2;
      pointer-events: none;
    }
    .slide-card::after {
      content: "❖";
      position: absolute;
      top: 10px;
      right: 14px;
      font-size: 16px;
      color: #c69214;
      opacity: 0.85;
      z-index: 2;
      pointer-events: none;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Card Header (Deep Markazul Iman Emerald & Gold Ribbon) */
    .slide-header {
      background: linear-gradient(135deg, #02291b 0%, #04432c 60%, #065f3e 100%);
      color: #fff;
      padding: 14px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid var(--gold-border);
      position: relative;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }

    .slide-header::after {
      content: "";
      position: absolute;
      bottom: -3px;
      left: 0;
      right: 0;
      height: 1.5px;
      background: linear-gradient(90deg, transparent, #fef08a, transparent);
    }

    .slide-badges {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    /* Gold Number Badge */
    .badge-number {
      background: var(--gold-gradient);
      color: #02291b;
      font-weight: 700;
      font-size: 13px;
      padding: 5px 14px;
      border-radius: 20px;
      border: 1px solid #fff2a8;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .badge-cat {
      background: rgba(255, 255, 255, 0.15);
      color: #a7f3d0;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.25);
    }

    .badge-page {
      background: rgba(212, 175, 55, 0.2);
      color: #fef08a;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 10px;
      border: 1px solid rgba(212, 175, 55, 0.4);
    }

    .slide-header-title {
      font-size: 19px;
      font-weight: 700;
      color: #fef08a;
      text-align: right;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      letter-spacing: 0.3px;
    }

    /* Card Body */
    .slide-body {
      padding: 26px 32px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 18px;
      overflow-y: auto;
      position: relative;
    }

    /* Arabic Inscription Tablet */
    .arabic-container {
      background: #ffffff;
      border: 2px solid #065f3e;
      outline: 1px dashed rgba(6, 95, 62, 0.35);
      outline-offset: -5px;
      border-radius: 12px;
      padding: 24px 28px;
      text-align: center;
      position: relative;
      box-shadow: 
        inset 0 0 20px rgba(4, 67, 44, 0.05),
        0 6px 18px rgba(4, 67, 44, 0.08);
    }

    .arabic-container::before {
      content: "❖ ۞ ❖";
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #ffffff;
      padding: 0 14px;
      color: #c69214;
      font-size: 14px;
      font-weight: bold;
      border-radius: 10px;
      border: 1px solid rgba(198, 146, 20, 0.4);
    }

    .arabic-text {
      font-family: var(--arabic-font);
      font-size: var(--arabic-size);
      line-height: 1.85;
      color: #02291b;
      direction: rtl;
      word-spacing: 4px;
      text-rendering: optimizeLegibility;
      font-weight: 600;
    }

    /* Pronunciation Box (Fresh Markaz Green) */
    .pronunciation-box {
      background: #f0fdf4;
      border-left: 5px solid #10b981;
      padding: 14px 20px;
      border-radius: 0 10px 10px 0;
      border-top: 1px solid rgba(16, 185, 129, 0.2);
      border-bottom: 1px solid rgba(16, 185, 129, 0.2);
      border-right: 1px solid rgba(16, 185, 129, 0.2);
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }

    .pronunciation-box h4 {
      font-size: 13px;
      color: #065f3e;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 700;
    }

    .pronunciation-text {
      font-size: 15.5px;
      line-height: 1.65;
      color: #1e293b;
      white-space: pre-line;
      font-weight: 500;
    }

    /* Bangla Meaning Box (Warm Amber Gold) */
    .meaning-box {
      background: #fffbeb;
      border-left: 5px solid #f59e0b;
      padding: 14px 20px;
      border-radius: 0 10px 10px 0;
      border-top: 1px solid rgba(245, 158, 11, 0.2);
      border-bottom: 1px solid rgba(245, 158, 11, 0.2);
      border-right: 1px solid rgba(245, 158, 11, 0.2);
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }

    .meaning-box h4 {
      font-size: 13px;
      color: #92400e;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 700;
    }

    .meaning-text {
      font-size: 15.5px;
      line-height: 1.65;
      color: #1f2937;
      white-space: pre-line;
      font-weight: 500;
    }

    /* Meta Boxes (Fazeelat / Rules) - ZERO BLUE! Pure Markazul Iman Green & Amber */
    .meta-box-row {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }

    .fazeelat-box {
      flex: 1;
      min-width: 290px;
      background: #f0fdf4;
      border-left: 5px solid #059669;
      padding: 12px 18px;
      border-radius: 0 8px 8px 0;
      border-top: 1px solid rgba(5, 150, 105, 0.2);
      border-bottom: 1px solid rgba(5, 150, 105, 0.2);
      border-right: 1px solid rgba(5, 150, 105, 0.2);
      font-size: 13.5px;
      color: #064e3b;
      line-height: 1.55;
    }

    .fazeelat-box strong {
      color: #04432c;
      font-weight: 700;
    }

    .rule-box {
      flex: 1;
      min-width: 290px;
      background: #fefce8;
      border-left: 5px solid #ca8a04;
      padding: 12px 18px;
      border-radius: 0 8px 8px 0;
      border-top: 1px solid rgba(202, 138, 4, 0.2);
      border-bottom: 1px solid rgba(202, 138, 4, 0.2);
      border-right: 1px solid rgba(202, 138, 4, 0.2);
      font-size: 13.5px;
      color: #713f12;
      line-height: 1.55;
    }

    .rule-box strong {
      color: #854d0e;
      font-weight: 700;
    }

    /* Slide Footer / Hadith Provenance & Source */
    .slide-footer-info {
      padding: 10px 28px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12.5px;
      color: #4b5563;
      flex-wrap: wrap;
      gap: 10px;
    }

    .source-label {
      font-weight: 700;
      color: #04432c;
    }

    .source-text {
      font-weight: 600;
      color: #1f2937;
    }

    /* Navigation Arrows (Markazul Iman Emerald & Gold Dials) */
    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #04432c 0%, #02291b 100%);
      color: #fef08a;
      border: 2px solid var(--gold-border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      cursor: pointer;
      transition: all 0.25s ease;
      z-index: 20;
      box-shadow: 0 4px 15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
    }
    .nav-arrow:hover {
      background: linear-gradient(135deg, #065f3e 0%, #04432c 100%);
      transform: translateY(-50%) scale(1.1);
      color: #fff;
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
      border-color: #ffd700;
    }
    .nav-prev { left: 24px; }
    .nav-next { right: 24px; }

    /* Bottom Control Bar (Markazul Iman Deep Emerald) */
    .bottom-bar {
      background: linear-gradient(180deg, #02291b 0%, #011810 100%);
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      border-top: 2px solid var(--gold-border);
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
      border: 1px solid var(--gold-border);
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
      border: 1px solid rgba(212, 175, 55, 0.4);
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
      border-radius: 12px;
      border: 2px solid var(--gold-border);
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
      border-bottom: 2px solid var(--gold-border);
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
      color: var(--text-dark);
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
      border: 1.5px solid var(--gold-border);
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
      .slide-header-title { font-size: 16px; }
      .slide-body { padding: 18px 20px; }
      .arabic-text { font-size: 28px !important; }
      .nav-arrow { display: none; }
      .bottom-bar { justify-content: center; }
      .slide-select-dropdown { max-width: 100%; width: 100%; }
    }
  </style>
</head>
<body>

  <!-- Top Bar (Markazul Iman Emerald & Gold) -->
  <header class="top-bar">
    <div class="org-brand" onclick="filterByCategory('all')">
      <div class="org-logo-wrapper">
        <img src="${logoB64}" alt="মারকাযুল ঈমান" class="org-logo-mini">
      </div>
      <div class="org-title-group">
        <h1>নূরানী মাসনূন দু'আ ও কালিমাহ্</h1>
        <p>মারকাযুল ঈমান - দাওয়াহ্ বিভাগ | নূরানী পদ্ধতিতে কুরআন শিক্ষা অনুযায়ী</p>
      </div>
    </div>

    <div class="toolbar-actions">
      <!-- Dedicated Special Kalima Button (Markazul Iman Radiant Gold) -->
      <button class="btn btn-kalima-special" id="topKalimaBtn" onclick="switchToKalima()" title="কিতাবের ৬টি মৌলিক কালিমাহ্ দেখুন">
        <span>📜 কালিমাহ্ (মৌলিক ঈমান)</span>
      </button>

      <button class="btn btn-gold" onclick="openGridModal()">
        <span>🧭 সূচিপত্র</span>
      </button>

      <button class="btn" onclick="exportToPPTX()">
        <span>📊 PPTX স্লাইড</span>
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

  <!-- Category Navigation Ribbon -->
  <nav class="category-bar" id="categoryBar">
    <button class="category-pill active" onclick="filterByCategory('all')">সবগুলো</button>
    <button class="category-pill" onclick="filterByCategory('দৈনন্দিন আমল')">দৈনন্দিন আমল</button>
    <button class="category-pill" onclick="filterByCategory('নামায ও ওযু')">নামায ও ওযু</button>
    <button class="category-pill" onclick="filterByCategory('পবিত্রতা ও গৃহ')">পবিত্রতা ও গৃহ</button>
    <button class="category-pill" onclick="filterByCategory('সফর ও বাহন')">সফর ও বাহন</button>
    <button class="category-pill" onclick="filterByCategory('বিপদ ও রোগমুক্তি')">বিপদ ও রোগমুক্তি</button>
    <button class="category-pill" onclick="filterByCategory('প্রাকৃতিক দুর্যোগ ও আবহাওয়া')">প্রাকৃতিক দুর্যোগ</button>
    <button class="category-pill" onclick="filterByCategory('বিশেষ মুহূর্ত')">বিশেষ মুহূর্ত</button>
    <!-- Dedicated Kalima Pill (Golden Treasure Pill) -->
    <button class="category-pill kalima-pill" id="catKalimaPill" onclick="filterByCategory('কালেমা')">📜 কালিমাহ্ (মৌলিক ঈমান)</button>
  </nav>

  <!-- Slide Canvas -->
  <main class="slide-stage" id="slideStage">
    <button class="nav-arrow nav-prev" onclick="navigateSlide(-1)" title="পূর্ববর্তী স্লাইড (বাম তীর / Left Arrow)">❮</button>

    <!-- MARKAZUL IMAN SLIDE CARD -->
    <div class="slide-card" id="slideCard">
      <!-- Header Banner -->
      <div class="slide-header">
        <div class="slide-badges">
          <span class="badge-number" id="cardBadgeNum">মাসনূন দু'আ</span>
          <span class="badge-cat" id="cardBadgeCat">ক্যাটাগরি</span>
          <span class="badge-page" id="cardBadgePage">কিতাবের পৃষ্ঠা</span>
        </div>
        <div class="slide-header-title" id="cardTitle">শিরোনাম</div>
      </div>

      <!-- Body -->
      <div class="slide-body">
        <!-- Arabic Inscription Tablet -->
        <div class="arabic-container">
          <div class="arabic-text" id="cardArabic">اَللّٰهُمَّ</div>
        </div>

        <!-- Pronunciation (Fresh Markaz Green) -->
        <div class="pronunciation-box" id="cardPronunciationBox">
          <h4>🗣️ বাংলা উচ্চারণ:</h4>
          <div class="pronunciation-text" id="cardPronunciation"></div>
        </div>

        <!-- Meaning (Warm Amber Gold) -->
        <div class="meaning-box" id="cardMeaningBox">
          <h4>📖 বাংলা অর্থ:</h4>
          <div class="meaning-text" id="cardMeaning"></div>
        </div>

        <!-- Meta Row (Fazeelat / Rules - ZERO BLUE!) -->
        <div class="meta-box-row" id="cardMetaRow">
          <div class="fazeelat-box" id="cardFazeelatBox" style="display:none;">
            <strong>✨ ফযীলত ও তা'লীম:</strong>
            <div id="cardFazeelat" style="margin-top: 4px;"></div>
          </div>
          <div class="rule-box" id="cardRuleBox" style="display:none;">
            <strong>📌 আমলের নিয়ম:</strong>
            <div id="cardRule" style="margin-top: 4px;"></div>
          </div>
        </div>
      </div>

      <!-- Footer / Provenance & Hadith Legend -->
      <div class="slide-footer-info">
        <div>
          <span class="source-label">📚 কিতাবের উৎস ও হাদীস সনদ: </span>
          <span class="source-text" id="cardSource">নূরানী পদ্ধতিতে কুরআন শিক্ষা</span>
        </div>
        <div>
          <span style="font-weight: 700; color: #c69214;">মারকাযুল ঈমান দাওয়াহ্ বিভাগ</span>
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
      <span id="slideStatus" class="slide-counter-badge">১ / ৬৮</span>
    </div>
  </footer>

  <!-- Modal Grid (সূচিপত্র) -->
  <div class="modal-overlay" id="gridModal" onclick="closeGridModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 style="font-size: 17px; color: #fef08a;">🧭 সূচিপত্র (মাসনূন দু'আ ও কালিমাহ্ নির্দেশিকা)</h2>
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
    let currentArabicSize = parseInt(localStorage.getItem('noorani_dua_arabic_size')) || 38;

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
          navigateSlide(1); // Swipe left -> next
        } else if (touchEndX - touchStartX > 50) {
          navigateSlide(-1); // Swipe right -> prev
        }
      }, { passive: true });
    });

    // Dedicated Switch to Kalima function
    function switchToKalima() {
      filterByCategory('কালেমা');
      showToast("📜 কিতাবের ৬টি মৌলিক কালিমাহ্ সেকশনে যাওয়া হয়েছে");
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
        else if (item.type === 'salam') prefix = 'সালাম: ';
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
      } else if (item.type === 'salam') {
        badgeNum.textContent = 'সালাম ও মুসাফাহা';
        badgeNum.style.background = 'var(--gold-gradient)';
        badgeNum.style.color = '#02291b';
      } else {
        badgeNum.textContent = "মাসনূন দু'আ " + item.no;
        badgeNum.style.background = 'var(--gold-gradient)';
        badgeNum.style.color = '#02291b';
      }

      document.getElementById('cardBadgeCat').textContent = item.category;
      document.getElementById('cardBadgePage').textContent = 'পৃষ্ঠা: ' + item.page;
      document.getElementById('cardTitle').textContent = item.title;

      // Texts
      document.getElementById('cardArabic').textContent = item.arabic;
      document.getElementById('cardPronunciation').textContent = item.pronunciation;
      document.getElementById('cardMeaning').textContent = item.bangla;
      document.getElementById('cardSource').textContent = item.source;

      // Meta boxes (Fazeelat / Rules)
      const fazeelatBox = document.getElementById('cardFazeelatBox');
      const ruleBox = document.getElementById('cardRuleBox');
      const metaRow = document.getElementById('cardMetaRow');

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
        metaRow.style.display = 'none';
      } else {
        metaRow.style.display = 'flex';
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
        else if (item.type === 'salam') noStr = 'সালাম ও মুসাফাহা';
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

    // 1-Click PPTX Export
    function exportToPPTX() {
      showToast('পাওয়ারপয়েন্ট (PPTX) স্লাইড প্রস্তুত হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...');
      try {
        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_16x9';
        pptx.author = 'মারকাযুল ঈমান দাওয়াহ বিভাগ';
        pptx.company = 'মারকাযুল ঈমান';
        pptx.title = "নূরানী মাসনূন দু'আ ও কালিমাহ্";

        // Title Slide
        const titleSlide = pptx.addSlide();
        titleSlide.background = { color: '02291B' };
        titleSlide.addText("নূরানী মাসনূন দু'আ ও কালিমাহ্", {
          x: 0.8, y: 1.8, w: '85%', h: 1.2,
          fontSize: 38, bold: true, color: 'F3E5AB', fontFace: 'Arial', align: 'center'
        });
        titleSlide.addText("আল্লামা কারী বেলায়েত হুসাইন (রহ.)-এর মূল 'নূরানী পদ্ধতিতে কুরআন শিক্ষা' কিতাব অনুযায়ী", {
          x: 0.8, y: 3.2, w: '85%', h: 0.8,
          fontSize: 18, color: 'A7F3D0', fontFace: 'Arial', align: 'center'
        });
        titleSlide.addText("মারকাযুল ঈমান - দাওয়াহ্ বিভাগ", {
          x: 0.8, y: 4.8, w: '85%', h: 0.6,
          fontSize: 16, color: 'D4AF37', fontFace: 'Arial', align: 'center', bold: true
        });

        // Add Each Item
        DUAS_AND_KALIMAS.forEach((item, i) => {
          const slide = pptx.addSlide();
          slide.background = { color: 'FDFBF7' };

          // Top Header Banner
          slide.addShape(pptx.ShapeType.rect, {
            x: 0, y: 0, w: '100%', h: 0.85,
            fill: { color: '04432C' }
          });

          let badgeText = '';
          if (item.type === 'kalima') badgeText = 'কালিমাহ্ ' + item.no;
          else if (item.type === 'salam') badgeText = 'সালাম ও মুসাফাহা';
          else badgeText = "দু'আ " + item.no;

          slide.addText(badgeText + ' : ' + item.title + ' (পৃ. ' + item.page + ')', {
            x: 0.6, y: 0.15, w: '90%', h: 0.55,
            fontSize: 18, bold: true, color: 'F3E5AB', fontFace: 'Arial'
          });

          // Arabic Box
          slide.addShape(pptx.ShapeType.roundRect, {
            x: 0.6, y: 1.1, w: 12.1, h: 1.6,
            fill: { color: 'FFFFFF' }, line: { color: '065F3E', width: 2 }
          });
          slide.addText(item.arabic, {
            x: 0.8, y: 1.2, w: 11.7, h: 1.4,
            fontSize: 24, color: '02291B', bold: true, align: 'center', rtl: true
          });

          // Pronunciation
          slide.addText("উচ্চারণ: " + item.pronunciation, {
            x: 0.6, y: 2.9, w: 12.1, h: 0.8,
            fontSize: 13, color: '1E293B', fontFace: 'Arial', fill: { color: 'F0FDF4' }
          });

          // Meaning
          slide.addText("অর্থ: " + item.bangla, {
            x: 0.6, y: 3.85, w: 12.1, h: 1.2,
            fontSize: 13, color: '1F2937', fontFace: 'Arial', fill: { color: 'FFFBEB' }
          });

          // Extra (Fazeelat/Rule) if available
          let extra = '';
          if (item.fazeelat) extra += 'ফযীলত: ' + item.fazeelat + ' ';
          if (item.rule) extra += 'আমলের নিয়ম: ' + item.rule;
          if (extra) {
            slide.addText(extra, {
              x: 0.6, y: 5.2, w: 12.1, h: 0.9,
              fontSize: 11, color: '064E3B', fontFace: 'Arial', fill: { color: 'F0FDF4' }
            });
          }

          // Footer
          slide.addText("উৎস: " + item.source + " | মারকাযুল ঈমান দাওয়াহ্ বিভাগ", {
            x: 0.6, y: 6.8, w: 12.1, h: 0.4,
            fontSize: 10, color: '6B7280', fontFace: 'Arial'
          });
        });

        pptx.writeFile({ fileName: "Noorani_Masnoon_Dua_and_Kalima_Markazul_Iman.pptx" })
          .then(() => {
            showToast('✅ পাওয়ারপয়েন্ট স্লাইড ফাইল সফলভাবে ডাউনলোড হয়েছে!');
          })
          .catch(err => {
            showToast('ডাউনলোডে ত্রুটি: ' + err.message);
          });

      } catch (err) {
        showToast('ত্রুটি: ' + err.message);
      }
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf-8');
console.log('Successfully generated index.html with Markazul Iman official Emerald & Gold theme (ZERO BLUE).');
