// server creator package
const express = require('express');
// validator package
const Joi = require('joi');

// utilize express
const app = express();

// environment variables & (export PORT=6000) in the terminal in the same directory
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

const genres = [
    {id: 1, name: 'action'},
    {id: 2, name: 'epic'},
    {id: 3, name: 'adventure'},
    {id: 4, name: 'drama'},
    {id: 5, name: 'documentary'},
]

// GET route for the homepage
app.get('/', (req, res) => {
    res.send('Welcome to Vidly movie site. Have fun.');
    res.end();
});

// GET route that shows all the available genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
    res.end();
});

// a GET route that shows a specific genre
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    // validate the genre
    if(!genre) return res.status(404).send('Please, kidly note that we still do not have that genre ready. keep checking');
    res.send(genre);
    res.end();
});

// first create a genre validator function below
function validateGenre(genre) {
    // use joi schema
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

// POST route to create a genre
app.post('/api/genres', (req, res) => {
    // implement object destruction
    const { error } = validateGenre(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genres);
});

// update the genres using PUT route
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    // validate the genre
    if(!genre) return res.status(404).send('Please, kindly note that we still do not have that genre ready. keep checking');

    const { error } = validateGenre(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    // update the course
    genre.name = req.body.name;
    // show the course
    res.send(genre);
    res.end();
});

// DELETE routes
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    // validate the genre
    if(!genre) return res.status(404).send('Please, kindly note that we still do not have that genre ready. keep checking');
    
    // delete the course here
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // send the response
    res.send(genre);
    res.end();
});


// create the listening port
app.listen(port, () => console.log(`The server is listening on port ${port}`));

