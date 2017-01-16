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

function * ip (address) {
  address = address || this.request.ip

  for (let ix in config.geoip.private) {
    if (address.match(config.geoip.private[ix])) {
      address = null
      yield fetch('https://api.ipify.org?format=json')
        .then((res) => res.json())
        .then((res) => {
          if (res && res.ip) {
            address = res.ip
          }
        })

      if (address) {
        return yield ip.call(this, address)
      }

      this.status = 500
      this.body = 'IP is in a local range, but cannot detect public Internet IP'
    }
  }

  var test = geoip.lookup(address)
  if (test && Array.isArray(test.ll) && test.ll.length === 2) {
    return yield coords.call(this, test.ll[0], test.ll[1])
  }

  this.status = 500
  this.body = `Could not determine geo-location from IP address '${address}'`
}

function * coords (lat, lon) {
  yield getForecast({lat, lon}).then((forecast) => {
    this.body = forecast
  })
}

function * location (country, city) {
  yield getForecast({q: `${city},${country}`}).then((forecast) => {
    this.body = forecast
  })
}

function * id (id) {
  yield getForecast({id}).then((forecast) => {
    this.body = forecast
  })
}

module.exports = {
  ip,
  coords,
  location,
  id
}
