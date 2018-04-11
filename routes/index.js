var express = require('express');
var router = express.Router();
const mysql = require('mysql');
//initalisation de la connexion à mysql
let sqlConnexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Makwesh8",
  database: "Rapaces_de_gap"
});





let selectQuery = 'SELECT * FROM joueurs'; //requête sur table joueurs

let staffQuery = 'SELECT * FROM staff'; // requête sur table staff
//variables pour stocker data staff
let idSt = [];
let photoSt = [];
let nomSt = [];
let flagSt = [];
let posteSt = [];
// variables pour stocker data joueurs
let id = [];
let photo = [];
let prenom = [];
let nom = [];
let poste = [];
let shoot = [];
let naissance = [];
let age = [];
let flag = [];
let poids = [];
let taille = [];
let media = [];

//sur get lancement de la requête sql




/* GET home page. */
router.get('/', function(req, res, next) {
  sqlConnexion.query(
    selectQuery,
    function select(error, results, fields) {
      if (error) {
        console.log(error);
        sqlConnexion.end();
        return;
      }


      for (let i = 0; i < results.length; i++) {

        //si la fonction reçoit des données, les stocker dans var.
        if ( results.length > 0 )  {
          let data = results[i];
          id[i]  = data['id'];
          photo[i] = data['photo']
          nom[i] = data['nom'];
          prenom[i] = data['prenom'];
          poste[i] = data['poste'];
          shoot[i] = data['shoot'];
          naissance[i] = data['naissance'];
          age[i] = data['age'];
          flag[i] = data['nationnalité'];
          poids[i] = data['poids'];
          taille[i] = data['taille'];
          media[i] = data ['media'];

          //console.log(data);
        } else {
          console.log('no data');
        }
      }

        //envoyer variables sur les pages de rendu



      console.log(nom);
      console.log(prenom);
    }
  );
  res.render('index', { photo, prenom,
  nom, poste, shoot, naissance, age, flag, poids, taille, media });
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin');
});
/*
sqlConnexion.query(
  staffQuery,
  function select(error, results, fields) {
    if (error) {
      console.log(error);
      sqlConnexion.end();
      return;
    }
    for (let i = 0; i < results.length; i++) {
      //stockage dans variables des différentes clés
      if ( results.length > 0 )  {
        let data = results[i];
        idSt[i]  = data['id'];
        photoSt[i] = data['photo'];
        nomSt[i] = data['nom'];
        posteSt[i] = data['poste'];
        flagSt[i] = data['nationnalité'];

        //console.log(data);
      } else {
        console.log('no data');
      }
    }
      //envoi des var. sur les pages de rendu
      router.get('/', function(req, res, next) {
        res.render('index', {idSt, photoSt, nomSt, posteSt, flagSt});

      });


    //fin de la connexion à la BDD
    sqlConnexion.end();

    console.log(nomSt);
    console.log(posteSt);

    }
  );
*/
module.exports = router;
