const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const dotenv=require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const UserRoute=require("./routes/user");
const AuthRouter=require("./routes/auth");
const ProductRouter=require("./routes/product");
const OrderRouter = require("./routes/order");
const CartRouter=require("./routes/cart");
const StripeRouter=require("./routes/stripe");
const InvoiceRouter=require("./routes/invoice");
mongoose.connect(process.env.MONGODB_URL).then(()=>
{
  console.log("DB Connected Successfully");  
}).catch((err)=>
{
console.log(err);
});
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/api/user",UserRoute);
app.use("/api/auth",AuthRouter);
app.use("/api/products",ProductRouter);
app.use("/api/orders",OrderRouter);
app.use("/api/cart",CartRouter);
app.use("/api/checkout",StripeRouter);
app.use("/api/invoice",InvoiceRouter);
app.listen(3005,()=>
{
    console.log("Server connected Successfully");
});
