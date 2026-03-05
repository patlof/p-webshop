import express from "express";
import Database from "better-sqlite3";

const app = express();
const port = 3000;

//Connect to db
const db = new Database("data.db");

// Create table
db.exec(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        category TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        image TEXT,
        price DECIMAL(6, 2) NOT NULL)`);

//Read from database
const products = db.prepare("SELECT * FROM products").all();

//Split answer products by categorys
const flowerItems = products.filter(function (item) {
  return item.category === "flowers";
});

const gardenItems = products.filter(function (item) {
  return item.category === "tools";
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/flowers", (req, res) => {
  res.render("flowers.ejs", { products: flowerItems });
});

app.get("/garden", (req, res) => {
  res.render("garden.ejs", { products: gardenItems });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
