require('dotenv').config();
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const authService  = require('./user/auth/AuthService');
const authRouter   = require('./user/auth/AuthRouter');
const weatherService = require('./weather/WeatherService');

// start express
const app = express();
const PORT = process.env.PORT || 3000;

app.set('superSecret', process.env.SERVER_SECRET);
app.set('view engine', 'ejs');

// some logging
app.use(logger('dev'));

app.use(session({
  secret:            app.get('superSecret'),
  resave:            false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ROUTE HANDLER
app.use('/auth', authRouter);

/* THIS IS A PRIVATE ROUTE */
app.get('/myHome', authService.loginRequired, weatherService.getWeather, (req, res) => {

  res.render('myHome', {
    user: req.session.user,
    icon:  res.locals.weatherReport.weather[0].icon,
  });
});

app.get('/', (req, res) => {
  res.render('welcome', { message: 'Welcome! This is a public page.' });
});


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).send('Something broke!');
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
}).on('error', console.error);

