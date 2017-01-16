const koa = require('koa')
const app = koa()
const _ = require('koa-route')

app.use(_.get('/weather', function * () {
  this.body = `Hello, your IP is ${this.request.ip}`
}))

app.listen(3000)
