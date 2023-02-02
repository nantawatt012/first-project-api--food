// /////////// create DB
// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
