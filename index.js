const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
  bodyParser = require('body-parser');
  

const morgan = require('morgan');
const app = express();
app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

// let topMovies = [
//     {
//       title: 'Harry Potter and the Prisoner of Azkaban',
//       director: 'Alfonso Cuaron'
//       // genre: 'Fantasy'
//     },
//     {
//       title: 'The Dark Knight',
//       director: 'Christopher Nolan'
//       // genre: 'Action'
//     },
//     {
//       title: '8 Mile',
//       director: 'Curtis Hanson'
//       // genre: 'Drama'
//     },
//     {
//       title: 'Focus',
//       director: 'Glenn Ficarra'
//       // genre: 'Romance'
//     },
//     {
//       title: 'Ready Player One',
//       director: 'Steven Spielberg'
//       // genre: 'Sci-fi'
//     },
//     {
//       title: 'Back to the Future II',
//       director: 'Steven Spielberg'
//       // genre: 'Sci-fi'
//     },
//     {
//       title: 'Jurassic Park',
//       director: 'Steven Spielberg'
//       // genre: 'Action'
//     },
//     {
//       title: 'Toy Story',
//       director: 'John Lasseter'
//       // genre: 'Animation'
//     },
//     {
//       title: 'The Breakfast Club',
//       director: 'John Hughes'
//       // genre: 'Drama'
//     },
//     {
//       title: 'Southpaw',
//       director: 'Antoine Fuqua'
//       // genre: 'Drama'
//     }
//   ];

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix');
});

// GET data on all movies
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
    //res.send('Successful GET request returning data on all movies');
});
  
// Get data about a single movie, by title
app.get('/movies/:Title', (req,res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
  
// Get data about a genre by title
app.get('/movies/genres/:title', (req,res) => {
  Movies.findOne({ Title: req.params.title})
    .then((movies) => {
      res.json(movies.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
    //res.send('Successful GET request returning data on genre: ' + req.params.genre);
});
  
// Get data about a director by name
app.get('/movies/directors/:name', (req,res) => {
  Movies.findOne({ Name: req.params.Name })
    .then((director) => {
      res.json(director.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
    //res.send('Successful GET request returning data on director: ' + req.params.name);
});
  
  // Post new user registration
app.post('/users', (req,res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
    //res.send('Successful POST request registering new user');
});

// Put updates to user information
app.put('/users/:username', (req,res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
    //res.send('Successful PUT request updating information for user: ' + req.params.username);
});
// Allows users to add a movie to their list of favorites
app.post('/users/:username/movies/:movieID', (req,res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, // This line makes sure that the updated document is returned
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
    //res.send('Successful POST request adding movie with ID: ' + req.params.movieID + ' to favorite movie list of user: ' + req.params.username);
});

// Deletes a movie from list of user's favorites
app.delete('/users/:username/movies/:movieID', (req,res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, // This line makes sure that the updated document is returned
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
    //res.send('Successful DELETE request removing movie with ID: ' + req.params.movieID + ' from favorite movie list of user: ' + req.params.username);
});

// Deletes a user from registration database
app.delete('/users/:username', (req,res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
    //res.send('Successful DELETE request removing user: ' + req.params.username + ' from database');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// listen for requests
app.listen(8080, () => 
    console.log('Your app is listening on port 8080.')
)






