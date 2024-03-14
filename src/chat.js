const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/style', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/chat/Message.vue'))

io.on('connection', (socket) => {
    console.log('someone connected')
})

http.listen(3000, () => console.log('Listening on port 5173!'))
