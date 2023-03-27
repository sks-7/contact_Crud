const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MysqlSachin@90',
  database: 'contact_crud',
});

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send('wlcome to my server');
});



// Creating Get Request API

app.get('/getContact', (req, res) => {
  const sqlGet = 'SELECT * FROM contact_table';
  db.query(sqlGet, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Creating Post API

app.post('/createContact', (req, res) => {
  const { first_name, last_name, email, moblie_number } = req.body;

  const sqlInsert =
    'INSERT INTO contact_table ( first_name, last_name, email, moblie_number) VALUES (?,?,?,?)';

  db.query(
    sqlInsert,
    [first_name, last_name, email, moblie_number],
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

// Creating delete API

app.delete('/deleteContact/:id', (req, res) => {
  const { id } = req.params;

  const sqlRemove = 'DELETE FROM contact_table WHERE id = ?';

  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      res.send(error);
    } else {
     res.send(result);
    }
  });
});

// Creating Update API

app.put('/updateContact/:id', (req, res) => {
  const { id } = req.params;

  const { email, moblie_number } = req.body;

  const sqlUpdate =
    'UPDATE contact_table SET email = ?, moblie_number = ?  WHERE id = ?';

  db.query(sqlUpdate, [email, moblie_number, id], (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

app.listen(8080, () => {
  console.log(`server is running on port 8080`);
});
