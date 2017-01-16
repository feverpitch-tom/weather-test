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

// geoip lookup
const geoip = require('geoip-lite')

function getForecast (opts) {
  opts = Object.assign(opts, { appid: config.openWeatherMap.apiKey })
  let endpoint = `http://api.openweathermap.org/data/2.5/forecast?${queryString.stringify(opts)}`
  return fetch(endpoint).then((res) => res.json())
}

app.use(_.get('/ip/:ip?', function * (ip) {
  ip = ip || this.request.ip

  for (let ix in config.geoip.private) {
    if (ip.match(config.geoip.private[ix])) {
      yield fetch('https://api.ipify.org?format=json')
        .then((res) => res.json())
        .then((res) => {
          if (res && res.ip) {
            return this.response.redirect(`/ip/${res.ip}`)
          }

          this.status = 500
          this.body = 'IP is in a local range, but cannot detect public Internet IP'
        })
      return
    }
  }

  var test = geoip.lookup(ip)
  if (test && Array.isArray(test.ll) && test.ll.length === 2) {
    this.response.redirect(`/coords/${test.ll[0]}/${test.ll[1]}`)
    return
  }

  this.status = 500
  this.body = `Could not determine geo-location from IP address '${ip}'`
}))

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
