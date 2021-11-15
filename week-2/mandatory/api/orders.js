const { Pool } = require("pg");
const secrets = require("./secrets.json");
const pool = new Pool(secrets);

//Get all orders
const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM orders`);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//Create a new order for a  customer

const createNewOrder = async (req, res) => {
  try {
    const customerId = req.params.customerId;

    const newOrderDate = req.body.order_date;
    const newOrderReference = req.body.order_reference;

    const customer = await pool.query(`SELECT * FROM customers WHERE id=$1`, [
      customerId,
    ]);
    if (customer.rows.length < 1) {
      res.status(404).send("customer not found");
    }

    await pool.query(
      `INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)`,
      [newOrderDate, newOrderReference, customerId]
    );
    res.status(201).send("new order created");
  } catch (err) {
    console.log(err);
  }
};

//Delete existing order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await pool.query(`DELETE FROM order_items WHERE order_id=$1`, [orderId]);
    await pool.query(`DELETE FROM orders WHERE id=$1`, [orderId]);
    res.status(200).send(`Order ${orderId} deleted`);
  } catch (err) {
    console.log(err);
  }
};

//load all the orders along the items in the orders of a specific customer
const getOrdersWithItems = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const result = await pool.query(
      `SELECT o.order_reference, o.order_date, p.product_name, p.unit_price, s.supplier_name, oi.quantity FROM orders o
      INNER JOIN customers c ON o.customer_id = c.id
      INNER JOIN order_items oi ON o.id = oi.order_id
      INNER JOIN products p ON p.id = oi.product_id
      INNER JOIN suppliers s ON s.id = p.supplier_id
      WHERE c.id=$1`,
      [customerId]
    );
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllOrders,
  createNewOrder,
  deleteOrder,
  getOrdersWithItems,
};
