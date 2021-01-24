const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan');

const app = express();
app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

let topMovies = [
    {
      title: 'Harry Potter and the Prisoner of Azkaban',
      director: 'Alfonso Cuaron'
      // genre: 'Fantasy'
    },
    {
      title: 'The Dark Knight',
      director: 'Christopher Nolan'
      // genre: 'Action'
    },
    {
      title: '8 Mile',
      director: 'Curtis Hanson'
      // genre: 'Drama'
    },
    {
      title: 'Focus',
      director: 'Glenn Ficarra'
      // genre: 'Romance'
    },
    {
      title: 'Ready Player One',
      director: 'Steven Spielberg'
      // genre: 'Sci-fi'
    },
    {
      title: 'Back to the Future II',
      director: 'Steven Spielberg'
      // genre: 'Sci-fi'
    },
    {
      title: 'Jurassic Park',
      director: 'Steven Spielberg'
      // genre: 'Action'
    },
    {
      title: 'Toy Story',
      director: 'John Lasseter'
      // genre: 'Animation'
    },
    {
      title: 'The Breakfast Club',
      director: 'John Hughes'
      // genre: 'Drama'
    },
    {
      title: 'Southpaw',
      director: 'Antoine Fuqua'
      // genre: 'Drama'
    }
  ];

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix');
});
  
app.get('/movies', (req, res) => {
    res.send('Successful GET request returning data on all movies');
});
  
// Get data about a single movie, by title
app.get('/movies/:title', (req,res) => {
    res.send('Successful GET request returning data on movie title: ' + req.params.title);
});
  
// Get data about a genre by title
app.get('/movies/genres/:genre', (req,res) => {
    res.send('Successful GET request returning data on genre: ' + req.params.genre);
});
  
// Get data about a director by name
app.get('/movies/directors/:name', (req,res) => {
    res.send('Successful GET request returning data on director: ' + req.params.name);
});
  
  // Post new user registration
app.post('/users', (req,res) => {
    res.send('Successful POST request registering new user');
});

// Put updates to user information
app.put('/users/:username', (req,res) => {
    res.send('Successful PUT request updating information for user: ' + req.params.username);
});
// Allows users to add a movie to their list of favorites
app.post('/users/:username/movies/:movieID', (req,res) => {
    res.send('Successful POST request adding movie with ID: ' + req.params.movieID + ' to favorite movie list of user: ' + req.params.username);
});

// Deletes a movie from list of user's favorites
app.delete('/users/:username/movies/:movieID', (req,res) => {
    res.send('Successful DELETE request removing movie with ID: ' + req.params.movieID + ' from favorite movie list of user: ' + req.params.username);
});

// Deletes a user from registration database
app.delete('/users/:username', (req,res) => {
    res.send('Successful DELETE request removing user: ' + req.params.username + ' from database');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// listen for requests
app.listen(8080, () =>
    console.log('Your app is listening on port 8080.')
);






