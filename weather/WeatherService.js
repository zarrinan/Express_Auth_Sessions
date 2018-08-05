const { URL } = require('url');
const fetch  = require('node-fetch');

const weatherAPI = new URL('https://api.openweathermap.org/data/2.5/weather');
weatherAPI.searchParams.set('units', 'imperial');
weatherAPI.searchParams.set('APPID', process.env.W_KEY);

module.exports = {
  async getWeather(req, res, next) {
    weatherAPI.searchParams.set('zip', req.session.user.zip);
    try {
      res.locals.weatherReport = await fetch(weatherAPI).then(w => w.json());
      next();
    } catch (e) {
      next(e);
    }
  },
};



