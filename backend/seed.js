const createConnection = require("./dataBaseConnection");

userMourad = {
  name: "Mourad",
  mail: "a",
  password_: "12345678",
};

userPaul = {
  name: "Paul",
  mail: "b",
  password_: "12345678",
};

userOusmane = {
  name: "Ousmane",
  mail: "c",
  password_: "12345678",
};

userMohamed = {
  name: "Mohamed",
  mail: "d",
  password_: "12345678",
};

userHassan = {
  name: "Hassan",
  mail: "e",
  password_: "12345678",
};

userMarine = {
  name: "Marine",
  mail: "f",
  password_: "12345678",
};

userHelene = {
  name: "Helene",
  mail: "g",
  password_: "12345678",
};

dioCDL = {
  nom_dio: "CDL",
  dio_description: "Centrale digital lab",
  id_ceo: 1,
};

const users = [
  userMourad,
  userPaul,
  userOusmane,
  userMohamed,
  userHassan,
  userMarine,
  userHelene,
];

const connection = createConnection();

users.forEach((user) => {
  connection.query(
    `INSERT INTO users (user_name, email, password_) VALUES ('${user.name}', '${user.mail}', '${user.password_}')`,
    (err, rows) => {
      if (err) throw err;
      console.log(rows);
    }
  );
});

connection.query(
  `INSERT INTO dio (nom_dio, dio_description, id_ceo) VALUES ('${dioCDL.nom_dio}', '${dioCDL.dio_description}', ${dioCDL.id_ceo})`,
  (err, rows) => {
    if (err) throw err;
    console.log(rows);
  }
);

connection.end();
