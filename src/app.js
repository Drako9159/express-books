const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
//TODO path es para hacer rutas multiplataforma
//TODO __dirname es una variable global que contiene la ruta del directorio actual

//TODO Settings
app.set("port", 5000);
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
//TODO Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//TODO Routes
app.use(require("./routes/index"));
//TODO Static Files
app.use(express.static(path.join(__dirname, "public")));
// 404 handler
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

module.exports = app;
