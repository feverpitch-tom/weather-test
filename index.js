// koa
const koa = require('koa')
const app = koa()
const _ = require('koa-route')

const swagger = require('swagger-koa')

const api = require('./api')

// app.use(swagger.init({
//   apiVersion: '1.0',
//   swaggerVersion: '1.0',
//   swaggerURL: '/swagger',
//   swaggerJSON: '/api-docs.json',
//   swaggerUI: './public/swagger/',
//   basePath: 'http://localhost:3000',
//   info: {
//     title: 'swagger-koa sample app',
//     description: 'Swagger + Koa = {swagger-koa}'
//   },
//   apis: ['./api.yml']
// }))

app.use(_.get('/api/ip/:ip?', api.ip))

app.use(_.get('/api/coords/:lat/:lon', api.coords))

app.use(_.get('/api/location/:country/:city', api.location))

app.use(_.get('/api/id/:id', api.id))

app.listen(3000)
