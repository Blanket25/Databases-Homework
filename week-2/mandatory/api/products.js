const { Pool } = require("pg");
const secrets = require("./secrets.json");
const pool = new Pool(secrets);

//Get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM suppliers");
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//Get all products
const getAllProducts = async (req, res) => {
  try {
    const searchProduct = req.query.searchProduct;
    if (searchProduct) {
      productQuery = await pool.query(
        `SELECT * FROM products WHERE product_name LIKE '%${searchProduct}%'`
      );
      if (productQuery.rows.length > 0) {
        res.send(productQuery.rows);
      } else {
        res.status(404).send("Product not found");
      }
    } else {
      const result = await pool.query(`SELECT * FROM products `);
      res.status(200).send(result.rows);
    }
  } catch (err) {
    console.log(err);
  }
};

//Create a product
const createNewProduct = async (req, res) => {
  try {
    const newProductName = req.body.product_name;
    const newProductPrice = req.body.unit_price;
    const supplierId = req.body.supplier_id;

    const result = await pool.query(
      `INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3) returning id`,
      [newProductName, newProductPrice, supplierId]
    );
    const responseBody = { productId: result.rows[0].id };
    res.status(201).send(responseBody);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllSuppliers,
  getAllProducts,
  createNewProduct,
};
