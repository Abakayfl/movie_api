const express = require('express'),
  morgan = require('morgan');

const app = express();
app.use(morgan('common'));
app.use(express.static('public'));

let topMovies = [
    {
      title: 'Harry Potter and the Prisoner of Azkaban',
      director: 'Alfonso Cuaron'
    },
    {
      title: 'The Dark Knight',
      director: 'Christopher Nolan'
    },
    {
      title: '8 Mile',
      director: 'Curtis Hanson'
    },
    {
      title: 'Focus',
      director: 'Glenn Ficarra'
    },
    {
      title: 'Ready Player One',
      director: 'Steven Spielberg'
    },
    {
      title: 'Back to the Future II',
      director: 'Steven Spielberg'
    },
    {
      title: 'Jurassic Park',
      director: 'Steven Spielberg'
    },
    {
      title: 'Toy Story',
      director: 'John Lasseter'
    },
    {
      title: 'The Breakfast Club',
      director: 'John Hughes'
    },
    {
      title: 'Southpaw',
      director: 'Antoine Fuqua'
    }
  ];

app.get('/', (req, res) => {
    res.send('Welcome to my movies!');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
  });

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});







