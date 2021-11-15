const express = require("express");
const app = express();
const {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("./customers");
const {
  getAllSuppliers,
  getAllProducts,
  createNewProduct,
} = require("./products");
const {
  getAllOrders,
  createNewOrder,
  deleteOrder,
  getOrdersWithItems,
} = require("./orders");
const PORT = 4000;

app.use(express.json());

app.get("/customers", getAllCustomers);
app.get("/customers/:customerId", getCustomerById);
app.get("/suppliers", getAllSuppliers);
app.get("/products", getAllProducts);
app.get("/orders", getAllOrders);
app.get("/customers/:customerId/orders", getOrdersWithItems);
app.post("/products", createNewProduct);
app.post("/customers/:customerId/orders", createNewOrder);
app.put("/customers/:customerId", updateCustomer);
app.delete("/orders/:orderId", deleteOrder);
app.delete("/customers/:customerId", deleteCustomer);

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
