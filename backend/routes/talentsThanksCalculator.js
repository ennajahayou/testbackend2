const createConnection = require("../dataBaseConnection");
var fs = require("fs");

// const autoEvaluationScoreWeight = [0.34, 0.5, 0.25];
// const PeerReviewScoreWeight = [0.33, 0.25, 0.5];
// const CEOEvaluationScoreWeight = [0.33, 0.25, 0.25];

// const ed_evaluations_descriptions = [
//   [1, 4, 10, 20],
//   [1, 7, 12, 30],
//   [1, 10, 25, 50],
// ];

// const er_evaluations_descriptions = [
//   [1, 4, 10, 20],
//   [1, 7, 12, 30],
//   [1, 10, 25, 50],
// ];

const talentsThanksCalculator = async (executionId, scenario) => {
  var parameters = JSON.parse(fs.readFileSync("parameters.json", "utf8"));
  
  // Get self review from database

  const sqlSelfReview = `SELECT * FROM review WHERE id_execution = ?`;
  const sqlPeerReview = `SELECT * FROM peer_review WHERE id_execution = ?`;
  const sqlCeoReview = `SELECT * FROM ceo_review WHERE id_execution = ?`;
  const sqlIsExCP = 'SELECT EXISTS (SELECT 1 FROM review JOIN execution ON review.id_execution = execution.id WHERE review.id_issuer = execution.id_talent AND execution.id = ?) AS match_found;'

  const [selfReview, peerReview, ceoReview,IsExCP] = await Promise.all([
    executeSQLRequest(sqlSelfReview, [executionId]),
    executeSQLRequest(sqlPeerReview, [executionId]),
    executeSQLRequest(sqlCeoReview, [executionId]),
    executeSQLRequest(sqlIsExCP, [executionId]),
  ]);

  console.log({ selfReview, peerReview, ceoReview });

  const scoreFromSelfReview =
    parameters.autoEvaluation.difficulty[selfReview[0].difficulty] *
    parameters.autoEvaluation.reactivity[selfReview[0].reactivity];

  // const thanksFromSelfReview =
  //   ed_evaluations_descriptions[scenario][selfReview[0].difficulty] *
  //   er_evaluations_descriptions[scenario][selfReview[0].reactivity];
 
  const scoreFromPeerReviews =
    peerReview.length > 0
      ? peerReview.reduce((sum, review) => {
          return (
            sum +
            parameters.peerReview.result[review.expectations] *
              parameters.peerReview.reactivity[review.reactivity]
              // ed_evaluations_descriptions[scenario][review.respect] *
              // er_evaluations_descriptions[scenario][review.expectations]
          );
        }, 0) / peerReview.length
      : 0;

      
  const scoreFromCeoReview =
    parameters.CEOReview.result[ceoReview[0].expectations] *
    parameters.CEOReview.reactivity[ceoReview[0].reactivity];
  // ed_evaluations_descriptions[scenario][ceoReview[0].expectations] *
  // er_evaluations_descriptions[scenario][ceoReview[0].reactivity];

  console.log({
    scoreFromSelfReview,
    scoreFromCeoReview,
    scoreFromPeerReviews,
  });

  let thanks =
  parameters.scoreWeight.autoEvaluation * scoreFromSelfReview +
  parameters.scoreWeight.peerReview * scoreFromPeerReviews +
  parameters.scoreWeight.CEOReview * scoreFromCeoReview;

  if (IsExCP) {
    const ExC = 0.1;
    const ExCP = 0.05;
    thanks *= (1 + ExC + ExCP);
 }

// Vous pouvez maintenant utiliser thanks à l'extérieur de la condition if, et sa valeur pourrait avoir été modifiée à l'intérieur de la condition if.

  
  // autoEvaluationScoreWeight[scenario] * thanksFromSelfReview +
  // CEOEvaluationScoreWeight[scenario] * thanksFromCeoReview +
  // PeerReviewScoreWeight[scenario] * thanksFromPeerReviews;

  console.log({ thanks });

  return thanks;
};

const executeSQLRequest = async (sql, params) => {
  const connection = createConnection();

  const res = new Promise((resolve, reject) => {
    connection.query(sql, params, (err, rows) => {
      connection.close();
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });

  return res;
};

// const executionId = 50;
// thanksCalculator(executionId, 2);

module.exports = talentsThanksCalculator;
  ;
