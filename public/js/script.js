const URL = 'http://localhost:3000';
$(document).ready(() => {
    if (location.href.includes('/game')) {
        let currentRoom;
        let socket = io();

        let gameState = new Array(9).fill('');

        $('#saveRoomBtn').click(e => {
            e.preventDefault();
            const room = $('#roomName').val().trim();
            if (!room) return alert('Wrong room title!');
            socket.emit('join room', {room});
            // $.post(URL + '/game/join-room', { room }, res => {
            //     $('#field').empty();
            //     currentRoom = res;
            //     res.field.forEach(item => {
            //         $('#field').append(`<div class="field-item">${item}</div>`);
            //     });
                $('#closeModalBtn').click();
            //     $('#alert')
            //         .removeClass('alert-primary')
            //         .addClass('alert-warning')
            //         .text('Wait for second player..');
            // });
        });

        $('.room').click(({target}) => {
            const room = $(target).text();
            socket.emit('join room', { room });
            $.post(URL + '/game/join-room', { room }, res => {
                $('#field').empty();
                currentRoom = res;
                res.field.forEach(item => {
                    $('#field').append(`<div class="field-item">${item}</div>`);
                });
                if(currentRoom.players < 2) {
                    $('#alert')
                        .removeClass('alert-primary')
                        .addClass('alert-warning')
                        .text('Wait for second player..');
                } else {
                    $('#alert')
                        .removeClass('alert-primary')
                        .addClass('alert-success')
                        .text('The game is started');
                }
            });
        });

        socket.on('new player', () => {
            console.log('here');
            $('#alert')
                .removeClass('alert-warning')
                .addClass('alert-success')
                .text('The game is started');
        });

        const roomColors = ['list-group-item-success', 'list-group-item-danger'];
        socket.on('update rooms', (rooms) => {

            $('.rooms').empty();
            rooms.forEach(room => {
                let secondClass = roomColors[room.players - 1];
                $('.rooms').append(`<li class="list-group-item ${secondClass} room">${room.name}</li>`);
            });
        });
    }
});