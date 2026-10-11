/* ========================================
   AMINO CURE — INTERACTIONS & LANGUAGES
======================================== */

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const html = document.documentElement;

  const themeToggle = document.getElementById("themeToggle");
  const languageToggle = document.getElementById("languageToggle");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const year = document.getElementById("year");

  // تحديث السنة تلقائياً
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ========================================
  // 1. الوضع الداكن والفاتح
  // ========================================

  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("amino-cure-theme");
  } catch (error) {
    savedTheme = null;
  }

  if (savedTheme === "dark") {
    body.classList.add("dark");
  } else if (savedTheme === "light") {
    body.classList.remove("dark");
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    body.classList.add("dark");
  }

  // ========================================
  // 2. اللغة الحالية
  // ========================================

  let currentLanguage = "ar";

  try {
    const savedLanguage = localStorage.getItem("amino-cure-language");

    if (savedLanguage === "en" || savedLanguage === "ar") {
      currentLanguage = savedLanguage;
    }
  } catch (error) {
    currentLanguage = "ar";
  }

  // ========================================
  // 3. تحديث زر الوضع اللوني
  // ========================================

  function updateThemeButton() {
    if (!themeToggle) return;

    const isDark = body.classList.contains("dark");

    themeToggle.textContent = isDark ? "☀" : "☾";

    themeToggle.setAttribute(
      "aria-label",
      isDark
        ? (currentLanguage === "ar"
            ? "تفعيل الوضع الفاتح"
            : "Enable light mode")
        : (currentLanguage === "ar"
            ? "تفعيل الوضع الداكن"
            : "Enable dark mode")
    );

    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      body.classList.toggle("dark");

      const currentTheme = body.classList.contains("dark")
        ? "dark"
        : "light";

      try {
        localStorage.setItem("amino-cure-theme", currentTheme);
      } catch (error) {
        // يستمر التبديل حتى لو تعذر الحفظ
      }

      updateThemeButton();
    });
  }

  // ========================================
  // 4. ترجمات الموقع
  // ========================================

  const translations = [
    // القائمة الرئيسية
    [".nav a:nth-child(1)", "الرئيسية", "Home"],
    [".nav a:nth-child(2)", "الخدمات", "Services"],
    [".nav a:nth-child(3)", "من أنا؟", "About Me"],
    [".nav a:nth-child(4)", "أعمالي", "Portfolio"],
    [".nav a:nth-child(5)", "الشهادات والدورات", "Certificates & Courses"],
    [".nav a:nth-child(6)", "الأسئلة الشائعة", "FAQ"],
    [".nav a:nth-child(7)", "تواصل معي", "Contact"],

    // الواجهة الرئيسية
    [
      ".eyebrow",
      "صيدلة • تثقيف صحي • صناعة محتوى",
      "Pharmacy • Health Education • Content Creation"
    ],

    [
      ".hero h1 .gradient-text",
      "معلومة أبسط، حياة أفضل.",
      "Simpler Knowledge, Better Health."
    ],

    [
      ".hero-description",
      "محتوى صيدلاني مبسّط يساعدك على فهم الأدوية والمعلومات الصحية بطريقة واضحة وموثوقة.",
      "Simplified pharmaceutical content that helps you understand medicines and health information in a clear and reliable way."
    ],

    [
      ".hero-actions .btn-primary",
      'تعرّف عني <span>←</span>',
      'About Me <span>→</span>'
    ],

    [
      ".hero-actions .btn-secondary",
      "شاهد أعمالي",
      "View My Work"
    ],

    [
      ".hero-note span:last-child",
      "المعلومة الصحيحة تبدأ بفهم أبسط.",
      "Better understanding starts with clear information."
    ],

    // الخدمات
    ["#services .section-tag", "ماذا أقدّم؟", "What I Offer"],

    [
      "#services .section-heading h2",
      'معرفة صحية <span class="gradient-text">بطريقة أبسط.</span>',
      'Health Knowledge <span class="gradient-text">Made Simpler.</span>'
    ],

    [
      "#services .section-heading p",
      "محتوى واضح وتصميم منظم يساعد على إيصال المعلومة بصورة أفضل.",
      "Clear content and thoughtful design that make information easier to understand."
    ],

    [
      "#services .service-card:nth-child(1) h3",
      "المحتوى الصيدلاني",
      "Pharmaceutical Content"
    ],

    [
      "#services .service-card:nth-child(1) p",
      "تبسيط المعلومات المتعلقة بالأدوية والمفاهيم الصيدلانية بلغة سهلة وواضحة.",
      "Simplifying information about medicines and pharmaceutical concepts in clear, accessible language."
    ],

    [
      "#services .service-card:nth-child(2) h3",
      "التثقيف الصحي",
      "Health Education"
    ],

    [
      "#services .service-card:nth-child(2) p",
      "إعداد محتوى توعوي يساعد الناس على فهم المعلومات الصحية بصورة أفضل.",
      "Creating educational content that helps people better understand health information."
    ],

    [
      "#services .service-card:nth-child(3) h3",
      "تصميم المحتوى الطبي",
      "Medical Content Design"
    ],

    [
      "#services .service-card:nth-child(3) p",
      "تنسيق المعلومات الصحية في تصاميم بصرية مرتبة وسهلة القراءة.",
      "Presenting health information through organized, easy-to-read visual designs."
    ],

    // من أنا
    ["#about .section-tag", "من أنا؟", "About Me"],

    [
      "#about .about-text p:nth-child(1)",
      "أنا أمين تاج الدين عثمان، مهتم بمجال الصيدلة وصناعة المحتوى الصحي، وأسعى من خلال Amino Cure إلى تقديم المعلومات الطبية والصيدلانية بطريقة بسيطة وواضحة وقريبة من الناس.",
      "I am Amin Taj El-Din Osman, with an interest in pharmacy and health content creation. Through Amino Cure, I aim to present medical and pharmaceutical information in a simple, clear, and approachable way."
    ],

    [
      "#about .about-text p:nth-child(2)",
      "أؤمن أن المعلومة الصحية الصحيحة، لما تصل بصورة سهلة، بتساعد الناس على فهم صحتهم والتعامل مع أدويتهم بوعي أكبر.",
      "I believe that when accurate health information is communicated clearly, it helps people understand their health and use their medicines more responsibly."
    ],

    // الأعمال
    ["#work .section-tag", "أعمالي", "My Work"],

    [
      "#work .section-heading p",
      "نماذج من الأعمال والمشاريع التي أعمل عليها في صناعة المحتوى الصحي.",
      "A selection of projects and work in health content creation."
    ],

    [
      ".work-placeholder-title",
      "مساحة إبداعية",
      "Creative Space"
    ],

    [
      ".work-placeholder-text",
      "ستُضاف نماذج الأعمال هنا لاحقاً",
      "Portfolio examples will be added here soon."
    ],

    [
      "#work .work-footer h3",
      "أعمال Amino Cure",
      "Amino Cure Portfolio"
    ],

    [
      ".work-count",
      "قريباً ↙",
      "Coming Soon ↙"
    ],

    [
      ".section-footnote",
      "سنضيف صور الأعمال وروابطها بعد تجهيزها.",
      "Project images and links will be added once they are ready."
    ],

    // الشهادات والدورات
    [
      "#certificates .section-tag",
      "شهاداتي",
      "My Certificates"
    ],

    [
      "#certificates .section-heading h2",
      'رحلتي في التعلّم <span class="gradient-text">والتطوير</span>',
      'My Learning <span class="gradient-text">Journey</span>'
    ],

    [
      "#certificates .section-heading p",
      "شهاداتي ودوراتي التعليمية مع روابط التحقق المتاحة.",
      "My certificates and courses, with available verification links."
    ],

    // ملاحظة: لا نترجم عناصر h3 داخل بطاقات الشهادات،
    // حتى تبقى أسماء الشهادات الأصلية كما هي في HTML.

    // زر عرض باقي الشهادات
    [
      "#certificates .more-certificates > summary",
      'عرض باقي الشهادات (20) <span aria-hidden="true">＋</span>',
      'View Remaining Certificates (20) <span aria-hidden="true">＋</span>'
    ],

    // الأسئلة الشائعة
    [
      "#faq .section-tag",
      "أسئلة شائعة",
      "Frequently Asked Questions"
    ],

    [
      "#faq .section-heading h2",
      'عندك سؤال؟ <span class="gradient-text">الإجابة هنا</span>',
      'Have a Question? <span class="gradient-text">Find the Answer</span>'
    ],

    [
      "#faq .section-heading p",
      "إجابات مختصرة عن المحتوى والخدمات وطرق التعاون.",
      "Quick answers about the content, services, and collaboration."
    ],

    [
      "#faq details:nth-child(1) summary",
      'ما نوع المحتوى الذي تقدّمه؟ <span class="faq-icon">＋</span>',
      'What type of content do you create? <span class="faq-icon">＋</span>'
    ],

    [
      "#faq details:nth-child(1) > p",
      "أقدّم محتوى صيدلانيًا وتثقيفًا صحيًا مبسّطًا، إضافة إلى تصميم منشورات وصور تساعد على توصيل المعلومة بوضوح.",
      "I create simplified pharmaceutical and health education content, along with visual posts and designs that communicate information clearly."
    ],

    [
      "#faq details:nth-child(2) summary",
      'هل المحتوى بديل عن استشارة الطبيب أو الصيدلي؟ <span class="faq-icon">＋</span>',
      'Does this content replace professional advice? <span class="faq-icon">＋</span>'
    ],

    [
      "#faq details:nth-child(2) > p",
      "لا، المحتوى للتثقيف العام فقط، ولا يغني عن استشارة الطبيب أو الصيدلي، خاصة عند اختيار دواء أو تعديل جرعته.",
      "No. This content is for general education only and does not replace advice from a doctor or pharmacist, especially when choosing a medicine or changing its dose."
    ],

    [
      "#faq details:nth-child(3) summary",
      'كيف أطلب خدمة أو تعاونًا؟ <span class="faq-icon">＋</span>',
      'How can I request a service or collaboration? <span class="faq-icon">＋</span>'
    ],

    [
      "#faq details:nth-child(3) > p",
      "يمكنك التواصل معي عبر وسائل التواصل الموجودة في قسم «تواصل معي»، مع توضيح نوع الخدمة أو فكرة التعاون.",
      'You can contact me through the links in the "Contact" section and describe the service or collaboration you have in mind.'
    ],

    [
      "#faq details:nth-child(4) summary",
      'هل يمكن تصميم محتوى حسب الطلب؟ <span class="faq-icon">＋</span>',
      'Can you create custom content? <span class="faq-icon">＋</span>'
    ],

    [
      "#faq details:nth-child(4) > p",
      "نعم، يمكن مناقشة فكرة المحتوى والهدف منه وتحديد التفاصيل المناسبة قبل بدء العمل.",
      "Yes. We can discuss the idea, its purpose, and the requirements before starting the project."
    ],

    [
      "#faq details:nth-child(5) summary",
      'كم تستغرق مدة التنفيذ؟ <span class="faq-icon">＋</span>',
      'How long does a project take? <span class="faq-icon">＋</span>'
    ],

    [
      "#faq details:nth-child(5) > p",
      "تختلف المدة حسب نوع العمل وحجمه، ويتم الاتفاق على موعد التسليم بعد تحديد التفاصيل.",
      "The timeline depends on the type and scope of the project. A delivery date can be agreed upon once the details are confirmed."
    ],

    // التواصل
    ["#contact .section-tag", "التواصل", "Contact"],

    [
      "#contact .contact-panel h2",
      'عندك فكرة؟ <span class="gradient-text">خلينا نبدأ</span>',
      'Have an Idea? <span class="gradient-text">Let’s Get Started</span>'
    ],

    [
      "#contact .contact-panel > p",
      "للتواصل والاستفسارات والتعاون في مشاريع المحتوى الصيدلاني والصحي.",
      "Get in touch for questions, inquiries, and collaboration on pharmaceutical and health content projects."
    ],

    // التنويه الطبي
    [
      ".medical-disclaimer p",
      "<strong>تنويه طبي:</strong> المحتوى للتثقيف الصحي فقط، ولا يُغني عن استشارة الطبيب أو الصيدلي، ولا يُعدّ بديلًا عن التشخيص أو العلاج.",
      "<strong>Medical Disclaimer:</strong> This content is for educational purposes only. It does not replace consultation with a doctor or pharmacist, nor does it replace diagnosis or treatment."
    ],

    // التذييل
    [
      ".footer > p:not(.copyright)",
      "معلومة أبسط، حياة أفضل.",
      "Simpler Knowledge, Better Health."
    ]
  ];

  // ========================================
  // 5. تطبيق اللغة
  // ========================================

  function applyLanguage(language) {
    currentLanguage = language;

    html.lang = language;
    html.dir = language === "ar" ? "rtl" : "ltr";

    // تغيير النصوص المحددة فقط
    translations.forEach(function (item) {
      const selector = item[0];
      const arabic = item[1];
      const english = item[2];

      document.querySelectorAll(selector).forEach(function (element) {
        element.innerHTML = language === "ar" ? arabic : english;
      });
    });

    // النصوص العائمة
    const floatingLabels = document.querySelectorAll(".float-item");

    const floatingArabic = ["صيدلة", "محتوى", "أمينو"];
    const floatingEnglish = ["Pharmacy", "Content", "Amino"];

    floatingLabels.forEach(function (element, index) {
      element.textContent =
        language === "ar"
          ? floatingArabic[index]
          : floatingEnglish[index];
    });

    // النصوص البديلة للصور
    document.querySelectorAll(".logo-image").forEach(function (image) {
      image.alt = "Amino Cure";
    });

    const profileImage = document.querySelector(".profile-image");

    if (profileImage) {
      profileImage.alt = language === "ar"
        ? "صورة صاحب Amino Cure"
        : "Amino Cure founder profile photo";
    }

    // زر اللغة
    if (languageToggle) {
      languageToggle.textContent = language === "ar" ? "EN" : "عربي";

      languageToggle.setAttribute(
        "aria-label",
        language === "ar" ? "Switch to English" : "التبديل إلى العربية"
      );

      languageToggle.title =
        language === "ar" ? "Switch to English" : "التبديل إلى العربية";
    }

    // عنوان الصفحة ووصفها
    document.title = language === "ar"
      ? "Amino Cure | معلومة أبسط، حياة أفضل"
      : "Amino Cure | Simpler Knowledge, Better Health";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
      description.content = language === "ar"
        ? "Amino Cure — محتوى صيدلاني وتثقيف صحي مبسط وتصميم محتوى طبي."
        : "Amino Cure — Simplified pharmaceutical content, health education, and medical content design.";
    }

    // تحديث زر الوضع اللوني
    updateThemeButton();

    // تحديث تسمية قائمة الهاتف
    if (menuToggle) {
      const isOpen = nav && nav.classList.contains("open");

      menuToggle.setAttribute(
        "aria-label",
        language === "ar"
          ? (isOpen ? "إغلاق القائمة" : "فتح القائمة")
          : (isOpen ? "Close menu" : "Open menu")
      );
    }

    // حفظ اللغة
    try {
      localStorage.setItem("amino-cure-language", language);
    } catch (error) {
      // تعمل اللغة حتى لو تعذر الحفظ
    }
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", function () {
      applyLanguage(currentLanguage === "ar" ? "en" : "ar");
    });
  }

  // ========================================
  // 6. قائمة الهاتف
  // ========================================

  function closeMenu() {
    if (!nav || !menuToggle) return;

    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
      "aria-label",
      currentLanguage === "ar" ? "فتح القائمة" : "Open menu"
    );
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");

      menuToggle.textContent = isOpen ? "✕" : "☰";

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        currentLanguage === "ar"
          ? (isOpen ? "إغلاق القائمة" : "فتح القائمة")
          : (isOpen ? "Close menu" : "Open menu")
      );
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 700) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // ========================================
  // 7. ظهور الأقسام عند التمرير
  // ========================================

  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  }

  // ========================================
  // 8. زر الرجوع للأعلى
  // ========================================

  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("visible", window.scrollY > 300);
    }, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // تطبيق اللغة المحفوظة عند فتح الموقع
  applyLanguage(currentLanguage);
});
