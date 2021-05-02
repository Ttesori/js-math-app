const Game = () => {

  const state = {
    timeElapsed: 0,
    correct: 0,
    incorrect: 0,
    currNum1: 0,
    currNum2: 0
  }

  const runClock = (gameLength, interval, callback) => {
    state.timeElapsed++;
    console.log(state.timeElapsed);
    if (state.timeElapsed === gameLength) {
      clearInterval(interval);
      callback();
    }
  }

  return {
    getState: () => state,
    setState: (prop, val) => {
      state[prop] = val;
      console.log(`${prop} set to ${val}`, state[prop])
    },
    getNums: (focusNum, maxNum) => [focusNum, maxNum],
    incrementCorrect: () => state.correct++,
    incrementIncorrect: () => state.incorrect++,
    incrementTimer: (gameLength, interval, callback) => runClock(gameLength, interval, callback)
  }
}

export default Game;