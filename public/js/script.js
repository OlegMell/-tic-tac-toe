const URL = 'http://localhost:3000';
$(document).ready(() => {



    if (location.href.includes('/game')) {
        let currentRoom;
        let socket = io();

        const checkRoom = () => {
            if (currentRoom && currentRoom.players < 2) {
                $('#alert')
                    .removeClass('alert-primary')
                    .addClass('alert-warning')
                    .text('Wait for second player..');
                $('#alert').toggleClass('disable');
            }
        };

        checkRoom();


        $('#saveRoomBtn').click(e => {
            e.preventDefault();
            const room = $('#roomName').val().trim();
            if (!room) return alert('Wrong room title!');
            socket.emit('join room', {room});
            $.post(URL + '/game/join-room', {room}, res => {
                $('#field').empty();
                currentRoom = res;
                res.gameState.forEach(item => {
                    $('#field').append(`<div class="field-item">${item}</div>`);
                });
                $('#closeModalBtn').click();
                checkRoom();
            });
        });

        $('.room').click(({target}) => {
            const room = $(target).text();
            socket.emit('join room', {room});
        });

        const roomColors = ['list-group-item-success', 'list-group-item-danger'];
        socket.on('update rooms', rooms => {
            $('.rooms').empty();
            rooms.forEach(room => {
                let secondClass = roomColors[room.players - 1];
                $('.rooms').append(`<li class="list-group-item ${secondClass} room">${room.name}</li>`);
            });
        });
    }
});