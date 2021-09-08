const express = require('express')
const path = require('path')

const app = express()
const http = require('http')
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

const io = require('socket.io')(server)
io.on('connection', socket=>{
    console.log('Connected Ready')

    socket.on('sendMessage', msg=>{
        //console.log(msg)
        socket.broadcast.emit('sendToAll', msg)
    })
})




const PORT = process.env.PORT || 3000
server.listen(PORT, ()=>{
    console.log('Server is running on port', PORT);
})