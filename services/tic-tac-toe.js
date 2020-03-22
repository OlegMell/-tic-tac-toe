const {http} = require('../server-obj');
const io = require('socket.io')(http);


class GameService {
    constructor() {
        this.rooms = [];
        this.startConnection = this.startConnection.bind(this);
        this.xNextMove = true;
    }

    startConnection() {
        io.on('connection', socket => {
            socket.on('join room', data => {
                const {room, username} = data;
                let findRoom = this.rooms.find(r => r.name === room);
                if (findRoom && findRoom.players.length < 2) {
                    let opponent;
                    this.rooms = this.rooms.map(r => {
                        if (r.name === findRoom.name) {
                            opponent = r.players[0];
                            r.players.push({username, id: socket.id});
                        }
                        return r;
                    });
                    socket.join(room);
                    socket.emit('joined', opponent);
                    socket.to(room).emit('new player', username);
                } else if (!findRoom) {
                    let players = [];
                    players.push({username, id: socket.id});
                    this.rooms.push({
                        name: room,
                        players
                    });
                    socket.join(room);
                }
                io.emit('update rooms', this.rooms);
            });

            socket.on('start', room => {
                let whoNext;
                this.rooms = this.rooms.map(r => {
                    if (r.name === room) {
                        r.whoNext = r.players[this.getRandomInt(2)];
                        whoNext = r.whoNext;
                    }
                    return r;
                });
                io.to(room).emit('start', {xNext: this.xNextMove, whoNext});
            });

            socket.on('move', ({currentRoom, gameState}) => {
                this.xNextMove = !this.xNextMove;
                let whoNext;
                this.rooms = this.rooms.map(r => {
                    if (r.name === currentRoom) {
                        r.whoNext = r.players.find(p => p.id !== socket.id);
                        whoNext = r.whoNext;
                    }
                    return r;
                });
                socket.broadcast.to(currentRoom).emit('move', {
                    xNext: this.xNextMove,
                    newGameState: gameState,
                    whoNext
                });
                if (this.checkGameOver(gameState)) {
                    const room = this.rooms.find(r => r.name === currentRoom);
                    const winner = room.players.find(p => p.id === socket.id);
                    io.to(currentRoom).emit('game over', winner);
                }
            });

            socket.on('leave room', room => {
                socket.leave(room);
                if (this.rooms) {
                    const player  = this.rooms.find(r => r.name === room).players.find(p => p.id === socket.id);
                    this.rooms = this.rooms.map(r => {
                        if (r.name === room){
                            r.players = r.players.filter(p => p.id !== socket.id);
                            r.whoNext = null;
                        }
                        return r;
                    });
                    console.log(this.rooms);
                    io.to(room).emit('cli leave', player);
                }
                console.log(this.rooms);
            });
        });
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }

    checkGameOver(gameState) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let gameOver = false;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameOver = true;
            }
        }
        return gameOver;
    }
}

const Game = new GameService();

module.exports = {
    ticTacToe: Game
};