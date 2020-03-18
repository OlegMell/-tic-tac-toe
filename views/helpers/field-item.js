const hbs = require('hbs');

hbs.registerHelper('fieldItem', function (items) {
    if(items){
        let cells = items.map(item => {
            return `<div class="field-item">${item}</div>`;
        });
        return cells.join(' ');
    } else {
        return `<div id="alert" class="alert alert-primary" role="alert">
                    choose a free room or create your own for start a game
                </div>`;
    }
});
