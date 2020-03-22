$(document).ready(() => {

    document.body.onload = () => {
        document.onkeydown = onkeydown;
    };

    if (location.href.includes('/game')) {
        let socket = io();
        let currentRoom;
        let xNextMove;
        let selfNext;
        const username = $('#username').text();
        let currentGameState = new Array(9).fill('');

        function onkeydown(e) {
            if (e.keyCode === 82 && e.ctrlKey) {
                if (confirm('if you reload the page you will lose all' +
                    ' progress\nContinue?')){
                    if (currentRoom){
                        console.log(currentRoom);
                        socket.emit('leave room', currentRoom);
                    }
                    return true;
                } else {
                    return false;
                }
            }
        }

        $('#saveRoomBtn').click(e => {
            e.preventDefault();
            const room = $('#roomName').val().trim();
            if (!room) return alert('Wrong room title!');
            $('#closeModalBtn').click();
            joinRoom(room);
            $('#alert')
                .removeClass('alert-primary')
                .addClass('alert-warning').text('Wait for a second player..');
        });


        const roomColorClasses = ['list-group-item-success', 'list-group-item-danger'];
        socket.on('update rooms', rooms => {
            $('.rooms').empty();
            rooms.forEach(room => {
                let secondClass = roomColorClasses[room.players.length - 1];
                $('.rooms').append(`<li class="list-group-item ${secondClass} room">${room.name}</li>`);
            });
        });


        $('.rooms').on('click', '.room', ({target}) => {
            const room = $(target).text();
            joinRoom(room);
            setTimeout(() => {
                $('#alert').fadeOut(200)
                    .removeClass('alert-success')
                    .addClass('alert-success')
                    .text('The game is started');
            }, 100);
            $('#field').toggleClass('disable');
        });


        socket.on('joined', opponent => {
            showOpponent(opponent.username);
        });


        const joinRoom = room => {
            socket.emit('join room', {room, username});
            currentRoom = room;
            $('#currentRoom')
                .css('display', 'inline')
                .find('span')
                .text(currentRoom);
            $('#leaveRoom').css('display', 'inline');
        };


        socket.on('new player', username => {
            showOpponent(username);
            $('#alert')
                .removeClass('alert-warning')
                .addClass('alert-success')
                .text('The game is started');
            startGame();
        });


        socket.on('start', ({xNext, whoNext}) => {
            selfNext = whoNext.id === socket.id;
            xNextMove = xNext;
        });


        $('.field-item').click(({target}) => {
            if(selfNext) {
                xNextMove ? $(target).text('X') : $(target).text('O');
                const index = $(target).attr('data-index');
                currentGameState[index] = xNextMove ? 'X' : 'O';
                socket.emit('move', {currentRoom, gameState: currentGameState});
                xNextMove = !xNextMove;
                selfNext = !selfNext;
            }
        });

        $('#leaveRoom').click(() => {
           socket.emit('leave room', currentRoom);
           currentRoom = '';
        });

        socket.on('move', ({ xNext, newGameState, whoNext }) => {
            console.log(whoNext);
            selfNext = whoNext.id === socket.id;
            xNextMove = xNext;
            const items = $('.field-item');
            newGameState.forEach((item, index) => {
                $(items[index]).text(item);
            });
            currentGameState = newGameState;
        });

        socket.on('game over', winner  => {
            if(confirm('Winner: ' + winner.username + '\nPlay again?')){
                const items = $('.field-item');
                currentGameState.fill('').forEach((item, index) => {
                    $(items[index]).text(item);
                });
            } else {
                socket.emit('leave room', currentRoom);
                currentRoom = '';
                $('#field').fadeOut(200);
                $('#alert')
                    .fadeIn(300)
                    .removeClass('alert-success')
                    .addClass('alert-primary')
                    .text('choose a free room or create your own for start a' +
                        ' game');
            }
        });


        socket.on('cli leave', player => {
            $('#opponent').fadeOut(200);
            $('#alert').fadeIn(200)
                .removeClass('alert-success')
                .addClass('alert-warning')
                .text(`Your opponent ${player.username} has leave room! Wait for a another player`);
            $('#field').toggleClass('disable');
        });



        const startGame = () => {
            socket.emit('start', currentRoom);
            $('#alert').fadeOut(200);
            $('#field').toggleClass('disable');
        };
        const showOpponent = (opponent) => {
            $('#opponent')
                .css('display', 'inline')
                .find('span')
                .text(opponent);
        }
    }
});