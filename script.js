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