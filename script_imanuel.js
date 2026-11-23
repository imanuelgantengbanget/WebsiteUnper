/* Interaksi navigasi, aksesibilitas, progres baca, animasi ringan, dan formulir kontak. */
(() => {
  'use strict';

  const toggle = document.querySelector('.imanuel_menu-toggle');
  const nav = document.querySelector('#imanuel_primary_nav');
  const closeMenu = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('imanuel_open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Buka navigasi');
    const icon = toggle.querySelector('.imanuel_menu-icon');
    if (icon) icon.textContent = '☰';
    const label = toggle.querySelector('span:last-child');
    if (label) label.textContent = 'MENU';
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('imanuel_open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Tutup navigasi' : 'Buka navigasi');
      const icon = toggle.querySelector('.imanuel_menu-icon');
      if (icon) icon.textContent = isOpen ? '×' : '☰';
      const label = toggle.querySelector('span:last-child');
      if (label) label.textContent = isOpen ? 'TUTUP' : 'MENU';
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }


  // Music Corner: track switching through the official YouTube privacy-enhanced embed.
  const musicFrame = document.getElementById('imanuel_youtube_player');
  const musicButtons = document.querySelectorAll('.imanuel_music-track[data-imanuel-video]');
  if (musicFrame && musicButtons.length) {
    const musicLinks = {
      'T51z9Egir88': 'https://youtu.be/T51z9Egir88',
      '77RXIf4ENUQ': 'https://youtu.be/77RXIf4ENUQ'
    };
    musicButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const videoId = button.dataset.imanuelVideo;
        if (!videoId || !musicLinks[videoId]) return;
        musicFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
        musicButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        const link = document.querySelector('.imanuel_music-youtube-link');
        if (link) link.href = musicLinks[videoId];
      });
    });
  }

  const currentPage = document.body.dataset.page || window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.imanuel_nav a').forEach((link) => {
    const linkPage = (link.getAttribute('href') || '').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('imanuel_active');
      link.setAttribute('aria-current', 'page');
    }
  });
  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  // Progress baca dan tombol kembali ke atas.
  const progress = document.createElement('div');
  progress.className = 'imanuel_reading-progress';
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-label', 'Progres membaca halaman');
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', '100');
  document.body.append(progress);
  const backTop = document.querySelector('.imanuel_back-top');
  let ticking = false;
  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
    progress.style.width = `${percent}%`;
    progress.setAttribute('aria-valuenow', String(Math.round(percent)));
    if (backTop) backTop.classList.toggle('imanuel_visible', window.scrollY > 420);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateScrollUI); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', updateScrollUI);
  updateScrollUI();

  // Animasi elemen saat masuk viewport; konten tetap terlihat jika fitur tidak didukung.
  const revealItems = document.querySelectorAll('.imanuel_page-head, .imanuel_hero, .imanuel_section-heading, .imanuel_card, .imanuel_service-card, .imanuel_glass, .imanuel_values-band, .imanuel_home-cta');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('imanuel_reveal-ready');
    revealItems.forEach((item) => item.classList.add('imanuel_reveal'));
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('imanuel_revealed');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  }


  // Pencarian lintas halaman: berjalan sepenuhnya di sisi browser tanpa layanan eksternal.
  const pageIndex = [
    { title: 'Beranda', url: 'index.html', terms: 'home utama kampus universitas informasi gerbang' },
    { title: 'Profil Universitas', url: 'profil_imanuel.html', terms: 'sejarah identitas profil universitas' },
    { title: 'Struktur Organisasi', url: 'struktur_imanuel.html', terms: 'yayasan rektorat fakultas lembaga biro organisasi' },
    { title: 'Visi dan Misi', url: 'visi_misi_imanuel.html', terms: 'visi misi tujuan tri dharma' },
    { title: 'Fakultas', url: 'fakultas_imanuel.html', terms: 'fakultas keguruan ekonomi bisnis teknik kesehatan pertanian' },
    { title: 'Program Studi', url: 'prodi_imanuel.html', terms: 'program studi jurusan pendidikan manajemen akuntansi hukum perhotelan informatika sipil farmasi agribisnis agroteknologi peternakan' },
    { title: 'Layanan Kampus', url: 'layanan_imanuel.html', terms: 'layanan akademik simantap e-journal informasi' },
    { title: 'Penerimaan Mahasiswa Baru', url: 'pmb_imanuel.html', terms: 'pmb admisi daftar pendaftaran calon mahasiswa jalur masuk' },
    { title: 'BEM dan Kemahasiswaan', url: 'bem_imanuel.html', terms: 'bem organisasi mahasiswa kegiatan kemahasiswaan' },
    { title: 'Hubungi Kami', url: 'hubungi_imanuel.html', terms: 'kontak alamat telepon email lokasi pesan' }
  ];
  const headerRow = document.querySelector('.imanuel_header-row');
  if (headerRow && !document.querySelector('#imanuel_search_open')) {
    const searchButton = document.createElement('button');
    searchButton.type = 'button'; searchButton.id = 'imanuel_search_open';
    searchButton.className = 'imanuel_search-open'; searchButton.setAttribute('aria-haspopup', 'dialog');
    searchButton.setAttribute('aria-label', 'Cari informasi di website'); searchButton.innerHTML = '<span aria-hidden="true">⌕</span><span class="imanuel_search-label">Cari</span>';
    headerRow.append(searchButton);
    const dialog = document.createElement('section');
    dialog.className = 'imanuel_search-dialog'; dialog.id = 'imanuel_search_dialog';
    dialog.setAttribute('role', 'dialog'); dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'imanuel_search_title'); dialog.hidden = true;
    dialog.innerHTML = '<div class="imanuel_search-backdrop" data-search-close></div><div class="imanuel_search-panel"><div class="imanuel_search-panel-head"><div><span class="imanuel_section-kicker">Pencarian website</span><h2 id="imanuel_search_title">Apa yang ingin kamu cari?</h2></div><button type="button" class="imanuel_search-close" aria-label="Tutup pencarian" data-search-close>×</button></div><label class="imanuel_search-input-wrap"><span aria-hidden="true">⌕</span><input id="imanuel_search_input" type="search" placeholder="Cari fakultas, program studi, PMB…" autocomplete="off"></label><p class="imanuel_search-hint">Tekan tombol <kbd>Esc</kbd> untuk menutup. Pintasan keyboard: <kbd>/</kbd>.</p><div id="imanuel_search_results" class="imanuel_search-results" aria-live="polite"><p class="imanuel_search-empty">Mulai ketik untuk mencari halaman.</p></div></div>';
    document.body.append(dialog);
    const input = dialog.querySelector('#imanuel_search_input');
    const results = dialog.querySelector('#imanuel_search_results');
    const closeSearch = () => { dialog.hidden = true; document.body.classList.remove('imanuel_search-active'); searchButton.setAttribute('aria-expanded', 'false'); searchButton.focus(); };
    const openSearch = () => { dialog.hidden = false; document.body.classList.add('imanuel_search-active'); searchButton.setAttribute('aria-expanded', 'true'); window.setTimeout(() => input.focus(), 30); };
    const renderResults = (query) => {
      const normalized = query.trim().toLocaleLowerCase('id');
      if (!normalized) { results.innerHTML = '<p class="imanuel_search-empty">Mulai ketik untuk mencari halaman.</p>'; return; }
      const queryWords = normalized.split(/\s+/).filter(Boolean);
      const matches = pageIndex.filter(page => {
        const haystack = `${page.title} ${page.terms}`.toLocaleLowerCase('id');
        return queryWords.every(word => haystack.includes(word));
      });
      if (!matches.length) { results.innerHTML = '<p class="imanuel_search-empty">Belum ada hasil. Coba kata kunci lain, misalnya “fakultas” atau “PMB”.</p>'; return; }
      results.innerHTML = matches.map(page => `<a class="imanuel_search-result" href="${page.url}"><span><b>${page.title}</b><small>${page.terms.split(' ').slice(0, 7).join(' · ')}</small></span><span aria-hidden="true">↗</span></a>`).join('');
    };
    searchButton.addEventListener('click', openSearch);
    input.addEventListener('input', () => renderResults(input.value));
    dialog.querySelectorAll('[data-search-close]').forEach(el => el.addEventListener('click', closeSearch));
    dialog.addEventListener('click', event => { if (event.target.classList.contains('imanuel_search-backdrop')) closeSearch(); });
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]')].filter(el => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !dialog.hidden) closeSearch();
      if (event.key === '/' && dialog.hidden && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName) && !event.ctrlKey && !event.metaKey && !event.altKey) { event.preventDefault(); openSearch(); }
    });
  }

  // Formulir kontak: validasi browser, penghitung karakter, lalu buka aplikasi email.
  const contactForm = document.querySelector('#imanuel_contact_form');
  if (contactForm) {
    const messageField = contactForm.querySelector('[name="pesan"]');
    const status = document.querySelector('#imanuel_form_status');
    if (messageField) {
      messageField.maxLength = 1500;
      const counter = document.createElement('small');
      counter.className = 'imanuel_form-counter';
      counter.setAttribute('aria-live', 'polite');
      messageField.insertAdjacentElement('afterend', counter);
      const updateCounter = () => {
        counter.textContent = `${messageField.value.length}/1500 karakter`;
        counter.classList.toggle('imanuel_near-limit', messageField.value.length > 1350);
      };
      messageField.addEventListener('input', updateCounter);
      updateCounter();
    }
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const data = new FormData(contactForm);
      const name = String(data.get('nama') || '').trim();
      const email = String(data.get('email') || '').trim();
      const subjectText = String(data.get('subjek') || '').trim();
      const message = String(data.get('pesan') || '').trim();
      if (message.length < 10) {
        if (status) status.textContent = 'Pesan minimal 10 karakter. Silakan lengkapi pesan Anda.';
        messageField?.focus();
        return;
      }
      const subject = encodeURIComponent(`Pesan website UNPER: ${subjectText}`);
      const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
      if (status) status.textContent = 'Aplikasi email akan dibuka. Pesan belum terkirim sampai Anda menekan tombol Kirim pada aplikasi email.';
      window.location.href = `mailto:perjuangan@unper.ac.id?subject=${subject}&body=${body}`;
    });
  }
})();
