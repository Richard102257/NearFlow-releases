(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector("#site-nav");
  const revealItems = document.querySelectorAll("[data-reveal]");
  const languageSelect = document.querySelector("#language-select");
  const themeSelect = document.querySelector("#theme-select");
  const root = document.documentElement;
  const descriptionMeta = document.querySelector("#site-description");

  const storage = {
    get(key, fallback) {
      try {
        return localStorage.getItem(key) || fallback;
      } catch (_) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (_) {
        return undefined;
      }
    }
  };

  const baseEnglish = {
    pageTitle: "NearFlow · Keep your devices close",
    pageDescription: "NearFlow moves screenshots, files and clipboard content directly to your computer. Install the PC app; use a phone browser without installing an app.",
    language: "Language",
    theme: "Theme",
    languageAria: "Choose language",
    themeAria: "Choose theme",
    navAria: "Main navigation",
    settingsAria: "Website settings",
    homeAria: "NearFlow home",
    stageAria: "NearFlow product interface preview",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    system: "System",
    light: "Light",
    dark: "Dark",
    navFeatures: "Features",
    navHow: "How it works",
    navPrivacy: "Privacy",
    navDownload: "Download",
    headerDownload: "Download PC app",
    heroEyebrow: "PC installed · Phone app-free",
    heroTitle: "Send the moment on your screen <span>to</span> another device.",
    heroLede: "NearFlow is a local-first tool for moving between devices. Send screenshots, files and clipboard content over the Wi-Fi around you, without passing through a chat app.",
    heroCta: "Start with NearFlow",
    heroBrowser: "Use a browser on your phone",
    proof0: "accounts",
    proof1: "local network",
    proof2: "nearby moments",
    featuresEyebrow: "NEARBY, NOT CLOUDY",
    featuresTitle: "Closer makes everything simpler.",
    featuresDesc: "NearFlow is not another chat app. It moves what you are looking at, copying or capturing to the device already within reach.",
    f1Index: "01 / Screenshot direct",
    f1Title: "Capture it.\u003Cbr\u003EIt is already there.",
    f1Desc: "Android can send screenshots to your default computer automatically. On iPhone, use the share extension or a Shortcut in two taps.",
    f1Link: "See screenshot direct",
    f2Index: "02 / Clipboard",
    f2Title: "Copy once.\u003Cbr\u003EPaste anywhere.",
    f2Desc: "Text and links sync across trusted devices with clear status feedback and loop protection.",
    f2Link: "See clipboard sync",
    f3Index: "03 / Batch export",
    f3Title: "A whole album.\u003Cbr\u003EOne handoff.",
    f3Desc: "Select photos and files in bulk, keep original names, archive by date and skip identical duplicates.",
    f3Link: "See batch export",
    f4Index: "04 / Guest web",
    f4Title: "No app to install.\u003Cbr\u003EScan and send.",
    f4Desc: "The PC starts a temporary session. A phone browser can send photos, files and text without becoming a trusted device.",
    f4Link: "See browser mode",
    screenshotEyebrow: "MOMENT → DESKTOP",
    screenshotTitle: "A phone screenshot,\u003Cbr\u003Ewithout leaving your hand.",
    screenshotDesc: "Screenshots are the most common things we mean to deal with later. NearFlow finds the file, waits for it to settle and sends it to your default computer through a recoverable queue.",
    screenshotPoint1: "<b>01</b> Default computer receives it",
    screenshotPoint2: "<b>02</b> Offline tasks retry automatically",
    screenshotPoint3: "<b>03</b> Open it from the desktop inbox",
    batchEyebrow: "ONE TAP, WHOLE ALBUM",
    batchTitle: "A whole album,\u003Cbr\u003Ehanded to your computer.",
    batchDesc: "No one-by-one selecting and no overwriting surprises. Choose photos and files, set the archive rules and let the reliable transfer queue do the rest.",
    batchPoint1: "<b>01</b> Select up to 100 items",
    batchPoint2: "<b>02</b> Skip identical duplicates",
    batchPoint3: "<b>03</b> Keep tasks after a disconnect",
    clipboardEyebrow: "CLIPBOARD, WITHOUT THE LOOP",
    clipboardTitle: "Your clipboard should not take a detour.",
    clipboardDesc: "Copy an address on your phone and paste it on your computer. It travels between your devices, not through a chat window.",
    browserEyebrow: "NO APP REQUIRED",
    browserTitle: "A friend’s phone,\u003Cbr\u003Eready in seconds.",
    browserDesc: "Install NearFlow on the PC and open a short-lived guest session. Scan the code and transfer in a browser—no download, no sign-up, no lasting trust.",
    browserCta: "About the PC app",
    stepsEyebrow: "THREE SMALL STEPS",
    stepsTitle: "From “send” to “arrived”\u003Cbr\u003Ein three small steps.",
    step1Title: "Install on PC",
    step1Desc: "Start NearFlow on Windows, macOS or Linux. The PC is the stable local receiver.",
    step2Title: "Get nearby",
    step2Desc: "Pair trusted devices with a QR code. Temporary devices scan a guest code and use their browser.",
    step3Title: "It arrives",
    step3Desc: "Screenshots, photos, files and text reach the computer with visible progress and resumable large transfers.",
    privacyEyebrow: "LOCAL BY DEFAULT",
    privacyTitle: "Your content\u003Cbr\u003Edoes not need the cloud first.",
    privacyDesc: "NearFlow treats nearby as a boundary. Trusted devices use authenticated encrypted sessions; guest mode uses short-lived tokens and human approval.",
    privacyLink: "Read our privacy promise",
    privacy1Title: "No third-party relay",
    privacy1Desc: "Devices communicate directly on the same local network. An account or cloud drive is not a prerequisite.",
    privacy2Title: "Every transfer is visible",
    privacy2Desc: "Approval, file status and guest countdown keep content from moving silently.",
    privacy3Title: "Guest access expires",
    privacy3Desc: "A browser can send without installing an app or becoming a permanently trusted device.",
    downloadEyebrow: "READY WHEN YOU ARE",
    downloadTitle: "Bring your computer\u003Cbr\u003Ecloser.",
    downloadDesc: "Install one PC app and connect from a native mobile app or a browser. NearFlow supports Windows, macOS and Linux.",
    downloadCta: "View desktop install",
    downloadNote: "Release packages will be provided through GitHub / Gitee Release",
    footerTagline: "Keep your devices close.",
    footerFeatures: "Features",
    footerPrivacy: "Privacy",
    footerDownload: "Download",
    footerTop: "Back to top ↑",
    footerCopyright: "© 2026 NearFlow",
    footerMotto: "Local first. Human approved."
  };

  const localePacks = {
    "zh-CN": {
      pageTitle: "邻传 / NearFlow · 让设备彼此靠近",
      pageDescription: "邻传 NearFlow：让手机截图、文件和剪贴板内容，直接抵达你的电脑。PC 端安装运行，手机端浏览器免安装。",
      language: "语言",
      theme: "主题",
      languageAria: "选择语言",
      themeAria: "选择主题",
      navAria: "主导航",
      settingsAria: "网站设置",
      homeAria: "邻传 NearFlow 首页",
      stageAria: "NearFlow 产品界面预览",
      menuOpen: "打开导航",
      menuClose: "关闭导航",
      system: "跟随系统",
      light: "浅色",
      dark: "深色",
      navFeatures: "功能",
      navHow: "怎么用",
      navPrivacy: "隐私",
      navDownload: "下载",
      headerDownload: "下载 PC 端",
      heroEyebrow: "PC 安装 · 手机免安装",
      heroTitle: "把屏幕上的那一刻，<span>送到</span>另一台设备。",
      heroLede: "邻传是一个本地优先的跨设备工具。手机截图、文件和剪贴板内容，不必经过聊天软件，沿着身边这张 Wi‑Fi 直接抵达电脑。",
      heroCta: "开始使用 NearFlow",
      heroBrowser: "手机直接用浏览器",
      proof0: "账号",
      proof1: "张局域网",
      proof2: "次靠近",
      featuresTitle: "近一点，事情就简单了。",
      featuresDesc: "它不试图成为另一个聊天软件。邻传只做一件事：把你正在看的、正在复制的、刚刚截下的内容，可靠地送到你手边的设备。",
      f1Index: "01 / 截图直达",
      f1Title: "截完就到，<br>不用再找自己。",
      f1Desc: "Android 可在截屏后自动发送到默认电脑；iPhone 用分享扩展或快捷指令，两步完成。",
      f1Link: "了解截图直达",
      f2Index: "02 / 剪贴板",
      f2Title: "复制一次，<br>到处都能粘。",
      f2Desc: "文本和链接在可信设备间同步，写入前后都有状态反馈，自动防止同步回环。",
      f2Link: "查看剪贴板",
      f3Index: "03 / 批量导出",
      f3Title: "一整个相册，<br>一次交给电脑。",
      f3Desc: "照片和文件批量选择，保留原名，按日期归档，同名同内容自动跳过。",
      f3Link: "了解批量导出",
      f4Index: "04 / 临时访客",
      f4Title: "手机不用装，<br>扫码就能传。",
      f4Desc: "PC 端开启临时会话，手机浏览器直接收发照片、文件和文字，不加入可信设备。",
      f4Link: "浏览器模式",
      screenshotTitle: "手机截屏，<br><em>不用离开手。</em>",
      screenshotDesc: "截图是手机上最常见的“稍后处理”。NearFlow 把这段等待缩短：找到截图、等文件稳定、发到默认电脑，交给后台队列完成。",
      screenshotPoint1: "<b>01</b> 默认电脑自动接收",
      screenshotPoint2: "<b>02</b> 断网后自动排队重试",
      screenshotPoint3: "<b>03</b> 电脑收件箱可直接打开",
      batchTitle: "一整个相册，<br><em>一次交给电脑。</em>",
      batchDesc: "不再一张张勾选、不再担心重名覆盖。选择照片和文件，设定归档方式，NearFlow 会把批量任务交给可靠的传输队列。",
      batchPoint1: "<b>01</b> 最多一次选择 100 项",
      batchPoint2: "<b>02</b> 同名同内容自动跳过",
      batchPoint3: "<b>03</b> 断网后保留任务并重试",
      clipboardTitle: "剪贴板不会绕路。",
      clipboardDesc: "从手机复制一段地址，在电脑上直接粘贴。它只在你的设备之间走，不需要把内容交给任何聊天窗口。",
      browserTitle: "朋友的手机，<br><em>也能马上用。</em>",
      browserDesc: "电脑端安装 NearFlow 后，开启一个短期访客会话。对方扫码，浏览器里就能传，不下载、不注册、不留下长期信任。",
      browserCta: "了解 PC 端",
      stepsTitle: "从“想传”到“已到”，<br>只需要三步。",
      step1Title: "PC 端安装",
      step1Desc: "在 Windows、macOS 或 Linux 电脑启动 NearFlow，它是局域网里的稳定接收端。",
      step2Title: "靠近并连接",
      step2Desc: "可信设备扫码配对；临时设备扫描访客二维码，用浏览器直接进入。",
      step3Title: "内容抵达",
      step3Desc: "截图、照片、文件或文字到达电脑。大文件支持断点续传，状态始终可见。",
      privacyTitle: "你的内容，<br>不必先去云上。",
      privacyDesc: "NearFlow 把“附近”当成边界。可信设备使用认证加密会话；访客模式是短期令牌和人工确认，结束后立即失效。",
      privacyLink: "阅读隐私承诺",
      privacy1Title: "不经过第三方服务器",
      privacy1Desc: "设备在同一局域网直接通信，账号和云盘不是前置条件。",
      privacy2Title: "每次传输都看得见",
      privacy2Desc: "接收确认、文件状态和临时会话倒计时，不让内容悄悄发生。",
      privacy3Title: "访客权限到期即清除",
      privacy3Desc: "手机浏览器不用安装应用，也不会因为一次分享变成长期可信设备。",
      downloadTitle: "先让电脑<br><em>靠近你。</em>",
      downloadDesc: "安装一台 PC 端，手机就可以用原生 App 或浏览器连接。NearFlow 支持 Windows、macOS 和 Linux。",
      downloadCta: "查看桌面端安装",
      downloadNote: "发布包将通过 GitHub / Gitee Release 提供",
      footerTagline: "让设备彼此靠近。",
      footerFeatures: "功能",
      footerPrivacy: "隐私",
      footerDownload: "下载",
      footerTop: "回到顶部 ↑",
      footerCopyright: "© 2026 NearFlow",
      footerMotto: "本地优先 · 人工确认"
    },
    "zh-TW": {
      pageTitle: "鄰傳 / NearFlow · 讓裝置彼此靠近",
      pageDescription: "鄰傳 NearFlow：讓手機截圖、檔案和剪貼簿內容，直接抵達你的電腦。PC 端安裝執行，手機瀏覽器免安裝。",
      language: "語言", theme: "主題", system: "跟隨系統", light: "淺色", dark: "深色",
      languageAria: "選擇語言", themeAria: "選擇主題", navAria: "主導覽", settingsAria: "網站設定", homeAria: "鄰傳 NearFlow 首頁", stageAria: "NearFlow 產品介面預覽", menuOpen: "開啟導覽", menuClose: "關閉導覽",
      navFeatures: "功能", navHow: "使用方式", navPrivacy: "隱私", navDownload: "下載", headerDownload: "下載 PC 版",
      heroEyebrow: "PC 安裝 · 手機免安裝", heroTitle: "把螢幕上的那一刻，<span>送到</span>另一台裝置。", heroCta: "開始使用 NearFlow", heroBrowser: "手機直接用瀏覽器",
      featuresTitle: "近一點，事情就簡單了。", f1Title: "截完就到，<br>不用再找自己。", f2Title: "複製一次，<br>到處都能貼。", f3Title: "一整個相簿，<br>一次交給電腦。", f4Title: "手機不用裝，<br>掃碼就能傳。",
      f1Link: "了解截圖直達", f2Link: "查看剪貼簿", f3Link: "了解批次匯出", f4Link: "瀏覽器模式",
      screenshotTitle: "手機截圖，<br><em>不用離開手。</em>", batchTitle: "一整個相簿，<br><em>一次交給電腦。</em>", clipboardTitle: "剪貼簿不必繞路。", browserTitle: "朋友的手機，<br><em>也能馬上用。</em>",
      browserCta: "了解 PC 版", stepsTitle: "從「想傳」到「已到」，<br>只需要三步。", privacyTitle: "你的內容，<br>不必先上雲端。", privacyLink: "閱讀隱私承諾", downloadTitle: "先讓電腦<br><em>靠近你。</em>", downloadCta: "查看桌面版安裝"
    },
    "es-ES": {
      language: "Idioma", theme: "Tema", system: "Sistema", light: "Claro", dark: "Oscuro", navFeatures: "Funciones", navHow: "Cómo funciona", navPrivacy: "Privacidad", navDownload: "Descargar", headerDownload: "Descargar para PC",
      heroEyebrow: "PC instalado · Móvil sin app", heroTitle: "Envía ese momento de tu pantalla <span>a</span> otro dispositivo.", heroCta: "Empezar con NearFlow", heroBrowser: "Usar el navegador del móvil", featuresTitle: "Más cerca, todo es más sencillo.", f1Title: "Captúralo.\u003Cbr\u003EYa está ahí.", f2Title: "Copia una vez.\u003Cbr\u003EPega donde quieras.", f3Title: "Un álbum entero.\u003Cbr\u003EUn solo envío.", f4Title: "Sin instalar apps.\u003Cbr\u003EEscanea y envía.", f1Link: "Ver capturas", f2Link: "Ver portapapeles", f3Link: "Ver exportación", f4Link: "Ver modo navegador", screenshotTitle: "Una captura del móvil,\u003Cbr\u003Esin soltarlo.", batchTitle: "Un álbum entero,\u003Cbr\u003Eenviado al ordenador.", clipboardTitle: "El portapapeles no da rodeos.", browserTitle: "El móvil de un amigo,\u003Cbr\u003Elisto en segundos.", browserCta: "Sobre la app para PC", stepsTitle: "De «enviar» a «llegó»\u003Cbr\u003Een tres pasos.", privacyTitle: "Tu contenido\u003Cbr\u003Eno necesita la nube.", privacyLink: "Leer nuestro compromiso", downloadTitle: "Acerca tu ordenador.", downloadCta: "Ver instalación de escritorio"
    },
    "fr-FR": {
      language: "Langue", theme: "Thème", system: "Système", light: "Clair", dark: "Sombre", navFeatures: "Fonctions", navHow: "Utilisation", navPrivacy: "Confidentialité", navDownload: "Télécharger", headerDownload: "Télécharger pour PC",
      heroEyebrow: "PC installé · Mobile sans appli", heroTitle: "Envoyez l’instant à l’écran <span>vers</span> un autre appareil.", heroCta: "Commencer avec NearFlow", heroBrowser: "Utiliser le navigateur du mobile", featuresTitle: "Plus près, tout devient simple.", f1Title: "Capturez.\u003Cbr\u003EC’est déjà là.", f2Title: "Copiez une fois.\u003Cbr\u003EColez partout.", f3Title: "Un album entier.\u003Cbr\u003EUn seul envoi.", f4Title: "Aucune appli à installer.\u003Cbr\u003EScanez et envoyez.", f1Link: "Voir les captures", f2Link: "Voir le presse-papiers", f3Link: "Voir l’export", f4Link: "Voir le mode navigateur", screenshotTitle: "Une capture du téléphone,\u003Cbr\u003Esans le quitter.", batchTitle: "Un album entier,\u003Cbr\u003Eenvoyé à l’ordinateur.", clipboardTitle: "Le presse-papiers va droit au but.", browserTitle: "Le téléphone d’un ami,\u003Cbr\u003Eprêt en quelques secondes.", browserCta: "À propos de l’app PC", stepsTitle: "De « envoyer » à « arrivé »\u003Cbr\u003Een trois étapes.", privacyTitle: "Votre contenu\u003Cbr\u003En’a pas besoin du cloud.", privacyLink: "Lire notre engagement", downloadTitle: "Rapprochez votre ordinateur.", downloadCta: "Voir l’installation desktop"
    },
    "de-DE": {
      language: "Sprache", theme: "Darstellung", system: "System", light: "Hell", dark: "Dunkel", navFeatures: "Funktionen", navHow: "So funktioniert’s", navPrivacy: "Datenschutz", navDownload: "Download", headerDownload: "PC-App laden",
      heroEyebrow: "PC installiert · Mobil ohne App", heroTitle: "Sende den Moment auf deinem Bildschirm <span>an</span> ein anderes Gerät.", heroCta: "Mit NearFlow starten", heroBrowser: "Browser auf dem Handy nutzen", featuresTitle: "Nähe macht alles einfacher.", f1Title: "Aufnehmen.\u003Cbr\u003ESchon da.", f2Title: "Einmal kopieren.\u003Cbr\u003EÜberall einfügen.", f3Title: "Ein ganzes Album.\u003Cbr\u003EEin Übergang.", f4Title: "Keine App nötig.\u003Cbr\u003EScannen und senden.", f1Link: "Screenshots ansehen", f2Link: "Zwischenablage ansehen", f3Link: "Export ansehen", f4Link: "Browser-Modus ansehen", screenshotTitle: "Ein Handy-Screenshot,\u003Cbr\u003Eohne es aus der Hand zu legen.", batchTitle: "Ein ganzes Album,\u003Cbr\u003Eauf deinem PC.", clipboardTitle: "Die Zwischenablage nimmt keinen Umweg.", browserTitle: "Das Handy eines Freundes,\u003Cbr\u003Ein Sekunden bereit.", browserCta: "Über die PC-App", stepsTitle: "Von „senden“ zu „da“\u003Cbr\u003Ein drei kleinen Schritten.", privacyTitle: "Deine Inhalte\u003Cbr\u003Ebrauchen nicht zuerst die Cloud.", privacyLink: "Unser Datenschutzversprechen", downloadTitle: "Bring deinen PC näher.", downloadCta: "Desktop-Installation ansehen"
    },
    "ja-JP": {
      language: "言語", theme: "テーマ", system: "システム", light: "ライト", dark: "ダーク", navFeatures: "機能", navHow: "使い方", navPrivacy: "プライバシー", navDownload: "ダウンロード", headerDownload: "PC 版をダウンロード",
      heroEyebrow: "PC にインストール · スマホはアプリ不要", heroTitle: "画面のその瞬間を、別のデバイスへ<span>送る。</span>", heroCta: "NearFlow を始める", heroBrowser: "スマホのブラウザで使う", featuresTitle: "近くにあるだけで、もっと簡単に。", f1Title: "撮ったら届く。\u003Cbr\u003Eもう探さない。", f2Title: "一度コピー。\u003Cbr\u003Eどこでも貼り付け。", f3Title: "アルバムごと。\u003Cbr\u003Eまとめて送信。", f4Title: "アプリ不要。\u003Cbr\u003Eスキャンして送信。", f1Link: "スクリーンショットを見る", f2Link: "クリップボードを見る", f3Link: "一括エクスポートを見る", f4Link: "ブラウザモードを見る", screenshotTitle: "スマホのスクリーンショットを、\u003Cbr\u003E手元から離さずに。", batchTitle: "アルバムまるごと、\u003Cbr\u003EPC へ。", clipboardTitle: "クリップボードに遠回りさせない。", browserTitle: "友だちのスマホも、\u003Cbr\u003Eすぐに使える。", browserCta: "PC 版について", stepsTitle: "「送りたい」から「届いた」まで\u003Cbr\u003Eたった 3 ステップ。", privacyTitle: "あなたのデータは、\u003Cbr\u003Eまずクラウドへ行かない。", privacyLink: "プライバシーへの約束", downloadTitle: "PC をもっと近くに。", downloadCta: "デスクトップ版を見る"
    },
    "ko-KR": {
      language: "언어", theme: "테마", system: "시스템", light: "라이트", dark: "다크", navFeatures: "기능", navHow: "사용 방법", navPrivacy: "개인정보", navDownload: "다운로드", headerDownload: "PC 앱 다운로드",
      heroEyebrow: "PC 설치 · 휴대폰 앱 불필요", heroTitle: "화면 속 그 순간을 다른 기기로 <span>보내세요.</span>", heroCta: "NearFlow 시작하기", heroBrowser: "휴대폰 브라우저로 사용", featuresTitle: "가까우면 모든 일이 간단해집니다.", f1Title: "캡처하면 도착.\u003Cbr\u003E더 이상 찾지 마세요.", f2Title: "한 번 복사하고.\u003Cbr\u003E어디서나 붙여넣기.", f3Title: "앨범 전체를.\u003Cbr\u003E한 번에 전송.", f4Title: "앱 설치 없이.\u003Cbr\u003E스캔하고 전송.", f1Link: "스크린샷 보기", f2Link: "클립보드 보기", f3Link: "일괄 내보내기 보기", f4Link: "브라우저 모드 보기", screenshotTitle: "휴대폰 스크린샷을,\u003Cbr\u003E손에서 놓지 않고.", batchTitle: "앨범 전체를,\u003Cbr\u003E컴퓨터로.", clipboardTitle: "클립보드는 돌아가지 않습니다.", browserTitle: "친구의 휴대폰도,\u003Cbr\u003E몇 초 만에 준비됩니다.", browserCta: "PC 앱 알아보기", stepsTitle: "‘보내기’에서 ‘도착’까지\u003Cbr\u003E세 단계면 충분합니다.", privacyTitle: "콘텐츠를\u003Cbr\u003E먼저 클라우드로 보낼 필요가 없습니다.", privacyLink: "개인정보 보호 약속", downloadTitle: "컴퓨터를 더 가까이.", downloadCta: "데스크톱 설치 보기"
    },
    "pt-BR": {
      language: "Idioma", theme: "Tema", system: "Sistema", light: "Claro", dark: "Escuro", navFeatures: "Recursos", navHow: "Como funciona", navPrivacy: "Privacidade", navDownload: "Baixar", headerDownload: "Baixar para PC",
      heroEyebrow: "PC instalado · Celular sem aplicativo", heroTitle: "Envie o momento da sua tela <span>para</span> outro dispositivo.", heroCta: "Começar com NearFlow", heroBrowser: "Usar o navegador do celular", featuresTitle: "Mais perto, tudo fica simples.", f1Title: "Capture.\u003Cbr\u003EJá está lá.", f2Title: "Copie uma vez.\u003Cbr\u003ECole em qualquer lugar.", f3Title: "Um álbum inteiro.\u003Cbr\u003EUm só envio.", f4Title: "Sem instalar aplicativo.\u003Cbr\u003ELeia o código e envie.", f1Link: "Ver capturas", f2Link: "Ver área de transferência", f3Link: "Ver exportação", f4Link: "Ver modo navegador", screenshotTitle: "Uma captura do celular,\u003Cbr\u003Esem soltá-lo.", batchTitle: "Um álbum inteiro,\u003Cbr\u003Eenviado ao computador.", clipboardTitle: "A área de transferência não faz desvios.", browserTitle: "O celular de um amigo,\u003Cbr\u003Epronto em segundos.", browserCta: "Sobre o app para PC", stepsTitle: "De “enviar” a “chegou”\u003Cbr\u003Eem três passos.", privacyTitle: "Seu conteúdo\u003Cbr\u003Enão precisa ir primeiro para a nuvem.", privacyLink: "Ler nosso compromisso", downloadTitle: "Aproxime seu computador.", downloadCta: "Ver instalação para desktop"
    },
    "ru-RU": {
      language: "Язык", theme: "Тема", system: "Системная", light: "Светлая", dark: "Тёмная", navFeatures: "Возможности", navHow: "Как это работает", navPrivacy: "Приватность", navDownload: "Скачать", headerDownload: "Скачать для ПК",
      heroEyebrow: "Установите на ПК · На телефоне приложение не нужно", heroTitle: "Отправляйте момент с экрана <span>на</span> другое устройство.", heroCta: "Начать с NearFlow", heroBrowser: "Открыть в браузере телефона", featuresTitle: "Ближе — значит проще.", f1Title: "Сделали снимок.\u003Cbr\u003EОн уже на месте.", f2Title: "Скопировали один раз.\u003Cbr\u003EВставляйте где угодно.", f3Title: "Целый альбом.\u003Cbr\u003EОдна отправка.", f4Title: "Без установки приложения.\u003Cbr\u003EСканируйте и отправляйте.", f1Link: "Скриншоты", f2Link: "Буфер обмена", f3Link: "Пакетный экспорт", f4Link: "Режим браузера", screenshotTitle: "Снимок экрана телефона —\u003Cbr\u003Eне выпуская его из рук.", batchTitle: "Целый альбом —\u003Cbr\u003Eна вашем компьютере.", clipboardTitle: "Буфер обмена без обходных путей.", browserTitle: "Телефон друга —\u003Cbr\u003Eготов за секунды.", browserCta: "О приложении для ПК", stepsTitle: "От «отправить» до «доставлено»\u003Cbr\u003Eв три шага.", privacyTitle: "Вашим данным\u003Cbr\u003Eне обязательно сначала идти в облако.", privacyLink: "Наше обещание приватности", downloadTitle: "Сделайте компьютер ближе.", downloadCta: "Установка для ПК"
    },
    "ar-SA": {
      language: "اللغة", theme: "المظهر", system: "النظام", light: "فاتح", dark: "داكن", navFeatures: "الميزات", navHow: "طريقة الاستخدام", navPrivacy: "الخصوصية", navDownload: "التنزيل", headerDownload: "تنزيل نسخة الكمبيوتر",
      heroEyebrow: "تثبيت على الكمبيوتر · الهاتف بلا تطبيق", heroTitle: "أرسل اللحظة من شاشتك <span>إلى</span> جهاز آخر.", heroCta: "ابدأ مع NearFlow", heroBrowser: "استخدم متصفح الهاتف", featuresTitle: "عندما نقترب، تصبح الأمور أسهل.", f1Title: "التقطها.\u003Cbr\u003Eستجدها هناك.", f2Title: "انسخ مرة واحدة.\u003Cbr\u003Eالصق في كل مكان.", f3Title: "ألبوم كامل.\u003Cbr\u003Eإرسال واحد.", f4Title: "لا حاجة لتثبيت تطبيق.\u003Cbr\u003Eامسح وأرسل.", f1Link: "عرض لقطات الشاشة", f2Link: "عرض الحافظة", f3Link: "عرض التصدير الجماعي", f4Link: "عرض وضع المتصفح", screenshotTitle: "لقطة شاشة من الهاتف،\u003Cbr\u003Eمن دون أن تتركه.", batchTitle: "ألبوم كامل،\u003Cbr\u003Eإلى الكمبيوتر.", clipboardTitle: "الحافظة لا تسلك طريقاً أطول.", browserTitle: "هاتف صديقك،\u003Cbr\u003Eجاهز خلال ثوانٍ.", browserCta: "عن تطبيق الكمبيوتر", stepsTitle: "من «إرسال» إلى «وصلت»\u003Cbr\u003Eفي ثلاث خطوات.", privacyTitle: "محتواك\u003Cbr\u003Eلا يحتاج إلى السحابة أولاً.", privacyLink: "اقرأ وعد الخصوصية", downloadTitle: "قرّب الكمبيوتر منك.", downloadCta: "عرض تثبيت الكمبيوتر"
    },
    "hi-IN": {
      language: "भाषा", theme: "थीम", system: "सिस्टम", light: "लाइट", dark: "डार्क", navFeatures: "सुविधाएँ", navHow: "कैसे काम करता है", navPrivacy: "गोपनीयता", navDownload: "डाउनलोड", headerDownload: "PC ऐप डाउनलोड करें",
      heroEyebrow: "PC पर इंस्टॉल · फोन में ऐप नहीं", heroTitle: "स्क्रीन पर दिख रहा पल दूसरे डिवाइस <span>तक भेजें।</span>", heroCta: "NearFlow शुरू करें", heroBrowser: "फोन के ब्राउज़र में इस्तेमाल करें", featuresTitle: "पास हों तो सब आसान है।", f1Title: "स्क्रीनशॉट लें।\u003Cbr\u003Eवह पहले से वहाँ है।", f2Title: "एक बार कॉपी करें।\u003Cbr\u003Eकहीं भी पेस्ट करें।", f3Title: "पूरा एल्बम।\u003Cbr\u003Eएक ही बार भेजें।", f4Title: "ऐप इंस्टॉल नहीं।\u003Cbr\u003Eस्कैन करें और भेजें।", f1Link: "स्क्रीनशॉट देखें", f2Link: "क्लिपबोर्ड देखें", f3Link: "बैच एक्सपोर्ट देखें", f4Link: "ब्राउज़र मोड देखें", screenshotTitle: "फोन का स्क्रीनशॉट,\u003Cbr\u003Eफोन हाथ से रखे बिना।", batchTitle: "पूरा एल्बम,\u003Cbr\u003Eकंप्यूटर को भेजें।", clipboardTitle: "क्लिपबोर्ड को लंबा रास्ता नहीं चाहिए।", browserTitle: "दोस्त का फोन,\u003Cbr\u003Eकुछ ही सेकंड में तैयार।", browserCta: "PC ऐप के बारे में", stepsTitle: "‘भेजें’ से ‘पहुंच गया’ तक\u003Cbr\u003Eतीन छोटे कदम।", privacyTitle: "आपकी सामग्री को\u003Cbr\u003Eपहले क्लाउड पर जाने की जरूरत नहीं।", privacyLink: "गोपनीयता का वादा पढ़ें", downloadTitle: "कंप्यूटर को पास लाएँ।", downloadCta: "डेस्कटॉप इंस्टॉल देखें"
    },
    "id-ID": {
      language: "Bahasa", theme: "Tema", system: "Sistem", light: "Terang", dark: "Gelap", navFeatures: "Fitur", navHow: "Cara kerja", navPrivacy: "Privasi", navDownload: "Unduh", headerDownload: "Unduh untuk PC",
      heroEyebrow: "Terpasang di PC · Ponsel tanpa aplikasi", heroTitle: "Kirim momen di layar Anda <span>ke</span> perangkat lain.", heroCta: "Mulai dengan NearFlow", heroBrowser: "Gunakan browser di ponsel", featuresTitle: "Lebih dekat, semuanya lebih mudah.", f1Title: "Ambil tangkapan.<br>Sudah sampai.", f2Title: "Salin sekali.<br>Tempel di mana saja.", f3Title: "Satu album penuh.<br>Satu kali kirim.", f4Title: "Tanpa instal aplikasi.<br>Scan dan kirim.", f1Link: "Lihat tangkapan layar", f2Link: "Lihat clipboard", f3Link: "Lihat ekspor massal", f4Link: "Lihat mode browser", screenshotTitle: "Tangkapan layar ponsel,<br>tanpa melepasnya dari tangan.", batchTitle: "Satu album penuh,<br>dikirim ke komputer.", clipboardTitle: "Clipboard tidak perlu memutar.", browserTitle: "Ponsel teman,<br>siap dalam hitungan detik.", browserCta: "Tentang aplikasi PC", stepsTitle: "Dari “kirim” ke “sampai”<br>dalam tiga langkah.", privacyTitle: "Konten Anda<br>tidak perlu ke cloud terlebih dahulu.", privacyLink: "Baca komitmen privasi", downloadTitle: "Dekatkan komputer Anda.", downloadCta: "Lihat instalasi desktop"
    }
  };

  const bindings = [
    [".site-nav > a:nth-of-type(1)", "navFeatures"], [".site-nav > a:nth-of-type(2)", "navHow"], [".site-nav > a:nth-of-type(3)", "navPrivacy"], [".site-nav > a:nth-of-type(4)", "navDownload"],
    [".language-label", "language"], [".theme-label", "theme"], [".header-actions .button-copy", "headerDownload"],
    [".eyebrow-copy", ["heroEyebrow", "featuresEyebrow", "screenshotEyebrow", "batchEyebrow", "clipboardEyebrow", "browserEyebrow", "stepsEyebrow", "privacyEyebrow", "downloadEyebrow"]],
    ["#hero-title", "heroTitle", true], [".hero-lede", "heroLede"], [".hero-actions .button-primary .button-copy", "heroCta"], [".hero-actions .text-link .button-copy", "heroBrowser"], [".proof-copy", ["proof0", "proof1", "proof2"]],
    ["#features-title", "featuresTitle"], ["#features .section-heading > p:last-child", "featuresDesc"],
    [".feature-card:nth-child(1) .feature-index", "f1Index"], [".feature-card:nth-child(1) h3", "f1Title", true], [".feature-card:nth-child(1) p", "f1Desc"], [".feature-card:nth-child(1) .button-copy", "f1Link"],
    [".feature-card:nth-child(2) .feature-index", "f2Index"], [".feature-card:nth-child(2) h3", "f2Title", true], [".feature-card:nth-child(2) p", "f2Desc"], [".feature-card:nth-child(2) .button-copy", "f2Link"],
    [".feature-card:nth-child(3) .feature-index", "f3Index"], [".feature-card:nth-child(3) h3", "f3Title", true], [".feature-card:nth-child(3) p", "f3Desc"], [".feature-card:nth-child(3) .button-copy", "f3Link"],
    [".feature-card:nth-child(4) .feature-index", "f4Index"], [".feature-card:nth-child(4) h3", "f4Title", true], [".feature-card:nth-child(4) p", "f4Desc"], [".feature-card:nth-child(4) .button-copy", "f4Link"],
    ["#screenshot-title", "screenshotTitle", true], ["#screenshot .showcase-copy > p", "screenshotDesc"], ["#screenshot .showcase-points span", ["screenshotPoint1", "screenshotPoint2", "screenshotPoint3"], true],
    ["#batch-title", "batchTitle", true], ["#batch .batch-copy > p", "batchDesc"], ["#batch .showcase-points span", ["batchPoint1", "batchPoint2", "batchPoint3"], true],
    ["#clipboard-title", "clipboardTitle"], ["#clipboard .clipboard-heading > p", "clipboardDesc"],
    ["#browser-title", "browserTitle", true], ["#browser .browser-heading > p", "browserDesc"], ["#browser .button-copy", "browserCta"],
    ["#steps-title", "stepsTitle", true], ["#how-it-works .step-card:nth-child(1) h3", "step1Title"], ["#how-it-works .step-card:nth-child(1) p", "step1Desc"], ["#how-it-works .step-card:nth-child(2) h3", "step2Title"], ["#how-it-works .step-card:nth-child(2) p", "step2Desc"], ["#how-it-works .step-card:nth-child(3) h3", "step3Title"], ["#how-it-works .step-card:nth-child(3) p", "step3Desc"],
    ["#privacy-title", "privacyTitle", true], ["#privacy .privacy-copy > p", "privacyDesc"], ["#privacy .privacy-copy .button-copy", "privacyLink"], ["#privacy .privacy-list > div:nth-child(1) strong", "privacy1Title"], ["#privacy .privacy-list > div:nth-child(1) p", "privacy1Desc"], ["#privacy .privacy-list > div:nth-child(2) strong", "privacy2Title"], ["#privacy .privacy-list > div:nth-child(2) p", "privacy2Desc"], ["#privacy .privacy-list > div:nth-child(3) strong", "privacy3Title"], ["#privacy .privacy-list > div:nth-child(3) p", "privacy3Desc"],
    ["#download-title", "downloadTitle", true], ["#download .download-copy > p", "downloadDesc"], ["#download .download-actions .button-copy", "downloadCta"], ["#download .download-note", "downloadNote"],
    [".footer-main p", "footerTagline"], [".footer-links a:nth-child(1)", "footerFeatures"], [".footer-links a:nth-child(2)", "footerPrivacy"], [".footer-links a:nth-child(3)", "footerDownload"], [".footer-links a:nth-child(4)", "footerTop"], [".footer-bottom span:nth-child(1)", "footerCopyright"], [".footer-bottom span:nth-child(2)", "footerMotto"]
  ];

  function resolveLanguage(selection) {
    if (selection !== "system") return selection;
    const systemLanguage = (navigator.language || "en-US").toLowerCase();
    const exactMatch = Object.keys(localePacks).find((locale) => locale.toLowerCase() === systemLanguage);
    if (exactMatch) return exactMatch;
    if (systemLanguage.startsWith("zh-") && ["tw", "hk", "mo"].some((region) => systemLanguage.endsWith(`-${region}`))) {
      return "zh-TW";
    }
    const languageCode = systemLanguage.split("-")[0];
    return Object.keys(localePacks).find((locale) => locale.toLowerCase().split("-")[0] === languageCode) || "en-US";
  }

  function applyLanguage(selection) {
    const locale = resolveLanguage(selection);
    const strings = {
      ...baseEnglish,
      ...(locale === "zh-TW" ? localePacks["zh-CN"] : {}),
      ...(localePacks[locale] || {})
    };
    bindings.forEach(([selector, keyOrKeys, useHtml]) => {
      const elements = document.querySelectorAll(selector);
      const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
      elements.forEach((element, index) => {
        const value = strings[keys[index] || keys[keys.length - 1]];
        if (value === undefined) return;
        if (useHtml) element.innerHTML = value;
        else element.textContent = value;
      });
    });
    ["system", "light", "dark"].forEach((theme, index) => {
      const option = themeSelect?.options[index];
      if (option) option.textContent = strings[theme];
    });
    document.title = strings.pageTitle;
    if (descriptionMeta) descriptionMeta.content = strings.pageDescription;
    document.querySelector(".wordmark")?.setAttribute("aria-label", strings.homeAria);
    document.querySelector(".site-nav")?.setAttribute("aria-label", strings.navAria);
    document.querySelector(".site-settings")?.setAttribute("aria-label", strings.settingsAria);
    languageSelect?.setAttribute("aria-label", strings.languageAria);
    themeSelect?.setAttribute("aria-label", strings.themeAria);
    document.querySelector(".hero-stage")?.setAttribute("aria-label", strings.stageAria);
    if (menuToggle) menuToggle.setAttribute("aria-label", siteNav?.classList.contains("is-open") ? strings.menuClose : strings.menuOpen);
    root.lang = locale;
    root.dir = locale === "ar-SA" ? "rtl" : "ltr";
    root.dataset.locale = locale;
  }

  function applyTheme(theme) {
    if (theme === "system") root.removeAttribute("data-theme");
    else root.dataset.theme = theme;
    if (themeSelect) themeSelect.value = theme;
  }

  const savedLanguage = storage.get("nearflow-website-language", "system");
  const savedTheme = storage.get("nearflow-website-theme", "system");
  if (languageSelect) {
    languageSelect.value = savedLanguage;
    applyLanguage(savedLanguage);
    languageSelect.addEventListener("change", () => {
      storage.set("nearflow-website-language", languageSelect.value);
      applyLanguage(languageSelect.value);
    });
  } else applyLanguage(savedLanguage);
  applyTheme(savedTheme);
  themeSelect?.addEventListener("change", () => {
    storage.set("nearflow-website-theme", themeSelect.value);
    applyTheme(themeSelect.value);
  });

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      const locale = root.dataset.locale || "en-US";
      const strings = { ...baseEnglish, ...(localePacks[locale] || {}) };
      menuToggle.setAttribute("aria-label", isOpen ? strings.menuClose : strings.menuOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        const locale = root.dataset.locale || "en-US";
        const strings = { ...baseEnglish, ...(localePacks[locale] || {}) };
        menuToggle.setAttribute("aria-label", strings.menuOpen);
      });
    });
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px" });

  revealItems.forEach((item) => revealObserver.observe(item));
})();
