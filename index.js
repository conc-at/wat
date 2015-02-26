var http = require('http')
var join = require('path').join

var debug = require('debug')('wat:index')
var express = require('express')

var app = express()
var server = http.Server(app)
var io = require('socket.io')(server)

app.use(express.static(join(__dirname, 'public')))

io.on('connection', function (socket) {
  io.emit('uconnect', true)
  socket.on('disconnect', function () {
    io.emit('udisconnect', true)
  })
})

server.listen(5000, function () {
  debug('Listening on port %d', 5000)
})
