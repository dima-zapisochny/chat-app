const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const message = (name, text, id) => ({name, text, id});
const users = require('./users')()



io.on('connection', socket => {

  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Данные не коректны')
    }
    socket.join(data.room)
    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })
    cb({userId: socket.id})
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', message('admin', `Добро пожаловать ${data.name}`))
    socket.broadcast
      .to(data.room)
      .emit('newMessage', message('admin', `Пользователь ${data.name} зашёл`))
  })




  socket.on('createMessage', (data, cb) => {
    if (!data.text) {
      return cb('Очень пусто')
    }

    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', message(user.name, data.text, data.id))
    }
    cb()

  })



  socket.on('userLeft', (id, callback) => {
    const user = users.remove(id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', message('admin', `Пользователь ${user.name} вышел`))
    }
    callback()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', message('admin', `Пользователь ${user.name} вышел`))
    }
  })

})





module.exports = {
  app, server
}
