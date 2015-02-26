var http = require('http')
var join = require('path').join

var debug = require('debug')('wat:index')
var express = require('express')

var app = express()
var server = http.Server(app)
var io = require('socket.io')(server)

app.use(express.static(join(__dirname, 'public')))

app.get('/WAT', function (req, res) {
  res.send('WAT?')
})

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

server.listen(5000, function () {
  debug('Listening on port %d', 5000)
})
