const createConnection = require("./dataBaseConnection");

userPaul = {
  name: "Paul",
  mail: "paul.lacroix@etu.ec-lyon.fr",
  password_: "12345678",
};

dioCDL = {
  nom_dio: "CDL",
  dio_description: "Centrale digital lab",
};

const connection = createConnection();

connection.query(
  `INSERT INTO dio (nom_dio, dio_description) VALUES ('${dioCDL.nom_dio}', '${dioCDL.dio_description}')`,
  (err, rows) => {
    if (err) throw err;
    console.log(rows);
  }
);

connection.query(
  `INSERT INTO users (user_name, email, password_) VALUES ('${userPaul.name}', '${userPaul.mail}', '${userPaul.password_}')`,
  (err, rows) => {
    if (err) throw err;
    console.log(rows);
  }
);

connection.end();
