const express = require('express')

const app = express()

const server = app.listen(4040, function () {
  console.log('server running on port 4040');
})

const io = require('socket.io')(server,{
    cors: {
      origin: '*'
    }
  })
var nsp = io.of('/socket');

nsp.on('connection', function (socket) {
     console.log(socket)
    socket.on('GENERATE_ID', function (data) {
      nsp.emit('MESSAGE_id', { id: socket.id, data: data})
    })
    socket.on('SEND_MESSAGE', function (data) {
      nsp.emit('MESSAGE', data)
    })
    socket.on('DESTROY_ID', function (data) {
      nsp.emit('MESSAGE_DESTROY', {data: data})
    })
    socket.on('SEND_LINK', function (data) {
      nsp.emit('VIDEO_LINK', data)
    })
  })