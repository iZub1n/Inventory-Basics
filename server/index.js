const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWWORD,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.listen(3001, () => {
  console.log("Server Running on Port: 3001.");
});

app.post("/create", (req, res) => {
  const item_name = req.body.item_name;
  const item_id = req.body.item_id;
  const manufacturer = req.body.manufacturer;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const tags = req.body.tags;
  const price = req.body.price;

  pool.query(
    "INSERT INTO items_summary (Item_ID, Item_Name, Manufacturer, Description, Quantity, Tags, Price) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [item_id, item_name, manufacturer, description, quantity, tags, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Record Added to Database");
      }
    }
  );
});

app.get("/getItemsList", (req, res) => {
  pool.query("SELECT * FROM items_summary", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getItemSummary", (req, res) => {
  pool.query(
    "SELECT * FROM items_summary WHERE item_id = $1 LIMIT 1",
    [req.query.item_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateItemRecord", (req, res) => {
  const item_id = req.body.item_id;
  const item_name = req.body.item_name;
  const manufacturer = req.body.manufacturer;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const tags = req.body.tags;
  const price = req.body.price;
  console.log(price);
  console.log(item_name);
  console.log(item_id);
  pool.query(
    "UPDATE items_summary SET price=$1, tags=$2, description=$3, quantity=$4, manufacturer=$5, item_name=$6 WHERE item_id = $7",
    [price, tags, description, quantity, manufacturer, item_name, item_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:item_id", (req, res) => {
  const item_id = req.params.item_id;

  pool.query(
    "DELETE FROM items_summary WHERE item_id=$1",
    [item_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
