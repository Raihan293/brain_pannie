(() => {
  const header = document.querySelector('header');
  if (!header) return;

  const ADD_AT = 120;
  const REMOVE_AT = 40;
  let ticking = false;

  function update() {
    const scY = window.scrollY || window.pageYOffset;
    const isScrolled = header.classList.contains('scrolled');

    if (isScrolled) {
      if (scY <= REMOVE_AT) header.classList.remove('scrolled');
    } else if (scY > ADD_AT) {
      header.classList.add('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();

  // ===== Mobile Menu (ElementsKit style offcanvas drawer) =====
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileMenuDrawer');
  const overlay = document.getElementById('mobileMenuOverlay');
  const closeBtn = document.getElementById('mobileMenuClose');

  function openMenu() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger && drawer && overlay) {
    hamburger.addEventListener('click', () => {
      if (drawer.classList.contains('active')) closeMenu();
      else openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close on link click (excluding the dropdown toggle)
    drawer.querySelectorAll('.mobile-link:not(.mobile-dropdown-toggle)').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Mobile dropdown toggle
    drawer.querySelectorAll('.mobile-dropdown-toggle').forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle.closest('.mobile-dropdown').classList.toggle('open');
      });
    });
  }

  // ===== Footer Form (demo submit, no backend) =====
  const contactForm = document.querySelector('.footer-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      const msg = document.getElementById('formMessage');
      if (msg) msg.style.display = 'block';
      contactForm.querySelector('.submit-btn').disabled = true;
    });
  }

  // ===== Home Subscribe form (demo submit, no backend) =====
  const subscribeForm = document.querySelector('.subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!subscribeForm.checkValidity()) {
        subscribeForm.reportValidity();
        return;
      }
      const msg = subscribeForm.querySelector('.form-message');
      if (msg) msg.style.display = 'block';
      subscribeForm.querySelector('.submit-btn').disabled = true;
    });
  }

  // ===== Home section reveal animations =====
  const homeSection = document.querySelector('main section');

  function reveal(el, kind, delay) {
    if (!el || el.classList.contains('reveal')) return;
    el.classList.add('reveal', kind);
    if (delay) el.style.setProperty('--d', delay + 'ms');
  }

  if (homeSection) {
    // Focus / Service blocks – alternate the slide-in direction
    homeSection.querySelectorAll('.flex.items-center.gap-20.justify-between').forEach((block) => {
      const img = block.querySelector('img');
      const text = block.querySelector('.flex.flex-col.items-center');
      const isImgFirst = img === block.firstElementChild;

      reveal(isImgFirst ? img : text, 'reveal-left', 80);
      reveal(isImgFirst ? text : img, 'reveal-right', 200);

      if (text) {
        reveal(text.querySelector('h2'), 'reveal-up', 280);
        reveal(text.querySelector('p'), 'reveal-up', 420);
        reveal(text.querySelector('a.btn'), 'reveal-up', 560);
      }
    });

    // Labels, headings and descriptions stagger in
    homeSection.querySelectorAll('.footer-label').forEach((el, i) => reveal(el, 'reveal-down', i * 100));
    homeSection.querySelectorAll('.footer-heading').forEach((el, i) => reveal(el, 'reveal-up', 80 + i * 120));
    homeSection.querySelectorAll('.footer-desc').forEach((el, i) => reveal(el, 'reveal-up', 160 + i * 120));

    // Client logos – staggered by grid column / row
    homeSection.querySelectorAll('.imageH').forEach((el, i) => {
      reveal(el, 'reveal-zoom', (i % 4) * 90 + Math.floor(i / 4) * 50);
    });

    // Book section – same reveal animation as the Focus / Service blocks
    const bookGrid = document.getElementById('bookGrid');
    if (bookGrid) {
      const img = bookGrid.querySelector('img');
      const button = bookGrid.querySelector('button');

      reveal(img, 'reveal-right', 90);
      reveal(button, 'reveal-up', 480);
    }

    // Contact section – same reveal animation
    const contactGrid = document.getElementById('contactGrid');
    if (contactGrid) {
      const col = contactGrid.children;

      reveal(col[0], 'reveal-left', 60);
      reveal(col[1], 'reveal-right', 140);

      contactGrid.querySelectorAll('.footer-label').forEach((el, i) => reveal(el, 'reveal-down', 180));
      contactGrid.querySelectorAll('.footer-heading').forEach((el, i) => reveal(el, 'reveal-up', 260 + i * 100));
      contactGrid.querySelectorAll('.footer-desc').forEach((el, i) => reveal(el, 'reveal-up', 340 + i * 100));

      contactGrid.querySelectorAll('.footer-contact-list li').forEach((el, i) => reveal(el, 'reveal-up', 480 + i * 80));
      // Form fields bounce in one-by-one
      contactGrid.querySelectorAll('.footer-form .field').forEach((el, i) => {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-bounce')) {
          el.classList.add('reveal-bounce');
          el.style.setProperty('--d', 320 + i * 120 + 'ms');
        }
      });
      contactGrid.querySelectorAll('.footer-form .submit-btn').forEach((el, i) => {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-bounce')) {
          el.classList.add('reveal-bounce');
          el.style.setProperty('--d', 760 + i * 100 + 'ms');
        }
      });
    }
  }

  // ===== My Story section reveal animations (matches Home section) =====
  const storySection = document.getElementById('MyStory');

  function storyReveal(el, kind, delay) {
    if (!el || el.classList.contains('reveal')) return;
    el.classList.add('reveal', kind);
    if (delay) el.style.setProperty('--d', delay + 'ms');
  }

  if (storySection) {
    // Each content grid (About me, Heroin Addict, Second chance, New life, Bonus Time)
    // alternates image <-> text just like Home's book grids.
    storySection.querySelectorAll('#bookGrid').forEach((grid) => {
      const children = Array.from(grid.children).filter((c) => c.tagName !== undefined);
      if (!children.length) return;

      let first = children[0];
      // The first real element may be the image or the text column
      const isImgFirst = first.matches('img');

      // Slide the leading block in from its own side, trailing from the other
      children.forEach((child, i) => {
        if (child.matches('img')) {
          storyReveal(child, isImgFirst ? (i === 0 ? 'reveal-left' : 'reveal-right') : 'reveal-right', 90 + i * 60);
        } else {
          storyReveal(child, isImgFirst ? 'reveal-right' : 'reveal-left', 140 + i * 60);
          child.querySelectorAll('.footer-label').forEach((el) => storyReveal(el, 'reveal-down', 200 + i * 60));
          child.querySelectorAll('.footer-heading').forEach((el) => storyReveal(el, 'reveal-up', 260 + i * 60));
          child.querySelectorAll('.footer-desc').forEach((el) => storyReveal(el, 'reveal-up', 360 + i * 60));
          child.querySelectorAll('button').forEach((el) => storyReveal(el, 'reveal-up', 480 + i * 60));
        }
      });
    });

    // Client logos in My Story – staggered like Home
    storySection.querySelectorAll('.imageH').forEach((el, i) => {
      storyReveal(el, 'reveal-zoom', (i % 4) * 90 + Math.floor(i / 4) * 50);
    });

    // Video sections fade in
    storySection.querySelectorAll('.video-section').forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('fade-in');
        el.style.setProperty('--d', i * 120 + 'ms');
      }
    });
  }

  // ===== Consultancy section reveal animations (matches Home section) =====
  const consultancySection = document.getElementById('Consultancy');

  function consultReveal(el, kind, delay) {
    if (!el || el.classList.contains('reveal')) return;
    el.classList.add('reveal', kind);
    if (delay) el.style.setProperty('--d', delay + 'ms');
  }

  if (consultancySection) {
    // Banner text
    const bannerInner = consultancySection.querySelector('#BAnner-text');
    if (bannerInner) {
      const graphic = bannerInner.querySelector('.hero-graphic');
      if (graphic) consultReveal(graphic, 'reveal-zoom', 120);
      if (bannerInner.querySelector('h1')) consultReveal(bannerInner.querySelector('h1'), 'reveal-up', 380);
    }

    // Tools block – image + text column (alternate slide-in like Home book grid)
    consultancySection.querySelectorAll('#bookGrid').forEach((grid) => {
      const img = grid.querySelector('img');
      const textCol = grid.querySelector('[class*="md:pr-8"], .flex.flex-col');
      consultReveal(img, 'reveal-right', 90);
      if (textCol) {
        consultReveal(textCol, 'reveal-left', 160);
        textCol.querySelectorAll('.footer-label').forEach((el) => consultReveal(el, 'reveal-down', 200));
        textCol.querySelectorAll('h2').forEach((el) => consultReveal(el, 'reveal-up', 260));
        textCol.querySelectorAll('.footer-desc').forEach((el) => consultReveal(el, 'reveal-up', 340));
      }
    });

    // Focus section – headers + 4 cards stagger
    const focusWrap = consultancySection.querySelector('.consult-focus-wrap');
    if (focusWrap) {
      focusWrap.querySelectorAll('.footer-label').forEach((el, i) => consultReveal(el, 'reveal-down', i * 100));
      focusWrap.querySelectorAll('h1').forEach((el, i) => consultReveal(el, 'reveal-up', 80 + i * 120));
      focusWrap.querySelectorAll('.consult-card').forEach((el, i) => {
        consultReveal(el, 'reveal-up', 200 + (i % 2) * 140 + Math.floor(i / 2) * 60);
        const icon = el.querySelector('img');
        if (icon) consultReveal(icon, 'reveal-zoom', 260 + (i % 2) * 140 + Math.floor(i / 2) * 60);
      });
    }

    // Method section – headers + 4 cards stagger
    const methodWrap = consultancySection.querySelector('.consult-method-wrap');
    if (methodWrap) {
      methodWrap.querySelectorAll('.footer-label').forEach((el, i) => consultReveal(el, 'reveal-down', i * 100));
      methodWrap.querySelectorAll('.consult-method-title').forEach((el) => consultReveal(el, 'reveal-up', 80));
      methodWrap.querySelectorAll('.consult-method-intro').forEach((el) => consultReveal(el, 'reveal-up', 160));
      methodWrap.querySelectorAll('.method-card').forEach((el, i) => {
        consultReveal(el, 'reveal-up', 240 + (i % 4) * 110 + Math.floor(i / 4) * 60);
      });
    }

    // Client logos – staggered like Home
    consultancySection.querySelectorAll('.imageH').forEach((el, i) => {
      consultReveal(el, 'reveal-zoom', (i % 4) * 90 + Math.floor(i / 4) * 50);
    });
  }

  // ===== Podcast section reveal animations (matches Home section) =====
  const podcastSection = document.getElementById('Podcast');

  function podcastReveal(el, kind, delay) {
    if (!el || el.classList.contains('reveal')) return;
    el.classList.add('reveal', kind);
    if (delay) el.style.setProperty('--d', delay + 'ms');
  }

  if (podcastSection) {
    const bannerInner = podcastSection.querySelector('#BAnner-text');
    if (bannerInner) {
      const h1 = bannerInner.querySelector('h1');
      if (h1) podcastReveal(h1, 'reveal-up', 380);
    }

    const podGrid = podcastSection.querySelector('#bookGrid');
    if (podGrid) {
      const textCol = podGrid.querySelector('[class*="md:pr-8"]');
      if (textCol) {
        podcastReveal(textCol, 'reveal-left', 160);
        textCol.querySelectorAll('.footer-label').forEach((el, i) => podcastReveal(el, 'reveal-down', 200 + i * 60));
        textCol.querySelectorAll('.footer-heading').forEach((el, i) => podcastReveal(el, 'reveal-up', 260 + i * 100));
        textCol.querySelectorAll('.footer-desc').forEach((el, i) => podcastReveal(el, 'reveal-up', 340 + i * 90));
      }
      const player = podGrid.querySelector('.podcast-player');
      if (player) podcastReveal(player, 'reveal-right', 90);
    }

    podcastSection.querySelectorAll('.podcast-item').forEach((el, i) => {
      podcastReveal(el, 'reveal-up', 140 + i * 70);
    });
  }

  // ===== Keynotes section reveal animations (matches Home section) =====
  const keynotesSection = document.getElementById('Keynotes');

  function keynotesReveal(el, kind, delay) {
    if (!el || el.classList.contains('reveal')) return;
    el.classList.add('reveal', kind);
    if (delay) el.style.setProperty('--d', delay + 'ms');
  }

  if (keynotesSection) {
    const bannerInner = keynotesSection.querySelector('#BAnner-text');
    if (bannerInner) {
      const h1 = bannerInner.querySelector('h1');
      if (h1) keynotesReveal(h1, 'reveal-up', 380);
    }

    // Benefits – header + icon cards
    const keyGrid = keynotesSection.querySelector('.keynote-grid');
    if (keyGrid) {
      const benefitCol = keyGrid.parentElement;
      if (benefitCol) {
        benefitCol.querySelectorAll('.footer-label').forEach((el, i) => keynotesReveal(el, 'reveal-down', i * 100));
        benefitCol.querySelectorAll('.footer-heading').forEach((el, i) => keynotesReveal(el, 'reveal-up', 80 + i * 120));
      }
    }
    keynotesSection.querySelectorAll('.keynote-card').forEach((el, i) => {
      keynotesReveal(el, 'reveal-up', 200 + i * 120);
      const icon = el.querySelector('.keynote-icon');
      if (icon) keynotesReveal(icon, 'reveal-zoom', 260 + i * 120);
    });

    // Overview – header + talks
    keynotesSection.querySelectorAll('.keynote-talks').forEach((talks) => {
      const overviewCol = talks.parentElement;
      if (overviewCol) {
        overviewCol.querySelectorAll('.footer-label').forEach((el, i) => keynotesReveal(el, 'reveal-down', i * 100));
        overviewCol.querySelectorAll('.footer-heading').forEach((el, i) => keynotesReveal(el, 'reveal-up', 80 + i * 120));
      }
      talks.querySelectorAll('.keynote-talk').forEach((el, i) => keynotesReveal(el, 'reveal-up', 160 + i * 140));
    });
  }

  // ===== Online Courses section reveal animations (matches Home section) =====
  const coursesSection = document.getElementById('courses');

  function courseReveal(el, kind, delay) {
    if (!el || el.classList.contains('reveal')) return;
    el.classList.add('reveal', kind);
    if (delay) el.style.setProperty('--d', delay + 'ms');
  }

  if (coursesSection) {
    const bannerInner = coursesSection.querySelector('#BAnner-text');
    if (bannerInner) {
      const h1 = bannerInner.querySelector('h1');
      if (h1) courseReveal(h1, 'reveal-up', 380);
    }

    const focusWrap = coursesSection.querySelector('#focus-section');
    if (focusWrap) {
      const kids = Array.from(focusWrap.children);
      if (kids[0]) courseReveal(kids[0], 'reveal-up', 80);
      if (kids[1]) courseReveal(kids[1], 'reveal-up', 160);

      focusWrap.querySelectorAll('.flex.items-center.gap-20.justify-between').forEach((block) => {
        const img = block.querySelector('img');
        const text = block.querySelector('.flex.flex-col.items-center');
        const isImgFirst = img === block.firstElementChild;

        courseReveal(isImgFirst ? img : text, 'reveal-left', 80);
        courseReveal(isImgFirst ? text : img, 'reveal-right', 200);

        if (text) {
          text.querySelectorAll('.footer-label').forEach((el) => courseReveal(el, 'reveal-down', 280));
          text.querySelectorAll('.footer-heading').forEach((el) => courseReveal(el, 'reveal-up', 340));
          text.querySelectorAll('.footer-desc').forEach((el) => courseReveal(el, 'reveal-up', 440));
          text.querySelectorAll('a.btn').forEach((el) => courseReveal(el, 'reveal-up', 540));
        }
      });
    }

    // Client logos in courses – staggered like the other sections
    coursesSection.querySelectorAll('.imageH').forEach((el, i) => {
      courseReveal(el, 'reveal-zoom', (i % 4) * 90 + Math.floor(i / 4) * 50);
    });
  }

  // ===== Scroll reveal observer (fade-ins + home reveals) =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .reveal, .reveal-bounce').forEach((el) => {
    observer.observe(el);
  });

  // ===== Section navigation (show only the clicked section) =====
  const sections = Array.from(document.querySelectorAll('main > section'));
  const sectionMap = {};
  sections.forEach((sec) => {
    if (sec.id) sectionMap[sec.id] = sec;
  });

  const isContactLink = (href) =>
    href === '#contact' || href.toLowerCase().includes('#contact') || href === '#clients';

  // All nav links (desktop navs + mobile drawer)
  const navLinks = Array.from(document.querySelectorAll('header nav a[href]'));
  drawer.querySelectorAll('.mobile-link').forEach((l) => navLinks.push(l));

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      const href = (link.getAttribute('href') || '').replace(/^#/, '');
      const isActive = href === id;
      if (isContactLink('#' + href)) return; // contact link keeps default state
      link.classList.toggle('active', isActive);
    });
  }

  function showSection(id) {
    sections.forEach((sec) => {
      sec.style.display = sec.id === id ? '' : 'none';
    });
    setActiveLink(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNavClick(e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';

    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (sectionMap[id]) {
        e.preventDefault();
        showSection(id);
      } else if (isContactLink(href)) {
        // Contact always stays visible (footer) – scroll to it
        const footerContact = document.getElementById('contact');
        if (footerContact) {
          e.preventDefault();
          footerContact.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  document.addEventListener('click', handleNavClick);

  // On initial load, only the Home section is visible (others hidden)
  if (sectionMap['home-section'] || sectionMap.home) {
    const homeId = sectionMap['home-section'] ? 'home-section' : 'home';
    sections.forEach((sec) => {
      if (sec.id !== homeId) sec.style.display = 'none';
    });
    setActiveLink(homeId);
  }

  // ===== High-quality YouTube embeds (My Story videos) =====
  // Load videos via the IFrame Player API and force HD playback quality.
  const highQualityEmbeds = Array.from(document.querySelectorAll('.video-embed[data-video]'));

  // Give each embed a unique id the API needs
  highQualityEmbeds.forEach((embed, i) => {
    if (!embed.id) embed.id = 'yt-embed-' + i;
  });

  window.hqPlayers = window.hqPlayers || [];
  window.onYouTubeIframeAPIReady = function () {
    highQualityEmbeds.forEach((embed) => {
      const videoId = embed.getAttribute('data-video');
      if (!videoId) return;
      const player = new YT.Player(embed.id, {
        videoId: videoId,
        playerVars: {
          rel: 0,
          playsinline: 1
        },
        events: {
          onReady: (e) => {
            // Request the best available quality
            try { e.target.setPlaybackQuality('hd1080'); } catch (err) {}
            window.hqPlayers.push(e.target);
          }
        }
      });
    });
  };

  // If the API was already loaded before we defined the callback (unlikely),
  // invoke it manually.
  if (window.YT && window.YT.Player) {
    window.onYouTubeIframeAPIReady();
  }

  // ===== Podcast video gallery (like brianpennie.com/podcast/) =====
  // A persistent player at the top; clicking a thumbnail loads that video
  // into the player and marks the thumbnail as "Now Playing".
  const playerFrame = document.getElementById('podcastPlayerFrame');
  const podcastItems = Array.from(document.querySelectorAll('.podcast-item'));

  function buildPodcastPlayer(videoId, autoplay) {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?enablejsapi=1&playsinline=1&rel=0&modestbranding=1' + (autoplay ? '&autoplay=1' : '');
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    return iframe;
  }

  function selectPodcastItem(item) {
    const id = item.getAttribute('data-video-id');
    if (id && playerFrame) {
      playerFrame.innerHTML = '';
      playerFrame.appendChild(buildPodcastPlayer(id, true));
    }
    podcastItems.forEach((el) => el.classList.toggle('active', el === item));
  }

  if (playerFrame && podcastItems.length) {
    // Load the first video by default, but do NOT autoplay on page visit
    (function loadFirst() {
      const first = podcastItems[0];
      const id = first.getAttribute('data-video-id');
      if (id) {
        playerFrame.innerHTML = '';
        playerFrame.appendChild(buildPodcastPlayer(id, false));
      }
      first.classList.add('active');
    })();

    podcastItems.forEach((item) => {
      item.addEventListener('click', () => selectPodcastItem(item));
    });
  }

  // ===== Please Share buttons =====
  document.querySelectorAll('.share-btn').forEach((btn) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title || '');
    let href = btn.getAttribute('href') || '';
    if (href.indexOf('whatsapp') !== -1) {
      href = href + url + '%20' + title;
    } else {
      href = href + url;
    }
    btn.setAttribute('href', href);
  });
})();
