const hbs = require('hbs');

hbs.registerHelper('roomList', function (items) {
    let rooms = items.map(item => {
        const roomColors = ['list-group-item-success', 'list-group-item-danger'];
        const secondClass = roomColors[item.players - 1];
        return `<li class="list-group-item ${secondClass} room">${item.name}</li>`;
    });
    return rooms.join(' ');
});
