//run with npm start
const express = require("express");
require("dotenv").config();
const { sequelize } = require("./src/models");
const config = require("./src/config/config");
const helmet = require("helmet");
const cors = require("cors");
const { reinitDB } = require("./src/controllers/InitController");
const { hasUsers } = require("./src/controllers/UserController");
const app = express();
app.use(helmet());
app.use(cors());

// app.get("/", (req, res) => {
//   const clientIP = req.ips.pop() || req.ip;
//   if (!clientIP) {
//     res.status(400).json({ error: "Invalid IP address" });
//     return;
//   }
//   console.log("req.ips:");
//   console.log(req.ips);
//   console.log("req.ip:");
//   console.log(req.ip);
//   console.log("IPPPPPPPP: " + clientIP);

//   return res.sendStatus(200);
// });

// parse requests of content-type - application/json v
app.use(express.json());

const routes = require("./src/routes");
const baseRouter = process.env.BASE_ROUTER;
app.use(baseRouter, routes);

require("./src/passport-config");

sequelize
  .sync()
  .then(async () => {
    // nodejs app on namecheap shared hosting sleeps if there are no interactions and reinits upon an interaction after some time. That is why here we implement a guard around the reinit method invocation.
    const shouldNotReinitDB = await hasUsers();
    if (true) {
      //TODO: change in prod
      await reinitDB();
    }
  })
  .then(() => {
    app.listen(config.port);
    console.log("BE started");
  })
  .catch((err) => console.error("in app.js: " + err));
