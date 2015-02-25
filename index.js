var debug = require('debug')('wat:index')
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('WAT?')
})

app.listen(5000, function () {
  debug('Listening on port %d', 5000)
})
