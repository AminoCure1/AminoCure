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

  const path = window.location.pathname;
  const isProjectsPage = /projects\.html/i.test(path);
  const isCertificatesPage = /certificates\.html/i.test(path);

  const originalTitle = document.title;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  const originalDescription = descriptionMeta ? descriptionMeta.content : "";

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
  // 3. زر الوضع اللوني
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
  // 4. الترجمات (الإنجليزية فقط)
  // النص العربي يُحفظ تلقائيًا من الصفحة نفسها
  //
  // الشكل: [المحدد, الإنجليزية, "text" اختياري]
  // "text" = يستبدل النص فقط ويُبقي الأيقونات داخل العنصر
  // ========================================

  const translations = [

    // ---------- القائمة (بالـ href وليس بالترتيب) ----------
    ['.nav a[href$="#home"]', "Home"],
    ['.nav a[href$="#services"]', "Services"],
    ['.nav a[href$="#about"]', "About Me"],
    ['.nav a[href$="#work"]', "My Work"],
    ['.nav a[href$="projects.html"]', "My Projects"],
    ['.nav a[href*="Trainee-Guide"]', "Trainee Guide"],
    ['.nav a[href$="#certificates"], .nav a[href$="certificates.html"]', "Certificates & Courses"],
    ['.nav a[href$="#faq"]', "FAQ"],
    ['.nav a[href$="#contact"]', "Contact"],

    // ---------- الواجهة الرئيسية ----------
    [".eyebrow", "Pharmacy • Health Education • Content Creation", "text"],

    [".hero h1 .gradient-text", "Simpler Knowledge, Better Health."],

    [
      ".hero-description",
      "Simplified pharmaceutical content that helps you understand medicines and health information in a clear and reliable way."
    ],

    [".hero-actions .btn-primary", "About Me <span>→</span>"],
    [".hero-actions .btn-secondary", "View My Work"],

    [
      ".hero-note span:last-child",
      "Better understanding starts with clear information."
    ],

    // ---------- الخدمات ----------
    ["#services .section-tag", "What I Offer"],

    [
      "#services .section-heading h2",
      'Health Knowledge <span class="gradient-text">Made Simpler</span>'
    ],

    [
      "#services .section-heading p",
      "Clear content and thoughtful design that make information easier to understand."
    ],

    ["#services .service-card:nth-child(1) h3", "Pharmaceutical Content"],
    [
      "#services .service-card:nth-child(1) p",
      "Simplifying information about medicines and pharmaceutical concepts in clear, accessible language."
    ],

    ["#services .service-card:nth-child(2) h3", "Health Education"],
    [
      "#services .service-card:nth-child(2) p",
      "Creating educational content that helps people better understand health information."
    ],

    ["#services .service-card:nth-child(3) h3", "Medical Content Design"],
    [
      "#services .service-card:nth-child(3) p",
      "Presenting health information through organized, easy-to-read visual designs."
    ],

    [".service-card .card-arrow", "→"],

    // ---------- من أنا ----------
    ["#about .section-tag", "About Me"],
    ["#about .about-card-label", "A Short Introduction"],
    ["#about .about-card-title", "Welcome to my world!"],

    [
      "#about .about-text p:nth-child(1)",
      "I am Amin Taj El-Din Osman, with an interest in pharmacy and health content creation. Through Amino Cure, I aim to present medical and pharmaceutical information in a simple, clear, and approachable way."
    ],

    [
      "#about .about-text p:nth-child(2)",
      "I believe that when accurate health information is communicated clearly, it helps people understand their health and use their medicines more responsibly."
    ],

    ["#about .about-tags span:nth-child(1)", "💊 Pharmacy"],
    ["#about .about-tags span:nth-child(2)", "✦ Health Education"],
    ["#about .about-tags span:nth-child(3)", "✎ Medical Content"],

    // ---------- أعمالي (بطاقة المشاريع) ----------
    ["#work .section-tag", "My Work & Projects"],

    [
      "#work .section-heading h2",
      'Ideas Turned Into <span class="gradient-text">Useful Projects</span>'
    ],

    [
      "#work .section-heading p",
      "Explore my digital projects in pharmacy and health education."
    ],

    [".projects-cta h3", "From Idea to Application"],

    [
      ".projects-cta p",
      "Learn about the projects I'm working on, and discover their goals and features."
    ],

    [".projects-cta-button span", "Explore My Projects"],

    // ---------- الشهادات (الصفحة الرئيسية + صفحة الشهادات) ----------
    ["#certificates .section-tag", "My Certificates"],

    [
      "#certificates .section-heading h1, #certificates .section-heading h2",
      'My Learning <span class="gradient-text">Journey</span>'
    ],

    [
      "#certificates .section-heading h2 ~ p",
      "My certificates and courses, with available verification links."
    ],

    [
      "#certificates .section-heading h1 ~ p",
      "A collection of certificates and courses I completed throughout my educational and professional journey, with available verification links."
    ],

    [".certificate-button", "🔗 Verify Certificate"],
    [".certificate-no-link", "No verification link"],

    ['#certificates a[href="./certificates.html"]', "View All Certificates →"],

    ['a.btn-primary[href="index.html#certificates"]', "Back to Home"],

    // عناوين الشهادات المكتوبة بالعربية (صفحة الشهادات فقط)
    [
      ".certificates-grid:not(.certificates-featured-grid) .certificate-card:nth-child(8) h3",
      "Business Writing"
    ],
    [
      ".certificates-grid:not(.certificates-featured-grid) .certificate-card:nth-child(11) h3",
      "Effective Time Management"
    ],
    [
      ".certificates-grid:not(.certificates-featured-grid) .certificate-card:nth-child(13) h3",
      "Business Ethics and Professional Conduct"
    ],
    [
      ".certificates-grid:not(.certificates-featured-grid) .certificate-card:nth-child(16) h3",
      "Positive Energy"
    ],

    // ---------- الأسئلة الشائعة ----------
    ["#faq .section-tag", "Frequently Asked Questions"],

    [
      "#faq .section-heading h2",
      'Have a Question? <span class="gradient-text">Find the Answer</span>'
    ],

    [
      "#faq .section-heading p",
      "Quick answers about the content, services, and collaboration."
    ],

    ["#faq details:nth-child(1) summary", "What type of content do you create?", "text"],
    [
      "#faq details:nth-child(1) > p",
      "I create simplified pharmaceutical and health education content, along with visual posts and designs that communicate information clearly."
    ],

    ["#faq details:nth-child(2) summary", "Does this content replace professional advice?", "text"],
    [
      "#faq details:nth-child(2) > p",
      "No. This content is for general education only and does not replace advice from a doctor or pharmacist, especially when choosing a medicine or changing its dose."
    ],

    ["#faq details:nth-child(3) summary", "How can I request a service or collaboration?", "text"],
    [
      "#faq details:nth-child(3) > p",
      'You can contact me through the links in the "Contact" section and describe the service or collaboration you have in mind.'
    ],

    ["#faq details:nth-child(4) summary", "Can you create custom content?", "text"],
    [
      "#faq details:nth-child(4) > p",
      "Yes. We can discuss the idea, its purpose, and the requirements before starting the project."
    ],

    ["#faq details:nth-child(5) summary", "How long does a project take?", "text"],
    [
      "#faq details:nth-child(5) > p",
      "The timeline depends on the type and scope of the project. A delivery date can be agreed upon once the details are confirmed."
    ],

    // ---------- قسم المتابعة ----------
    [".follow-card h2", "Follow My Pharmaceutical Content"],

    [
      ".follow-description",
      "I share simplified drug information, health awareness, and pharmaceutical content that helps you understand medical information clearly."
    ],

    [".facebook-btn", "Follow me on Facebook"],
    [".instagram-btn", "Follow me on Instagram"],

    // ---------- التواصل ----------
    ["#contact .section-tag", "Contact"],

    [
      "#contact .contact-panel h2",
      'Have an Idea? <span class="gradient-text">Let’s Get Started</span>'
    ],

    [
      "#contact .contact-panel > p",
      "Get in touch for questions, inquiries, and collaboration on pharmaceutical and health content projects."
    ],

    // ---------- صفحة المشاريع ----------
    [".projects-page-intro .section-tag", "Portfolio"],

    [
      ".projects-page-intro h1",
      'My <span class="gradient-text">Digital Projects</span>'
    ],

    [
      ".projects-page-intro p",
      "A collection of projects I'm working on to deliver useful ideas in pharmacy, health education, and digital learning."
    ],

    [".projects-disclaimer-content h3", "Apps are still under development and testing"],

    [
      ".projects-disclaimer-content p",
      "The projects shown here are not complete yet and are still in the development and testing stage. The information in them is not accurate enough to rely on at this time and may contain errors or gaps. Do not use them to make any treatment or medication decision, and always refer to approved references and consult a doctor or pharmacist."
    ],

    [
      ".projects-disclaimer-note",
      "Amino Cure — Knowledge is for learning, and patient safety comes first."
    ],

    // المشروع 1
    [".projects-page-card:nth-child(1) .projects-page-category", "Web Project", "text"],
    [".projects-page-card:nth-child(1) h3", "Pharmacy Trainee Guide"],
    [
      ".projects-page-card:nth-child(1) .projects-page-content > p",
      "An online guide that helps trainees discover information and resources that may support them throughout their training journey."
    ],
    [".projects-page-card:nth-child(1) .projects-page-button span", "Visit Project"],

    // المشروع 2
    [".projects-page-card:nth-child(2) .projects-page-category", "Educational App", "text"],
    [
      ".projects-page-card:nth-child(2) .projects-page-content > p",
      "An interactive educational app for reviewing pharmaceutical information and practicing with questions and flashcards."
    ],
    [".projects-page-card:nth-child(2) .projects-page-button span", "Try the App"],

    // المشروع 3
    [".projects-page-card:nth-child(3) .projects-page-category", "Pharmacy System", "text"],
    [
      ".projects-page-card:nth-child(3) .projects-page-content > p",
      "A project for managing pharmacy inventory, organizing products and batches, and tracking expiry dates and stock movements, with a focus on ease of use and offline operation."
    ],
    [".projects-page-card:nth-child(3) .projects-page-button span", "Explore the Project"],

    // المشروع 4
    [".projects-page-card:nth-child(4) .projects-page-category", "Pharmaceutical Reference", "text"],
    [".projects-page-card:nth-child(4) h3", "Pregnancy & Lactation Reference"],
    [
      ".projects-page-card:nth-child(4) .projects-page-content > p",
      "A simplified pharmaceutical reference for looking up drug safety information during pregnancy and breastfeeding, with an educational guide on pregnancy stages and fetal development."
    ],
    [".projects-page-card:nth-child(4) .projects-page-button span", "Visit the App"],

    // المشروع 5
    [".projects-page-card:nth-child(5) .projects-page-category", "Online Store", "text"],
    [".projects-page-card:nth-child(5) h3", "Amino Cure Pharmacy Store"],
    [
      ".projects-page-card:nth-child(5) .projects-page-content > p",
      "An online store for Amino Cure Pharmacy to display products and make ordering simple and fast."
    ],
    [".projects-page-card:nth-child(5) .projects-page-button span", "Visit the Store"],

    // حالة المشاريع + العودة
    [".projects-page-status", "Under development — not yet complete", "text"],
    [".projects-page-back a", "Back to Home", "text"],

    // ---------- التنويه الطبي والتذييل ----------
    [
      ".medical-disclaimer p",
      "<strong>Medical Disclaimer:</strong> This content is for educational purposes only. It does not replace consultation with a doctor or pharmacist, nor does it replace diagnosis or treatment."
    ],

    [".footer > p:not(.copyright)", "Simpler Knowledge, Better Health."]
  ];

  // آخر نص مباشر داخل العنصر (للعناصر التي تحتوي أيقونات)
  function getLastTextNode(element) {
    const nodes = Array.prototype.filter.call(
      element.childNodes,
      function (node) {
        return node.nodeType === 3 && node.textContent.trim() !== "";
      }
    );

    return nodes.length ? nodes[nodes.length - 1] : null;
  }

  // ========================================
  // 5. تطبيق اللغة
  // ========================================

  function applyLanguage(language) {
    currentLanguage = language;

    html.lang = language;
    html.dir = language === "ar" ? "rtl" : "ltr";

    translations.forEach(function (item) {
      const selector = item[0];
      const english = item[1];
      const mode = item[2];

      document.querySelectorAll(selector).forEach(function (element) {

        if (mode === "text") {
          const node = getLastTextNode(element);
          if (!node) return;

          if (node.arOriginal === undefined) {
            node.arOriginal = node.textContent;
          }

          node.textContent =
            language === "ar" ? node.arOriginal : " " + english + " ";

          return;
        }

        if (element.dataset.arHtml === undefined) {
          element.dataset.arHtml = element.innerHTML;
        }

        element.innerHTML =
          language === "ar" ? element.dataset.arHtml : english;
      });
    });

    // النصوص العائمة
    const floatingArabic = ["صيدلة", "محتوى", "أمينو"];
    const floatingEnglish = ["Pharmacy", "Content", "Amino"];

    document.querySelectorAll(".float-item").forEach(function (element, index) {
      element.textContent =
        language === "ar" ? floatingArabic[index] : floatingEnglish[index];
    });

    // النصوص البديلة
    const profileImage = document.querySelector(".profile-image");

    if (profileImage) {
      profileImage.alt = language === "ar"
        ? "صورة صاحب Amino Cure"
        : "Amino Cure founder profile photo";
    }
    // ترجمة التلميحات والنصوص الخفية
    const hiddenTexts = [
      ["#backToTop", "Back to top"],
      [".medical-disclaimer", "Medical disclaimer"],
      ['.social-link[href^="mailto"]', "Email"],
      ['.social-link[href*="t.me"]', "Telegram"],
      ['.social-link[href*="linkedin"]', "LinkedIn"],
      ['.social-link[href*="instagram"]', "Instagram"],
      ['.social-link[href*="facebook"]', "Facebook"],
      ['.social-link[href*="wa.me"]', "WhatsApp"],
      ['a[aria-label^="عرض شهادة"]', "View certificate"]
    ];

    hiddenTexts.forEach(function (item) {
      document.querySelectorAll(item[0]).forEach(function (element) {
        ["aria-label", "title"].forEach(function (attr) {
          if (!element.hasAttribute(attr)) return;

          const key = "ar" + attr.replace("-", "");
          if (element.dataset[key] === undefined) {
            element.dataset[key] = element.getAttribute(attr);
          }

          element.setAttribute(
            attr,
            language === "ar" ? element.dataset[key] : item[1]
          );
        });
      });
    });

    const followProfile = document.querySelector(".follow-profile");

    if (followProfile) {
      if (followProfile.dataset.arAlt === undefined) {
        followProfile.dataset.arAlt = followProfile.alt;
      }

      followProfile.alt =
        language === "ar" ? followProfile.dataset.arAlt : "Amin - Amino Cure";
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
    if (language === "ar") {
      document.title = originalTitle;

      if (descriptionMeta) {
        descriptionMeta.content = originalDescription;
      }
    } else {
      let englishTitle = "Amino Cure | Simpler Knowledge, Better Health";
      let englishDescription =
        "Amino Cure — Simplified pharmaceutical content, health education, and medical content design.";

      if (isProjectsPage) {
        englishTitle = "My Projects | Amino Cure";
        englishDescription =
          "Discover Amin Taj El-Din Osman's projects in pharmacy, health education, and educational apps.";
      } else if (isCertificatesPage) {
        englishTitle = "Certificates & Courses | Amino Cure";
        englishDescription =
          "Browse Amin Taj El-Din Osman's certificates and courses in pharmacy, health education, and professional development.";
      }

      document.title = englishTitle;

      if (descriptionMeta) {
        descriptionMeta.content = englishDescription;
      }
    }

    updateThemeButton();

    // تسمية قائمة الهاتف
    if (menuToggle) {
      const isOpen = nav && nav.classList.contains("open");

      menuToggle.setAttribute(
        "aria-label",
        language === "ar"
          ? (isOpen ? "إغلاق القائمة" : "فتح القائمة")
          : (isOpen ? "Close menu" : "Open menu")
      );
    }

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
      if (window.innerWidth > 1100) {
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

  // ========================================
  // 9. تحميل صور صفحة الشهادات مسبقًا
  // ========================================

  if (!isCertificatesPage) {
    const certificateImages = [13, 15, 17, 18, 16, 14, 1, 7, 5, 8, 4, 10, 9, 6, 11, 3, 2, 19, 20, 21];

    const preloadCertificates = function () {
      certificateImages.forEach(function (number) {
        const image = new Image();
        image.decoding = "async";
        image.src = "certificate" + number + ".webp";
      });
    };

    window.addEventListener("load", function () {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(preloadCertificates, { timeout: 3000 });
      } else {
        window.setTimeout(preloadCertificates, 1500);
      }
    });
  }
});
