// backend/countdownTrigger.js
const talentsThanksCalculator = require('./talentsThanksCalculator');

const startCountdown = (hours, executionId) => {
    
    const durationInMilliseconds = hours * 500;
  
    setTimeout(() => {
      // Action à déclencher après le compte à rebours
      talentsThanksCalculator(executionId);
    }, durationInMilliseconds);
  };
  
  module.exports = startCountdown;
  