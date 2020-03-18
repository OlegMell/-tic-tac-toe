const hbs = require('hbs');

hbs.registerHelper('fieldItem', function (items) {
    if(items){
        let cells = items.map(item => {
            return `<div class="field-item">${item}</div>`;
        });
        return cells.join(' ');
    }
});
