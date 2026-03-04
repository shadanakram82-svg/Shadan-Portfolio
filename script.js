
gsap.registerPlugin(ScrollTrigger);

/* ── PARTICLES ── */
const pc = document.getElementById('particles-container');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDelay = Math.random() * 15 + 's';
  p.style.animationDuration = (12 + Math.random() * 10) + 's';
  p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
  pc.appendChild(p);
}

/* ── CANVAS HERO BG ── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initDots(); });
  function initDots() {
    dots = [];
    const n = Math.floor((W * H) / 14000);
    for (let i = 0; i < n; i++) dots.push({
      x: Math.random() * W, y: Math.random() * H,
      r: .8 + Math.random() * 1.5,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      alpha: .2 + Math.random() * .5
    });
  }
  initDots();
  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,245,196,${d.alpha})`;
      ctx.fill();
    });
    // draw lines between nearby dots
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(0,245,196,${.08 * (1 - dist / 120)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // active link
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(s => {
    const top = s.offsetTop - 100, bottom = top + s.offsetHeight;
    const link = document.querySelector(`.nav-link[href="#${s.id}"]`);
    if (link) link.classList.toggle('active', window.scrollY >= top && window.scrollY < bottom);
  });
});

/* ── GSAP HERO ENTRANCE ── */
gsap.set('.hero-tag', { y: 30, opacity: 0 });
gsap.set('.hero-btns', { y: 30, opacity: 0 });
gsap.set('.typing-wrap', { opacity: 0 });

const heroTL = gsap.timeline({ delay: .3 });
heroTL
  .to('.hero-tag', { y: 0, opacity: 1, duration: .6, ease: 'power3.out' })
  .to('.typing-wrap', { opacity: 1, duration: .4 }, '<1.5')
  .to('.hero-btns', { y: 0, opacity: 1, duration: .7, ease: 'power3.out' }, '<.2');

/* ── TYPING EFFECT ── */
const phrases = ['Web Developer', 'UI Enthusiast', 'HTML & CSS Wizard', 'JavaScript Developer', 'Bootstrap Expert', 'Creative Coder'];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typedText');
function type() {
  const cur = phrases[pi];
  if (!deleting) {
    el.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { deleting = true; setTimeout(type, 1400); return; }
  } else {
    el.textContent = cur.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 55 : 85);
}
setTimeout(type, 1800);

/* ── SKILLS DATA ── */
const skills = [
  { icon: '🌐', name: 'HTML5', desc: 'Semantic markup & accessibility', pct: 90 },
  { icon: '🎨', name: 'CSS3', desc: 'Layouts, animations & responsive design', pct: 85 },
  { icon: '⚡', name: 'JavaScript', desc: 'ES6+, DOM, async & APIs', pct: 78 },
  { icon: '📦', name: 'Bootstrap', desc: 'Responsive grid & components', pct: 88 },
];
const sg = document.getElementById('skillsGrid');
skills.forEach((s, i) => {
  sg.innerHTML += `
  <div class="col-sm-6 col-lg-3">
    <div class="skill-card reveal stagger-${i + 1}" data-pct="${s.pct}">
      <span class="skill-icon">${s.icon}</span>
      <div class="skill-name">${s.name}</div>
      <div class="skill-desc">${s.desc}</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill"></div>
      </div>
      <div class="skill-pct">${s.pct}%</div>
    </div>
  </div>`;
});

/* ── ACHIEVEMENTS ── */
const achs = [
  { icon: '🏆', title: '15+ Projects Completed', desc: 'Built and deployed over 15 web projects spanning landing pages, portfolios, e-commerce mockups, and interactive apps.', badge: 'badge-gold', btext: 'Top Achievement' },
  { icon: '🎓', title: 'Certified in HTML & CSS', desc: 'Earned multiple online certifications from reputed platforms, validating proficiency in modern web markup and styling.', badge: 'badge-silver', btext: 'Certified' },
  { icon: '⭐', title: '5-Star Client Rating', desc: 'Consistently received 5-star reviews on freelance platforms for delivering quality work on time.', badge: 'badge-gold', btext: 'Excellent' },
  { icon: '📱', title: '100% Responsive Designs', desc: 'Every project built follows mobile-first approach, ensuring flawless experience across all screen sizes.', badge: 'badge-silver', btext: 'Best Practice' },
  { icon: '🚀', title: 'Fast Load Performance', desc: 'Achieved 90+ Google Lighthouse performance scores by optimizing assets, code, and structure.', badge: 'badge-bronze', btext: 'Performance' },
  { icon: '🤝', title: 'Open Source Contributor', desc: 'Contributed to open source repositories on GitHub, collaborating with developers worldwide.', badge: 'badge-bronze', btext: 'Community' },
];
const ag = document.getElementById('achGrid');
achs.forEach((a, i) => {
  ag.innerHTML += `
  <div class="col-md-6 col-lg-4">
    <div class="ach-card reveal stagger-${(i % 3) + 1}">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-title">${a.title}</div>
      <div class="ach-desc">${a.desc}</div>
      <span class="ach-badge ${a.badge}">${a.btext}</span>
    </div>
  </div>`;
});

/* ── SCROLL REVEAL (IntersectionObserver) ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: .12 });
  els.forEach(el => obs.observe(el));
}
initReveal();

/* ── GSAP SKILL PROGRESS BARS ── */
ScrollTrigger.create({
  trigger: '#skills',
  start: 'top 70%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.skill-card').forEach(card => {
      const pct = card.dataset.pct;
      const bar = card.querySelector('.progress-bar-fill');
      gsap.to(bar, { width: pct + '%', duration: 1.3, ease: 'power2.out', delay: Math.random() * .4 });
    });
  }
});

/* ── GSAP SECTION HEADINGS ── */
gsap.utils.toArray('.section-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    y: 40, opacity: 0, duration: .9, ease: 'power3.out'
  });
});

/* ── SEND BUTTON ── */
function handleSend(btn) {
  btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
  btn.style.background = 'linear-gradient(90deg,var(--clr-accent),var(--clr-accent2))';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
    btn.style.background = '';
  }, 3000);
}