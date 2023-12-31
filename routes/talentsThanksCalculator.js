const executeSQLRequest = require("./database");
const dioDailyThanks = require("./dioDailyThanks");
var fs = require("fs");


const talentsThanksCalculator = async (executionId) => {
  const parameters = JSON.parse(fs.readFileSync("parameters.json", "utf8"));

  const [
    selfReview,
    peerReview,
    ceoReview,
    isExCP,
  ] = await Promise.all([
    executeSQLRequest(`SELECT * FROM review WHERE id_execution = ?`, [executionId]),
    executeSQLRequest(`SELECT * FROM peer_review WHERE id_execution = ?`, [executionId]),
    executeSQLRequest(`SELECT * FROM ceo_review WHERE id_execution = ?`, [executionId]),
    executeSQLRequest(`SELECT EXISTS (SELECT 1 FROM review JOIN execution ON review.id_execution = execution.id WHERE review.id_issuer = execution.id_talent AND execution.id = ?) AS match_found;`, [executionId]),
  ]);
  
  //const rows = await executeSQLRequest(`SELECT id, id_ceo FROM dio WHERE id_execution = ?`, [executionId]);
  //const dio_id = rows[0].id;
  //const ceo_id = rows[0].id_ceo;



  const scoreFromSelfReview =
    parameters.autoEvaluation.difficulty[selfReview[0].difficulty] *
    parameters.autoEvaluation.reactivity[selfReview[0].reactivity];

  const scoreFromPeerReviews =
    peerReview.length > 0
      ? peerReview.reduce((sum, review) => {
          return (
            sum +
            parameters.peerReview.result[review.expectations] *
              parameters.peerReview.reactivity[review.reactivity]
          );
        }, 0) / peerReview.length
      : 0;
  
  let scoreFromCeoReview = 0;
  
  if (ceoReview.length > 0) {
    
    scoreFromCeoReview =
      parameters.CEOReview.result[ceoReview[0].expectations] *
      parameters.CEOReview.reactivity[ceoReview[0].reactivity];
  
  } 
  

  let thanks = parameters.scoreWeight.autoEvaluation * scoreFromSelfReview;

  if (scoreFromPeerReviews !== 0 && scoreFromCeoReview === 0) {
    thanks += (scoreFromPeerReviews * (parameters.scoreWeight.peerReview + parameters.scoreWeight.CEOReview));
  } else if (scoreFromPeerReviews === 0 && scoreFromCeoReview !== 0) {
    thanks += (scoreFromCeoReview * (parameters.scoreWeight.peerReview + parameters.scoreWeight.CEOReview));
  } else if (scoreFromPeerReviews === 0 && scoreFromCeoReview === 0){
    thanks = scoreFromSelfReview;
    
  }else{
    thanks += ((parameters.scoreWeight.peerReview * scoreFromPeerReviews) + (parameters.scoreWeight.CEOReview * scoreFromCeoReview));
  }

  if (isExCP) {
    const ExC = 0.1;
    const ExCP = 0.05;
    thanks *= (1 + ExC + ExCP);
  }

  console.log({ thanks });

  try {
    // Mettre à jour la colonne thanks dans la table users
    await executeSQLRequest(`UPDATE users SET thanks = thanks + ? WHERE id = ?;`, [Math.ceil(thanks), selfReview[0].id_issuer]);
    await executeSQLRequest(`UPDATE execution SET score_thanks = ?, status_ = ? WHERE id = ?;`,[Math.ceil(thanks), "Achieved",selfReview[0].id_execution]);
    // insertion des thanks dans la table DailyThanks
    await dioDailyThanks(Math.ceil(thanks), 1, 1);

  } catch (error) {
    console.error("Erreur lors de la mise à jour de la base de données :", error);
  } 

  //return thanks; 
};

module.exports = talentsThanksCalculator;
