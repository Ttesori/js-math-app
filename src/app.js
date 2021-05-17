import Game from './components/Game.js';
import UI from './components/UI.js';
import Settings from './components/Settings.js';
import Scoreboard from './components/Scoreboard.js';

// Set up components
const ui = UI();
const game = Game();
const settings = Settings();
const scoreboard = Scoreboard();

// Interval placeholder
let interval;

// Initialize app
const init = () => {
  // Add event listeners
  ui.setupStartEventListener(startGame);

  // Load scoreboard if saved in LS
  let scores = scoreboard.loadScores();
  ui.updateScoreboard(scores, clearScores);
}

// What to do when Start Game button is clicked
const startGame = () => {
  // Parse settings from UI
  settings.setSettings(ui.parseSettings());

  // Run timer, increment state every second
  let length = settings.getSettings().length;
  interval = window.setInterval(() => {
    game.incrementTimer(length, interval, () => gameIsOver());
    ui.displayTimer(length - game.getState().timeElapsed, length);
  }, 1000);

  // Tell UI to open game modal
  ui.setupModal(() => { gameIsQuitEarly() });

  // Set up answer event listener
  ui.setupSolveEventListener(() => checkAnswer(ui.getAnswer()));

  // Generate problems
  runGame();

}

const gameIsQuitEarly = () => {
  // Modal is closed
  clearInterval(interval);
  ui.closeModal();

  // Reset game
  game.resetState();

  // Reset timer
  ui.resetTimerBar();

}

const gameIsOver = () => {
  // Clear interval
  clearInterval(interval);

  // Get game stats
  let gameStats = game.getState();

  // Show feedback
  let corrPercentage = Math.round((gameStats.correct / (gameStats.correct + gameStats.incorrect)) * 100);
  ui.displayFeedback(2, `Game over! You got ${gameStats.correct} problems correct and ${gameStats.incorrect} problems incorrect for a percentage correct of ${corrPercentage}%`);
  ui.hideGameEls();

  // Reset Game
  game.setState('state', 0);
  game.resetState();

  // Reset timer
  ui.resetTimerBar();

  // Update Scoreboard
  let date = new Date();
  let gameSettings = settings.getSettings();
  let score = {
    date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
    type: settings.getPrettyType(),
    correct: gameStats.correct,
    percentage: corrPercentage,
    focusNum: gameSettings.focus,
    length: gameSettings.length,
    secAns: (gameSettings.length / (gameStats.correct + gameStats.incorrect)).toFixed(1)
  }
  let scores = scoreboard.addScore(score);
  ui.updateScoreboard(scores, clearScores);
  scoreboard.saveScores();
}

const runGame = () => {
  // Get problem from game
  let gameSettings = settings.getSettings();
  let problem = game.getProblem(gameSettings.focus, gameSettings.type);

  // display problem in UI
  ui.showProblem(problem, gameSettings.type);
}

const checkAnswer = (answer) => {
  // Check problem
  let state = game.getState();
  if (state.currAnswer === answer) {
    game.incrementCorrect();
    ui.displayFeedback(1, 'Correct! Great job!');
  } else {
    game.incrementIncorrect();
    ui.displayFeedback(0, `Good try! The correct answer was: ${answer}`);
  }
  // Reset answer
  ui.resetAnswer();
  runGame();
}

const clearScores = () => {
  scoreboard.clearScores();
  ui.updateScoreboard([]);
}

init();