"use strict";

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { dirname } = require("path");
const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Route handlers
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Juan Hamilton",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Juan Hamilton",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        message: "I'm here to help",
        title: "Help",
        name: "Juan Hamilton",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address",
        });
    }
    const { address } = req.query;

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });

        forecast(latitude, longitude, (errorForecast, forecast) => {
            if (!errorForecast) {
                return res.send({
                    forecast,
                    location,
                    address,
                });
            }
            return res.send({ errorForecast });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Help article not found.",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "Page not found.",
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
