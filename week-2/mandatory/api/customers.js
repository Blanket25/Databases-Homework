const { Pool } = require("pg");
const secrets = require("./secrets.json");
const pool = new Pool(secrets);

//Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//Get a customer by Id
const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const result = await pool.query(`SELECT * FROM customers WHERE id=$1`, [
      customerId,
    ]);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
  }
};

//Update customer
const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const newName = req.body.name;
    const newAddress = req.body.address;
    const newCity = req.body.city;
    const newCountry = req.body.country;

    await pool.query(
      `UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5`,
      [newName, newAddress, newCity, newCountry, customerId]
    );
    res.status(202).send(`Customer ${customerId} updated`);
  } catch (err) {
    console.log(err);
  }
};

//Delete customer with no orders
const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const orderQuery = await pool.query(
      `SELECT * FROM orders WHERE customer_id=$1`,
      [customerId]
    );
    if (orderQuery.rows.length > 0) {
      res
        .status(400)
        .send(`The customer with id ${customerId} has pending orders`);
    } else {
      await pool.query(`DELETE FROM customers WHERE id=$1`, [customerId]);
      res.status(200).send(`Customer ${customerId} deleted`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
