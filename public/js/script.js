const URL = 'http://localhost:3000';
$(document).ready(() => {

    // $('#exitBtn').click(() => {
    //    $.post(URL + '/exit');
    // });

    const socket = io();
    console.log(socket);
    socket.on('message', msg => console.log(msg));
});