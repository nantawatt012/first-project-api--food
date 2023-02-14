// /////////// create DB
// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./routes/auth-route");
const shopRoute = require("./routes/shop-route");
const cartRoute = require("./routes/cart-route");
const homeRoute = require("./routes/home-route");
const orderRoute = require("./routes/order-route");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
// const authenticateUser = require("./middlewares/authenticate");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowms: 1000,
    max: 10000000
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

///////////////////////////////////////////////////

app.use("/auth", authRoute);
app.use("/shop", shopRoute);
app.use("/cart", cartRoute);
app.use("/home", homeRoute);
app.use("/order", orderRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server run on port: ${port}`));
