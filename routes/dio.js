var express = require("express");
var router = express.Router();
const createConnection = require("../dataBaseConnection");

/* GET dio listing. */
router.get("/", function (req, res, next) {
  const connection = createConnection();
  let sql = `SELECT id, nom_dio, dio_description FROM dio`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      connection.close();
    }
    res.send(rows);

    connection.close();
  });
});

/* POST dio creation. */
router.post("/", function (req, res, next) {
  const connection = createConnection();
  let sql = `INSERT INTO dio (nom_dio, dio_description) VALUES ('${req.body.nom_dio}', '${req.body.dio_description}')`;

  connection.query(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      connection.close();
    }
    res.send(rows);

    connection.close();
  });
});

/* GET dio list of execution of a DIO. */
/*router.get("/execution", function (req, res, next) {
  const dioId = req.query.dioId;
  const connection = createConnection();

// ... (votre code existant)

  connection.query(
  // Votre requête SQL reste inchangée
  `SELECT 
    execution.id, 
    execution.exec_description, 
    users.user_name AS talent_name, 
    execution.status_, 
    execution.deadline, 
    review.id_execution, 
    review.comments_ AS review_comments, 
    review.difficulty AS review_difficulty, 
    review.reactivity AS review_reactivity,
    ceo_review.comments AS ceo_comments,
    ceo_review.expectations AS ceo_expectations,
    ceo_review.reactivity AS ceo_reactivity,
    execution.ceo_feedback,
    execution.remaining_time,
    execution.link,
    execution.creation_date,
    peer_review.id AS peer_review_execution,
    peer_review.comments AS peer_review_comments
  FROM 
    execution 
  JOIN 
    users ON execution.id_talent = users.id 
  LEFT JOIN 
    review ON review.id_execution = execution.id
  LEFT JOIN 
    ceo_review ON ceo_review.id_execution = execution.id
  LEFT JOIN 
    peer_review ON peer_review.id_execution = execution.id
  WHERE 
    execution.id_dio = ? 
  ORDER BY 
    execution.last_updated DESC
  `,
  [dioId],
  (error, results) => {
    if (error) {
      console.error("Error in query:", error);
      return res.status(500).send("Error in database operation.");
    }

    const transformedResults = results.reduce((acc, row) => {
      const executionId = row.id;

      if (!acc[executionId]) {
        acc[executionId] = {
          id: row.id,
          exec_description: row.exec_description,
          talent_name: row.talent_name,
          status: row.status_,
          deadline: row.deadline,
          review_executionId: row.review_executionId,
          review_comments: row.review_comments,
          review_difficulty: row.review_difficulty,
          review_reactivity: row.review_reactivity,
          ceo_comments: row.ceo_comments,
          ceo_expectations: row.ceo_expectations,
          ceo_reactivity: row.ceo_reactivity,
          ceo_feedback: row.ceo_feedback,
          remaining_time: row.remaining_time,
          link: row.link,
          creation_date: row.creation_date,
          peerReviews: [],
        };
      }

      if (row.peer_review_execution) {
        acc[executionId].peerReviews.push({
          id: row.peer_review_execution,
          comments: row.peer_review_comments,
        });
      }

      return acc;
    }, {});

    res.json({ combinedData: Object.values(transformedResults) });

    // Fermer la connexion après avoir fini de traiter les requêtes
    connection.end();
  }
);
})*/

router.get("/execution", function (req, res, next) {
  const dioId = req.query.dioId;
  const connection = createConnection();

  connection.query(
    `SELECT 
    execution.id, 
    execution.exec_description, 
    users.user_name AS talent_name, 
    execution.status_, 
    execution.deadline, 
    review.id_execution, 
    review.comments_ AS review_comments, 
    review.difficulty, 
    review.reactivity AS review_reactivity,
    ceo_review.comments AS ceo_comments,
    ceo_review.expectations,
    ceo_review.reactivity AS ceo_reactivity
FROM 
    execution 
JOIN 
    users ON execution.id_talent = users.id 
LEFT JOIN 
    review ON review.id_execution = execution.id
LEFT JOIN 
    ceo_review ON ceo_review.id_execution = execution.id
WHERE 
    execution.id_dio = ? 
ORDER BY 
    execution.last_updated DESC
`,
    [dioId],
    (error, results) => {
      if (error) {
        console.error("Error in query:", error);
        return res.status(500).send("Error in database operation.");
      }

      // Process results as needed
      res.json({ combinedData: results });

      // Close the connection when finished processing queries
      connection.end();
    }
  );
});



router.get("/selfreview", function (req, res, next) {
  const dioId = req.query.dioId;
  const connection = createConnection();

  connection.query(
    `SELECT 
    execution.id, 
    execution.exec_description, 
    users.user_name AS talent_name, 
    execution.status_, 
    execution.deadline, 
    review.id_execution, 
    review.comments_ AS review_comments, 
    review.difficulty AS review_difficulty, 
    review.reactivity AS review_reactivity,
    ceo_review.comments AS ceo_comments,
    ceo_review.expectations AS ceo_expectations,
    ceo_review.reactivity AS ceo_reactivity,
    execution.ceo_feedback,
    execution.remaining_time,
    execution.link,
    execution.creation_date
FROM 
    execution 
JOIN 
    users ON execution.id_talent = users.id 
LEFT JOIN 
    review ON review.id_execution = execution.id
LEFT JOIN 
    ceo_review ON ceo_review.id_execution = execution.id
WHERE 
    execution.id_dio = ? 
ORDER BY 
    execution.last_updated DESC
`,
    [dioId],
    (error, results) => {
      if (error) {
        console.error("Error in query:", error);
        return res.status(500).send("Error in database operation.");
      }

      // Process results as needed
      res.json({ combinedData: results });

      // Close the connection when finished processing queries
      connection.end();
    }
  );
});




router.get("/selfreview", function (req, res, next) {
  dioId = req.query.dioId;
  const connection = createConnection();
  const sql = `SELECT review.id_execution, review.comments_, review.difficulty, review.reactivity
                FROM review
                JOIN execution ON  review.id_execution= execution.id `;         //AND ceo_validated = 1
  connection.query(sql, [dioId], (err, rows) => {
    if (err) {
      console.log(err);
      connection.close();
    }
    res.send(rows);
    connection.close();
  });
});



/* ADD user to DIO */
router.post("/addUser", function (req, res, next) {
  const userId = req.body.id_user;
  const dioId = req.body.id_dio;
  const connection = createConnection();
  let sql = `INSERT INTO user_dio (id_user, id_dio) VALUES (?, ?)`;

  connection.query(sql, [userId, dioId], (err, rows) => {
    if (err) {
      console.log(err);
      connection.close();
    }
    res.send(rows);

    connection.close();
  });
});


module.exports = router;
