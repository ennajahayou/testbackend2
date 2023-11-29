// backend/deadlineCalculations.js
const fs = require('fs');

const DEADLINES = {
  DEAD1: 24,
  DEAD2: 48,
  DEAD3: 72,
};

const TksTre = 4;

const calculateDeadline = (index, difficultyValue) => {
  const parameters = JSON.parse(fs.readFileSync("parameters.json", "utf8"));

  const difficulty = parameters.autoEvaluation.difficulty[difficultyValue];
  const reactivity = parameters.autoEvaluation.reactivity[index];

  const scoreAutoEvoluation = difficulty * reactivity;

  if (scoreAutoEvoluation > TksTre) {
    if ((difficulty === 4 && reactivity === 4)) {
      return DEADLINES.DEAD1;
    } else if (difficulty === 10 || reactivity === 10) {
      return DEADLINES.DEAD2;
    } else if (difficulty === 20 || reactivity === 20) {
      return DEADLINES.DEAD3;
    }
  }

  // Retourne null si le score est inférieur ou égal à TksTre
  return null;
};

module.exports = calculateDeadline;

