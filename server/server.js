const express = require('express');
const app = express();
const cors = require('cors');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let routes = require('./routes/index')
let path = require('path')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.use('/', routes)

app.use(express.static(path.join(__dirname, '../client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', '/build', 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('refreshData', (msg) => {
        io.emit('refreshData', msg);
      });
});

let port = process.env.PORT
if(port == null || port == ""){
    port = 8000
}
http.listen(port, () => console.log("Sever started and listening on port: " + port));