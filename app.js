const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
require("dotenv/config");
const api = process.env.API_URL; // http://localhost:3000/api/v1/products
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

//Routes
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");

app.use(cors());
app.options("*", cors());
//Middleware
app.use(bodyparser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use(errorHandler);

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

//DB Cinnection
mongoose
  .connect(process.env.Connection_Str)
  .then(() => {
    console.log(`Database connection is ready`);
  })
  .catch((err) => {
    console.log(err);
  });
//Server
app.listen(3000, () => {
  console.log(api);
  console.log(`server is running at port 3000`);
});
