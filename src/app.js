import Game from './components/Game.js';
import UI from './components/UI.js';
import Settings from './components/Settings.js';
import Scoreboard from './components/Scoreboard.js';

// Set up components
const ui = UI();
const game = Game();
const settings = Settings();
const scoreboard = Scoreboard();

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
    ui.displayTimer(game.getState().timeElapsed);
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
  let gameStats = game.getState();
  game.setState('state', 0);
  console.log(game.getState());
  let corrPercentage = Math.round((gameStats.correct / (gameStats.correct + gameStats.incorrect)) * 100);
  ui.displayFeedback(2, `Game over! You got ${gameStats.correct} problems correct and ${gameStats.incorrect} problems incorrect for a percentage correct of ${corrPercentage}%`);
  ui.hideGameEls();
  let date = new Date();
  let score = {
    date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
    type: settings.getSettings().type,
    correct: gameStats.correct,
    percentage: corrPercentage
  }
  let scores = scoreboard.addScore(score);
  ui.updateScoreboard(scores);

  // Reset Game
  game.resetState();

  // Update Scoreboard
}

const runGame = () => {
  if (game.getState().state === 1) {
    console.log('Showing problem...');
    // Get problem from game
    let gameSettings = settings.getSettings();

    let problem = game.getProblem(gameSettings.focus, gameSettings.type);
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
  console.log(answer, state.currAnswer);
  if (state.currAnswer === answer) {
    game.incrementCorrect();
    ui.displayFeedback(1, 'Correct! Great job!');
  } else {
    game.incrementIncorrect();
    ui.displayFeedback(0, `Good try! The correct answer was: ${answer}`);
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