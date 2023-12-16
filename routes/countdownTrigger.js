// backend/countdownTrigger.js
const talentsThanksCalculator = require('./talentsThanksCalculator');

const startCountdown = (hours, executionId) => {
    
    const durationInMilliseconds = hours * 3600 * 1000;
  
    setTimeout(() => {
      // Action à déclencher après le compte à rebours
      talentsThanksCalculator(executionId);
    }, durationInMilliseconds);
  };
  
  module.exports = startCountdown;
  