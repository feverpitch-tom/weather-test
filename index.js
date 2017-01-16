// koa
const koa = require('koa')
const app = koa()
const _ = require('koa-route')

// Replace native Promises with more performant + functional bluebird
const Promise = require('bluebird')

// node-fetch
const fetch = require('node-fetch')
fetch.Promise = Promise

// Load configuration
const config = require('./config.json')

// query string manipulation
const queryString = require('query-string')

function getForecast (opts) {
  opts = Object.assign(opts, { appid: config.openWeatherMap.apiKey })
  let endpoint = `http://api.openweathermap.org/data/2.5/forecast?${queryString.stringify(opts)}`
  return fetch(endpoint).then((res) => res.json())
}

app.use(_.get('/coords/:lat/:lon', function * (lat, lon) {
  yield getForecast({lat, lon}).then((forecast) => {
    this.body = forecast
  })
}))

app.use(_.get('/location/:country/:city', function * (country, city) {
  yield getForecast({q: `${city},${country}`}).then((forecast) => {
    this.body = forecast
  })
}))

app.use(_.get('/id/:id', function * (id) {
  yield getForecast({id}).then((forecast) => {
    this.body = forecast
  })
}))

app.listen(3000)
