const Game = () => {

  const state = {
    timeElapsed: 0,
    correct: 0,
    incorrect: 0,
    currNum1: 0,
    currNum2: 0
  }

  return {
    getState: () => state,
    setState: (prop, val) => {
      state[prop] = val;
      console.log(`${prop} set to ${val}`, state[prop])
    },
    getNums: (focusNum, maxNum) => [focusNum, maxNum],
    incrementCorrect: () => correct++,
    incrementIncorrect: () => incorrect++
  }
}

export default Game;