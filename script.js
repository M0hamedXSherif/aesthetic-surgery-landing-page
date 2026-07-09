// Particle background
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.7 + 0.2,
    phase: Math.random() * Math.PI * 2   // ← add this for twinkle
  };
}

const stars = Array.from({ length: 150 }, createStar);

let t = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  t += 0.016;

  for (const star of stars) {
    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    const tw = star.opacity * (0.6 + 0.4 * Math.sin(t * 3 + star.phase));

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${tw.toFixed(2)})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});









// ================================
// MOBILE MENU
// ================================

const hamburger       = document.getElementById('hamburger');
const mobileMenu      = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileLinks     = document.querySelectorAll('.mobile-menu-item');
const mobileThemeBtn  = document.getElementById('mobile-theme-toggle');
const mobileThemeIcon = document.getElementById('mobile-theme-icon');
const mobileThemeLabel= document.getElementById('mobile-theme-label');

// open the menu
hamburger.addEventListener('click', function() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
  // overflow: hidden prevents page scrolling
  // while the menu is open — feels native
});

// close via X button
mobileMenuClose.addEventListener('click', closeMenu);

// close when clicking the dark backdrop
// (but not when clicking the card itself)
mobileMenu.addEventListener('click', function(e) {
  if (e.target === mobileMenu) {
    // e.target is the element that was actually clicked
    // if it's the overlay (not the card), close the menu
    closeMenu();
  }
});

// close when a nav link is clicked
mobileLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    if (link.id !== 'mobile-theme-toggle') {
      closeMenu();
    }
  });
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  // restore scrolling
}

// mobile theme toggle — mirrors the desktop toggle
mobileThemeBtn.addEventListener('click', function(e) {
  e.preventDefault();
  // e.preventDefault() stops the href="#" from
  // jumping the page to the top
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  mobileThemeLabel.textContent = isLight ? 'Dark' : 'Theme';
});

// close menu with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMenu();
  // keyboard shortcut — professional UX touch
  // e.key gives us the name of the key pressed
})










// ================================
// THEME TOGGLE
// ================================

const toggleBtn = document.querySelector('.theme-toggle');

toggleBtn.addEventListener('click', function() {
  document.body.classList.toggle('light-mode');
  
  // DON'T use textContent — it destroys the SVG
  // instead update the SVG color via CSS variables
  // the SVG already adapts because it uses currentColor
  // which inherits from the button's color property
  
  const isLight = document.body.classList.contains('light-mode');
  
  // store preference so it persists on page refresh
  // localStorage saves data in the browser permanently
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// on page load, restore saved theme preference
// this runs immediately when the script loads
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
}










// NAV EFFECTS
window.onscroll = function() {
    let navbar = document.getElementById("main-navbar");
    if (window.pageYOffset > 15) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
};










// ================================
// GALLERY FILTER
// ================================

// Get ALL tab buttons at once — returns a list
const tabs = document.querySelectorAll('.gallery-tab');

// Get ALL gallery cards at once — returns a list
const cards = document.querySelectorAll('.gallery-card');

// Loop through every tab and attach a click listener
tabs.forEach(function(tab) {

  tab.addEventListener('click', function() {

    // Step 1: read which filter this tab represents
    // dataset.filter reads the data-filter="..." attribute
    const filter = tab.dataset.filter;
    // if tab has data-filter="rhinoplasty"
    // then filter = "rhinoplasty"

    // Step 2: update which tab looks active
    tabs.forEach(function(t) {
      t.classList.remove('active');
      // remove active from ALL tabs first
    });
    tab.classList.add('active');
    // then add active ONLY to the one just clicked

    // Step 3: show or hide each card
    cards.forEach(function(card) {

      // read this card's category
      const category = card.dataset.category;

      // if filter is "all" OR this card matches
      // the filter → show it by removing hidden
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
      } else {
        // otherwise hide it by adding hidden
        card.classList.add('hidden');
      }

    });

  });

});