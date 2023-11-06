# ThanksAndTips

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.ec-lyon.fr/placroix/thanksandtips.git
git branch -M main
git push -uf origin main
```

# How to run backend

Make sure you have node.js installed on your computer.

In the console, open the folder were this repo is cloned. Then go in the backend folder

`cd backend`

Then install all the dependencies :

`npm i`

We don't push de .env file, so create a new one by copying the example :

`cp .env.example .env`

Make sure to modify the values according to your installation

Then run the server with the folowing command

`npm run start`

## Installation

Comment créer une base données complète en MySQL :
Pour créer une base de données complète en MySQL, vous devrez suivre plusieurs étapes. Voici un guide général pour créer une base de données en utilisant MySQL :

1. **Installation de MySQL : ** Tout d'abord, assurez-vous que MySQL est installé sur votre système. Vous pouvez télécharger et installer MySQL depuis le site officiel de MySQL : https://dev.mysql.com/downloads/mysql/

2. **Démarrage du serveur MySQL : ** Assurez-vous que le serveur MySQL est en cours d'exécution. Vous pouvez le démarrer à partir de la ligne de commande ou en utilisant un outil comme MySQL Workbench.

3. **Connexion à MySQL : ** Vous devez vous connecter à MySQL en tant qu'utilisateur avec des privilèges pour créer une base de données. Vous pouvez utiliser la ligne de commande ou un outil de gestion MySQL tel que MySQL Workbench. Voici un exemple de connexion en ligne de commande :

   ```bash
   mysql -u VOTRE_UTILISATEUR -p
   ```

   Remplacez `VOTRE_UTILISATEUR` par le nom d'utilisateur MySQL que vous souhaitez utiliser.

4. **Création de la base de données : ** Une fois connecté à MySQL, vous pouvez créer une nouvelle base de données en utilisant la commande SQL `CREATE DATABASE`. Par exemple, pour créer une base de données appelée "ma_base_de_donnees", vous pouvez exécuter :

   ```sql
   CREATE DATABASE ma_base_de_donnees;
   ```

   Assurez-vous de terminer toutes les instructions SQL avec un point-virgule (`;`).

5. **Sélection de la base de données : ** Vous devez sélectionner la base de données que vous venez de créer pour commencer à travailler dessus. Utilisez la commande `USE` pour cela :

   ```sql
   USE ma_base_de_donnees;
   ```

   Désormais, toutes les opérations SQL que vous effectuez seront appliquées à la base de données "ma_base_de_donnees".

6. **Création de tables : ** Une fois que vous avez créé votre base de données, vous pouvez commencer à créer des tables. Utilisez la commande SQL `CREATE TABLE` pour définir la structure de vos tables. Voici un exemple simplifié :

   ```sql
   CREATE TABLE utilisateurs (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nom VARCHAR(255),
       email VARCHAR(255)
   );
   ```

   Cette commande crée une table "utilisateurs" avec trois colonnes : "id", "nom" et "email".

7. **Insertion de données : ** Vous pouvez maintenant insérer des données dans vos tables à l'aide de la commande SQL `INSERT INTO`. Par exemple :

   ```sql
   INSERT INTO utilisateurs (nom, email) VALUES ('John Doe', 'john.doe@example.com');
   ```

   Cela insère une nouvelle ligne dans la table "utilisateurs".

8. **Interrogation des données : ** Vous pouvez interroger vos données à l'aide de la commande SQL `SELECT`. Par exemple :

   ```sql
   SELECT * FROM utilisateurs;
   ```

   Cela renverra toutes les lignes de la table "utilisateurs".

9. **Modification et suppression de données : ** Vous pouvez également mettre à jour et supprimer des données à l'aide des commandes SQL `UPDATE` et `DELETE`.

10. **Déconnexion : ** Lorsque vous avez terminé de travailler avec MySQL, vous pouvez vous déconnecter en utilisant la commande `QUIT` ou simplement en fermant la fenêtre de la ligne de commande.
