// Imports
const express = require('express');
const app = express();
const port = 3000;

// Set up static file serving
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/images'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(port, () => console.info(`App listening on port ${port}`));