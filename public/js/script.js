const URL = 'http://localhost:3000';
$(document).ready(() => {

    $('#saveRoomBtn').click(() => {
        const title = $('#roomName').val();
        if(!title) return alert('Wrong room title!');
        $.post(URL + '/game/create-room', { title }, res => {
            console.log(res);
        });
    });

    const socket = io();
    socket.on('message', msg => console.log(msg));
});