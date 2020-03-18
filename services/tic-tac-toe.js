const { http } = require('../server-obj');
const io = require('socket.io')(http);


class GameService{
    constructor() {
        this.rooms = [];
        this.startConnection = this.startConnection.bind(this);
    }
    startConnection(){
        io.on('connection', socket => {
            socket.on('join room', data => {
                const { room } = data;
                console.log('before: ', this.rooms);
                let findRoom = this.rooms.find(r => r.name === room);
                if (findRoom && findRoom.players < 2) {
                    this.rooms = this.rooms.map(r => {
                        if (r.name === findRoom.name) {
                            r.players += 1;
                        }
                        return r;
                    })
                } else {
                    this.rooms.push({ name: room, players: 1, field: new Array(9).fill('') })
                }
                console.log('after: ', this.rooms);
                io.emit('update rooms', this.rooms);
            });
        });
    }
}

const Game = new GameService();

module.exports = {
    ticTacToe: Game
};