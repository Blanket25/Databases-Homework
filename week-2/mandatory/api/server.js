const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Blanket25",
  port: 5432,
});

//Get all customers
const getAllCustomers = (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
};

//Get all suppliers
const getAllSuppliers = (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
};

//Get all products with suppliers
const getProdAndSuppliers = (req, res) => {
  pool.query(
    "SELECT p.product_name, s.supplier_name FROM products p inner join suppliers s on s.id = p.supplier_id",
    (error, result) => {
      res.json(result.rows);
    }
  );
};

app.get("/customers", getAllCustomers);
app.get("/suppliers", getAllSuppliers);
app.get("/products", getProdAndSuppliers);

const PORT = 4000;
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
