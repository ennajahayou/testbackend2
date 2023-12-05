
const createConnection = require("../dataBaseConnection");
var fs = require("fs");

const peersThanksCalculator =  (executionId, scenario) => {

    const sqlPeerReview = `SELECT * FROM peer_review WHERE id_execution = ?`;

}