const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(`${__dirname}/views/partials`)
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    const now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log', err);
        }
    });
    
    next();
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home',
        someMessage: 'Welcome message'
    });
});

app.get('/projects', (req, res) => {
    // res.send('<h1>Hello express</h1>');
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    });
})


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error'
    })
})

// app.use((req, res, next) => {
//     res.render('maintance');
// })

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});