const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const mysql = require('mysql');
const siteRoutes = require('./routes/siteRoutes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', siteRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
})