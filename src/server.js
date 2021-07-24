const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const { sequelize } = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3333;

// Handlebars settings & Express template engine setting
const hbs = exphbs.create({ extname: ".hbs", defaultLayout: "index", helpers });
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "gT3TESk4yaV0G9Rm38cZ",
    cookie: {},
    maxAge: 900000,
    rolling: true,
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public/")));
app.use((req, res, next) => {
  console.log("incoming req:", req.url);
  res.locals.loggedIn = req.session.logged_in;
  res.locals.userId = req.session.userId;
  res.locals.url = req.url;
  next();
});
app.use(routes);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Now listening to server: http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error(err));
