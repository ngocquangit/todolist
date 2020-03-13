const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const app = express();
const port = 3000;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

db.defaults({ users: [] }).write();

// var users = [
// { id: 1, name: 'Quang' },
// { id: 2, name: 'Đức' },
// ];
app.get('/', (req, res) =>
  res.render('index', {
    name: 'Quang',
  }),
);
app.get('/users', (req, res) =>
  res.render('./users/index', {
    users: db.get('users').value(),
  }),
);

app.get('/users/search', (req, res) => {
  var q = req.query.q;
  // var marchedUsers = arrUsers.filter(user => {
  //   return arrUsers.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  // });
  var matchedUsers = db
    .get('users')
    .value()
    .filter(user => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render('./users/index', {
    users: matchedUsers,
    question: q,
  });
  // console.log(typeof arrUsers);
});

app.get('/users/create', (req, res) => res.render('create'));
app.post('/users/create', (req, res) => {
  db.get('users')
    .push(req.body)
    .write();
  res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
