// backend/deadlineCalculations.js
const fs = require('fs');

const DEAD1 = 24;
const DEAD2 = 48;
const DEAD3 = 72;
const TksTre = 4;

const calculateDeadline = (index, difficultyValue) => {
  var parameters = JSON.parse(fs.readFileSync("parameters.json", "utf8"));

  const difficulty = parameters.autoEvaluation.difficulty[difficultyValue];
  const reactivity = parameters.autoEvaluation.reactivity[index];

  const scoreAutoEvoluation = difficulty * reactivity;

  let departHours;

  if (scoreAutoEvoluation > TksTre && difficulty === 4 && reactivity === 4) {
    return (departHours = DEAD1);
  } else if (scoreAutoEvoluation > TksTre && (difficulty === 10 || reactivity === 10)) {
    return (departHours = DEAD2);
  } else if (scoreAutoEvoluation > TksTre && (difficulty === 20 || reactivity === 20)) {
    return (departHours = DEAD3);
  }
};

module.exports = calculateDeadline;
