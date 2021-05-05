const Scoreboard = () => {
  const scores = [];

  const _addScore = (score) => {
    scores.push(score);

    return _getScores();
  }

  const _getScores = () => {
    return scores;
  }

  return {
    addScore: (score) => _addScore(score),
    getScores: () => _getScores()
  }
}

export default Scoreboard;