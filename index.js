const express = require("express");
const Pool = require("pg-pool");
const bodyParser = require("body-parser");
const { CREATE, FETCH_ALL } = require("./DB/queries");
const { CONFIG } = require("./DB/constants");

const PORT = 8080;
const app = express();

// parse application/json
app.use(bodyParser.json());

const pool = new Pool(CONFIG);

pool.connect((err, client, done) => {
  if (err) return done(err);
  client.query(CREATE, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Tables are all set for development.");
  });

  app.get("/", (req, res) => {
    client.query(FETCH_ALL).then((data) => {
      res.status(200).json({ data: data.rows });
    });
  });

  app.post("/", (req, res) => {
    client
      .query(
        `insert into test_schema.books ( title, author, description) 
                      values ('${req.body.title}', '${req.body.author}', '${req.body.description}');`
      )
      .then(() => {
        res.status(201).json({ message: "Created Successfully" });
      })
      .catch((err) => {
        res.status(401).json({ err });
      });
  });
});

app.listen(PORT, () => console.log("App running on port " + PORT));
