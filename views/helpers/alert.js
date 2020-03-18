const hbs = require('hbs');

const alertType = {
    'wait': `<div id="alert" class="alert alert-warning" role="alert">
                    Wait for second player..
                </div>`,
    'started': `<div id="alert" class="alert alert-success" role="alert">
                    The game is started
                </div>`,
    'not set': `<div id="alert" class="alert alert-primary" role="alert">
                    choose a free room or create your own for start a game
                </div>`
};

hbs.registerHelper('alert', function (state) {
    return alertType[state];
});
