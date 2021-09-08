const express = require('express')
const path = require('path')


const app = express()
const http = require('http').createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000
http.listen(PORT, ()=>{
    console.log('Server is running on port', PORT);
})