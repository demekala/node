// Imports
const express = require('express');
const app = express();
const port = 3000;

// Set up static file serving
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/images'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

// Define a route for the root URL
app.get('/', (req, res) => {
    res.render('index');
});

// Navigation
app.get('/index', (req, res) => {
    res.render('index');
});

app.listen(port, () => console.info(`App listening on port ${port}`));
