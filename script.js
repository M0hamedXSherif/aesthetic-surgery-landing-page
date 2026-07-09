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










// THEME TOGGLE
// Step 1: Find the toggle button in the DOM
// querySelector finds the FIRST element matching
// the CSS selector you pass — same syntax as CSS
const toggleBtn = document.querySelector('.theme-toggle');

// Step 2: Find the body element
// document.body is a shortcut — always refers to <body>
const body = document.body;

// Step 3: Listen for a click on the button
// 'click' is the event name
// the second argument is the function that runs when clicked
toggleBtn.addEventListener('click', function() {

  // Toggle the class 'light-mode' on the body
  // If body has it → remove it (goes back to dark)
  // If body doesn't have it → add it (switches to light)
  body.classList.toggle('light-mode');

  // Step 4: Change the button icon based on current mode
  // classList.contains() checks if a class exists → returns true/false
  const isLight = body.classList.contains('light-mode');

  // If light mode is ON → show moon icon (click to go dark)
  // If light mode is OFF → show sun icon (click to go light)
  toggleBtn.textContent = isLight ? '🌙' : '🌞';

});










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