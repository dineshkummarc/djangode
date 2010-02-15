var posix = require('posix'),
    sys = require('sys'),
    dj = require('djangode'),
    template_system = require('template/template');
    template_loader = require('template/loader');


// set template path
template_loader.set_path('template-demo');

// context to use when rendering template. In a real app this would likely come from a database
var test_context = {
    person_name: 'Thomas Hest',
    company: 'Tobis A/S',
    ship_date: new Date('12-02-1981'),
    item: 'XXX',
    item_list: [ 'Giraf', 'Fisk', 'Tapir'],
    ordered_warranty: true,
    ship: {
        name: 'M/S Martha',
        nationality: 'Danish'
    }
};


// make app
var app = dj.makeApp([
    ['^/(template-demo/.*)$', dj.serveFile],

    ['^/template$', function (req, res) {
        template_loader.load('template.html', function(t) {
            dj.respond(res, t.render(test_context));
        });
    }],

    ['^/text$', function (req, res) {
        var html = template_loader.load('template.html').render(test_context);
        dj.respond(res, html, 'text/plain');
    }]
]);

dj.serve(app, 8009);

