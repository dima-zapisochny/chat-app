const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const message = (name, text, id) => ({name, text, id})

io.on('connection', socket => {

  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Данные не коректны')
    }
      socket.join(data.room)
      cb({userId: socket.id})
      socket.emit('newMessage', message('admin', `Добро пожаловать ${data.name}`))
      socket.broadcast
        .to(data.room)
        .emit('newMessage', message('admin', `Пользователь ${data.name} зашёл`))
  })

  socket.on('createMessage', data => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + 'SERVER'
      })
    }, 500)
  })
})



module.exports = {
  app, server
}
