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
                let findRoom = this.rooms.find(r => r.name === room);
                if (findRoom && findRoom.players < 2) {
                    this.rooms = this.rooms.map(r => {
                        if (r.name === findRoom.name) {
                            r.players += 1;
                        }
                        return r;
                    });
                    socket.join(room);
                    io.to(room).emit('new player');
                } else if(!findRoom) {
                    this.rooms.push({ name: room, players: 1, field: new Array(9).fill('') });
                    socket.join(room);
                }

                io.emit('update rooms', this.rooms, this.rooms.find(r => r.name === room));
            });
        });
    }
}

const Game = new GameService();

module.exports = {
    ticTacToe: Game
};