import Game from './components/Game.js';
import UI from './components/UI.js';
import Settings from './components/Settings.js';
import Scoreboard from './components/Scoreboard.js';

// Set up components
const ui = UI();
const game = Game();
const settings = Settings();

// Initialize app
const init = () => {
  // Add event listeners
  ui.setupStartEventListener(startGame);

  // Load Settings if saved in LS
  // Load scoreboard
}

// What to do when Start Game button is clicked
const startGame = () => {
  // Parse settings from UI
  settings.setSettings(ui.parseSettings());

  // Alter settings for subtracting and dividing -- see apple notes

  // Tell UI to open game modal
  // Run timer
}

// Create & display problem
// Get problem and tell UI to display
// Listen for keyboard input

// Check problem
// If correct inc game state correct
// If incorrect inc game state incorrect
// Display feedback
// Display new problem

// Game Over, after time runs out
// Calculate percentage
// Push state to scoreboard


// Reset Game: After game over or if quit game is clicked

init();