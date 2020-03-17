const URL = 'http://localhost:3000';
$(document).ready(() => {
    if(location.href.includes('/game')) {
        let socket = io();


        $('#saveRoomBtn').click(() => {
            const room = $('#roomName').val();
            if (!room) return alert('Wrong room title!');
            socket.emit('join room', { room });
            $('#closeModalBtn').click();
        });

        // socket.on('update-rooms', rooms => {
        //     $('.rooms').empty();
        //     rooms.forEach(room => {
        //         $('.rooms').append(`<li class="list-group-item">${room.name}</li>`);
        //     });
        // });
    }
});