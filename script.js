// Header shadow on scroll
const header = document.getElementById('topbar');
window.addEventListener('scroll', () => {
  header.style.boxShadow =
    window.scrollY > 10 ? '0 10px 18px rgba(0,0,0,.08)' : 'none';
});

// Print button
document.getElementById('printBtn').addEventListener('click', () => {
  window.print();
});

// Theme toggle
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark')
    ? 'Light Mode'
    : 'Dark Mode';
});

// Simple tooltip from hotspots (re-usable for both images)
function enableHotspots(container) {
  if (!container) return;

  const tip = document.createElement('div');
  tip.className = 'tip visible';
  tip.style.left = '10px';
  tip.style.bottom = '10px';
  //tip.textContent = 'Tap blue dots for info';
  container.appendChild(tip);

  container.querySelectorAll('.hotspot').forEach(btn => {
    btn.addEventListener('click', e => {
      tip.textContent = btn.dataset.tip || '…';
      tip.classList.add('visible');
      e.stopPropagation();
    });
  });

  container.addEventListener('click', () => tip.classList.remove('visible'));
}

enableHotspots(document.getElementById('sally'));
enableHotspots(document.getElementById('iss-interactive'));

// Lightbox for images (ISS + mockup + Sally)
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');

['issImg', 'mockImg', 'sallyImg'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', () => {
    lbImg.src = el.src;
    lb.classList.add('active');
  });
});

lb.addEventListener('click', () => {
  lb.classList.remove('active');
  lbImg.src = '';
});

// Collapsible cards: concepts + experiments
const collapsibleCards = document.querySelectorAll('.collapsible');

collapsibleCards.forEach(card => {
  const btn = card.querySelector('.collapser');
  if (!btn) return;

  btn.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});

// Interactive timeline: click items to reorder experiment cards below
const timelineEvents = document.querySelectorAll('#tl .event');

timelineEvents.forEach(ev => {
  const targetSelector = ev.dataset.target;
  if (!targetSelector) return; // skip non-linked events

  ev.classList.add('event--linked');

  ev.addEventListener('click', () => {
    // mark active in the timeline
    timelineEvents.forEach(e => e.classList.remove('event--active'));
    ev.classList.add('event--active');

    const card = document.querySelector(targetSelector);
    if (!card) return;

    const container = card.parentElement;
    if (!container) return;

    // move this card to the top of the experiments list
    container.prepend(card);

    // ensure it's expanded
    card.classList.add('open');

    // visual highlight + scroll to experiments section
    card.classList.add('experiment--highlight');
    const experimentsSection = document.getElementById('experiments');
    if (experimentsSection) {
      experimentsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    setTimeout(() => {
      card.classList.remove('experiment--highlight');
    }, 1400);
  });
});
