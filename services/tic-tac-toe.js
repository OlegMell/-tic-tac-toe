const { http } = require('../server-obj');
const io = require('socket.io')(http);


class GameService{
    constructor() {
        this.sockets = [];
    }
    startConnection(){
        io.on('connection', socket => {
            this.sockets.push(socket);
            socket.emit('message', 'hello!');
        });
    }
}

const TicTacToe = new GameService();

module.exports = {
    ticTacToe: TicTacToe
};