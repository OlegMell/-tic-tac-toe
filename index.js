const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const router = require('./routes/index');
const session = require('express-session');
const { port, host, sessionSecret } = require('./config');
const io = require('socket.io')(http);


app.set('view engine', 'hbs');
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
}));

app.use('/', router);

io.on('connection', socket => {
    socket.emit('message', 'hello!');
});


http.listen(port, host, () => console.log(`server listen on http://localhost:${port}`));




