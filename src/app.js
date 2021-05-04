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

  // Set state to start game
  game.setState('state', 1);


  // Run timer, increment state every second
  let gameLength = settings.getSettings().length;
  let interval = window.setInterval(() => {
    game.incrementTimer(gameLength, interval, () => {
      gameIsOver();
    });
  }, 1000);

  // Tell UI to open game modal
  ui.setupModal(() => { gameIsQuitEarly(interval) });

  // Set up answer event listener
  ui.setupSolveEventListener(() => checkAnswer(ui.getAnswer()));

  // Generate problems
  runGame();

}

const gameIsQuitEarly = (interval) => {
  console.log('Quit game early...');
  clearInterval(interval);
  game.setState('state', 0);
  ui.closeModal();

  // Reset game
  game.resetState();

}

const gameIsOver = () => {
  console.log('Game is over!');
  game.setState('state', 0);
  console.log(game.getState());

  // Reset Game
  game.resetState();

  // Update Scoreboard
}

const runGame = () => {
  if (game.getState().state === 1) {
    console.log('Showing problem...');
    // Get problem from game
    let gameSettings = settings.getSettings();

    let problem = game.getProblem(gameSettings.focus, gameSettings.type, gameSettings.order);
    console.log(problem);
    // display problem in UI
    ui.showProblem(problem, gameSettings.type);
    // Listen for keyboard or mouse input
    // Pass function for checking answer

  }



  // Display feedback
  // Display new problem
}

const checkAnswer = (answer) => {
  // Check problem
  // If correct inc game state correct
  // If incorrect inc game state incorrect
  let state = game.getState();
  if (state.currAnswer === answer) {
    game.incrementCorrect();
  } else {
    game.incrementIncorrect();
  }
  console.log(game.getState());
  ui.resetAnswer();
  runGame();
}




// Game Over, after time runs out
// Calculate percentage
// Push state to scoreboard


// Reset Game: After game over or if quit game is clicked

init();