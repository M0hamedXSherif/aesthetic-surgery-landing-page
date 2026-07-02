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