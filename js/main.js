/**
 * Vitalii | Full-Stack Developer Portfolio
 * Clean Tech Architecture - Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initProjectsFilter();
  initTerminal();
  initClipboard();
  initMobileMenu();
  initScrollNav();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Dark / Light with LocalStorage)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme');
  
  // Default to dark theme unless user previously selected light
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      showToast(`Switched to ${nextTheme} theme`);
    });
  }
}

/* ==========================================================================
   2. Projects Category Filter
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   3. Interactive Developer Terminal Mock
   ========================================================================== */
const terminalSnippets = {
  'profile.ts': `<span class="code-comment">// Developer Profile Matrix</span>
<span class="code-keyword">interface</span> <span class="code-fn">Developer</span> {
  name: <span class="code-string">'Vitalii'</span>;
  role: <span class="code-string">'Full-Stack Web Developer'</span>;
  specialization: [<span class="code-string">'React Frontends'</span>, <span class="code-string">'Laravel APIs'</span>, <span class="code-string">'Python Bots'</span>];
  location: <span class="code-string">'Ukraine'</span>;
  status: <span class="code-string">'Ready for High-Impact Projects'</span>;
}

<span class="code-keyword">export const</span> <span class="code-fn">vitalii</span>: <span class="code-fn">Developer</span> = {
  name: <span class="code-string">'Vitalii'</span>,
  role: <span class="code-string">'Full-Stack Web Developer'</span>,
  specialization: [<span class="code-string">'React / Next.js'</span>, <span class="code-string">'PHP / Laravel'</span>, <span class="code-string">'Python'</span>],
  location: <span class="code-string">'Ukraine'</span>,
  status: <span class="code-string">'Open to Full-Time &amp; Freelance Opportunities'</span>
};`,

  'stack.json': `{
  <span class="code-prop">"frontend"</span>: [
    <span class="code-string">"React"</span>, <span class="code-string">"Next.js"</span>, <span class="code-string">"TypeScript"</span>, 
    <span class="code-string">"Tailwind CSS"</span>, <span class="code-string">"Vanilla JS/CSS"</span>
  ],
  <span class="code-prop">"backend"</span>: [
    <span class="code-string">"PHP / Laravel 11"</span>, <span class="code-string">"Filament Admin"</span>,
    <span class="code-string">"Python / Asyncio"</span>, <span class="code-string">"RESTful Architecture"</span>
  ],
  <span class="code-prop">"databases"</span>: [
    <span class="code-string">"MySQL"</span>, <span class="code-string">"PostgreSQL"</span>, <span class="code-string">"Redis"</span>
  ],
  <span class="code-prop">"workflow"</span>: {
    <span class="code-prop">"version_control"</span>: <span class="code-string">"Git &amp; GitHub"</span>,
    <span class="code-prop">"code_quality"</span>: <span class="code-string">"Clean Code, Modular Components"</span>
  }
}`,

  'workflow.sh': `<span class="code-comment">#!/usr/bin/env bash</span>
<span class="code-comment"># Daily engineering philosophy &amp; pipeline</span>

<span class="code-keyword">function</span> <span class="code-fn">build_product</span>() {
  <span class="code-fn">echo</span> <span class="code-string">"1. Understand user needs and core business constraints"</span>
  <span class="code-fn">echo</span> <span class="code-string">"2. Structure scalable database schemas &amp; API contracts"</span>
  <span class="code-fn">echo</span> <span class="code-string">"3. Implement responsive, accessible, interactive UI"</span>
  <span class="code-fn">echo</span> <span class="code-string">"4. Test edge-cases, optimize payload, deploy to CDN"</span>
}

<span class="code-fn">build_product</span>
<span class="code-fn">echo</span> <span class="code-string">"Result: 100% Production-Grade Experience"</span>`
};

function initTerminal() {
  const tabs = document.querySelectorAll('.terminal-tab');
  const codeBox = document.getElementById('terminalCode');

  if (!codeBox) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const file = tab.getAttribute('data-tab');
      if (terminalSnippets[file]) {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        codeBox.innerHTML = terminalSnippets[file];
      }
    });
  });
}

/* ==========================================================================
   4. Clipboard Copy & Toast Feedback
   ========================================================================== */
function initClipboard() {
  const copyElements = document.querySelectorAll('[data-copy]');
  
  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        // Fallback
        const temp = document.createElement('textarea');
        temp.value = textToCopy;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast(`Copied: ${textToCopy}`);
      });
    });
  });
}

let toastTimer = null;
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  
  toast.classList.add('show');
  
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================================================
   5. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ==========================================================================
   6. Scroll spy & header shadow
   ========================================================================== */
function initScrollNav() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   7. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName')?.value.trim();
    const email = document.getElementById('formEmail')?.value.trim();
    const message = document.getElementById('formMessage')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all fields');
      return;
    }

    // Compose mailto link
    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:vitaliinewhalo@gmail.com?subject=${subject}&body=${body}`;

    showToast('Opening your email client...');
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);
  });
}
