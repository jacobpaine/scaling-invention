const express = require("express");
const app = express();
const mongojs = require('mongojs');
const bodyParser = require("body-parser");
const db = mongojs('contactlist', ['contactlist']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
  console.log("I received GET request, Jacob");

  app.post('/contactlist', function (req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
      res.json(doc);
    })
  })



  db.contactlist.find(function (err, docs){
    if (err) throw err;
    console.log("docs", docs);
    res.json(docs);
  })

  app.delete('/contactlist/:id', function (req, res){
    const id = req.params.id;
    console.log("id", id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
      res.json(doc);
    })
  })

  app.get('/contactlist/:id', function(req, res) {
    const id = req.params.id;
    console.log("id", id);

    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
      res.json(doc);
    })
  })
});

app.put('/contactlist/:id', function (req, res) {
  const id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, new: true}, function (err, doc) {
        res.json(doc);
    });
});

app.listen(3000);
console.log("server running on port 3000, Jacob");
