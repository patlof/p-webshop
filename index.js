import express from "express";
import Database from "better-sqlite3";

const app = express();
const port = 3000;

//To read from form
app.use(express.urlencoded({ extended: true }));

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

// Home-page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//Read more page
app.post("/readmore", (req, res) => {
  const articleId = parseInt(req.body.productid);
  const gardenItems = products.filter(function (item) {
    return item.id === articleId;
  });
  res.render("readmore.ejs", { product: gardenItems });
});

// Flower page
app.get("/flowers", (req, res) => {
  res.render("flowers.ejs", { products: flowerItems });
});

//Garden page
app.get("/garden", (req, res) => {
  res.render("garden.ejs", { products: gardenItems });
});

// Checkout page
app.get("/checkout", (req, res) => {
  res.render("checkout.ejs");
});

// Listening to port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
