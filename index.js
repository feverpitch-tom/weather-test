// koa
const koa = require('koa')
const app = koa()
const _ = require('koa-route')

const api = require('./api')

app.use(_.get('/api/ip/:ip?', api.ip))

app.use(_.get('/api/coords/:lat/:lon', api.coords))

app.use(_.get('/api/location/:country/:city', api.location))

app.use(_.get('/api/id/:id', api.id))

app.listen(3000)
