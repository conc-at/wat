var io = require('socket.io-client')()

io.on('connect', function () {
  console.log('connect')
})

io.on('disconnect', function () {
  console.log('disconnect')
})
