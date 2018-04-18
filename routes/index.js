const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const nodemailer = require("nodemailer");
const mg = require('nodemailer-mailgun-transport');

//initalisation de la connexion à mysql server
let sqlConnexion = mysql.createConnection({host: "sql7.freemysqlhosting.net", user: "sql7233307", password: "VXV4tMbIPY", database: "sql7233307", multipleStatements: true});

//requête sur table joueurs & staff
let selectQuery = 'SELECT * FROM joueurs;SELECT * FROM staff';

//sur get lancement de la requête sql sur index
router.get('/', (req, res, next) => {
  sqlConnexion.query(selectQuery, function(err, rows) {
    if (err)
      throw err;
    let joueurs = rows[0];
    let staffs = rows[1];
    res.render('index', {staffs, joueurs}); //envoi du rendu de la vue et de la variable contenant les données joueurs et staff
  });
})

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  sqlConnexion.query(selectQuery, function(err, rows) {
    if (err)
      throw err;
    let joueurs = rows[0];
    let staffs = rows[1];
    console.log(joueurs[1].shoot);
    res.render('admin', {staffs, joueurs}); //envoi du rendu de la vue et de la variable contenant les données joueurs et staff
  });
});

router.post('/edit-membre', function(req, res, next) {
  let updateJoueurs = `UPDATE joueurs
  SET poste='${req.body.poste}', shoot='${req.body.shoot}', naissance='${req.body.date_naissance}', age='${req.body.age}',
  pays='${req.body.pays}', poids='${req.body.poid}', taille='${req.body.taille}', played_matchs='${req.body.matchs_joues}',
  goals='${req.body.buts}', assists='${req.body.assist}', points='${req.body.points}', penalty='${req.body.penalites}',
  shoots='${req.body.tirs}', efficiency='${req.body.efficacite}'
  WHERE id=${req.body.id}`
  sqlConnexion.query(updateJoueurs);
  res.redirect('/admin');
});

function sendMail(lastname, firstname, mail, phone, message) {
  var auth = {
    auth: {
      api_key: 'key-a49784d269ad7f285852325f51c85e5a',
      domain: 'sandbox4705080d1e034004bdd80a27208ed7bd.mailgun.org'
    }
  }

  var nodemailerMailgun = nodemailer.createTransport(mg(auth));

  nodemailerMailgun.sendMail({
    from: `${firstname} ${lastname} <${mail}>`, // Expediteur
    to: mail, // Destinataires
    subject: `Formulaire de contact, message de ${firstname} ${lastname}`, // Sujet
    text: message, // plaintext body
    html: message // html body
  }, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }
  });
}

/* FORM */
router.post('/form', function(req, res, next) {
  sendMail(req.body.lastname, req.body.firstname, req.body.mail, req.body.phone, req.body.message);
  res.redirect('/#form');
});

module.exports = router;
