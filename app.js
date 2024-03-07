// app.js

/******************************************************************************
 * ITE5315 – Assignment 2
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Mohit Kumar       Student ID: N01570029       Date: 06-02-2024
 *
 *****************************************************************************/

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Step 6: Adding Assignment 1 code into the template
const assignment1Routes = require('./views/assignment1Routes');
app.use('/assignment1', assignment1Routes);

// Step 7: Design a new route “/allData” to display all products info
// Step 8: Modify Step 7 by removing/notShowing those products which their “reviews" is zero
// Step 9: Design a custom helper for changing "reviews": “0” to “N/A”.
app.get('/allData', (req, res) => {
  // Mock data for Step 7
  const products = [
    { name: 'Product 1', price: '$10', reviews: 5 },
    { name: 'Product 2', price: '$20', reviews: 0 },
    { name: 'Product 3', price: '$15', reviews: 2 },
  ];

  // Handlebars helper for Step 9
  exphbs.create({
    helpers: {
      replaceZeroWithNA: function (reviews) {
        return reviews === 0 ? 'N/A' : reviews;
      },
    },
  });

  // Render the view with products data
  res.render('allData', { title: 'All Data', products });
});

// Step 10: Change table row color for those records which "reviews" is zero
// In this app, find a use case for utilizing “Partial” Templates in Step 10
// ...

// Error route
app.all('*', (req, res) => {
  res.render('error', { title: 'Error', message: 'Incorrect route entered!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
