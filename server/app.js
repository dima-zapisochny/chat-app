const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('IO Connected')

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
