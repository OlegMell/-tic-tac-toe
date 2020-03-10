const { port, host } = require('./config');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'hbs');
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));


http.listen(port, host, () => console.log(`server listen on http://localhost:${port}`));

app.use('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/_default'
    })
});


