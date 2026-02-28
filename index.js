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

//Prepare and insert values
// const insert = db.prepare(
//   "INSERT INTO products (category, name, description, image, price) VALUES (?,?, ?, ?,?)",
// );
// const productOne = insert.run(
//   "flowers",
//   "Rose D",
//   "A romantic gester starts with a rose",
//   "img/dahlia_one.jpg",
//   3.99,
// );
// const productTwo = insert.run(
//   "flowers",
//   "T Dawn",
//   "When they bloom the spring is already here!",
//   "img/dahlia_two.jpg",
//   1.99,
// );
// const productThree = insert.run(
//   "flowers",
//   "Lilly D",
//   "The arom is breathtaking!",
//   "img/dahlia_three.jpg",
//   0.99,
// );
// const productFour = insert.run(
//   "flowers",
//   "Da Dahlia",
//   "A flower that makes your wife happy!",
//   "img/dahlia_four.jpg",
//   5.99,
// );

//Read from database
const products = db.prepare("SELECT * FROM products").all();
console.log(products);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/flowers", (req, res) => {
  res.render("flowers.ejs", { products: products });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
