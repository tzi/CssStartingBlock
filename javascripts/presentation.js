require(
    ['bespoke', 'bespoke-classes', 'bespoke-keys', 'bespoke-touch', 'bespoke-hash'],
    function(bespoke, classes, keys, touch, hash) {
        var deck = bespoke.from('article', [
            classes(),
            keys('horizontal'),
            touch(),
            hash()
        ]);
    }
);

require(['editor'], function(editor){
    editor.init('[data-source]');
});

require(['unindentor'], function(unindentor){
    unindentor.unindentElementList('[contenteditable]');
});

document.body.addEventListener('keydown', function(event){
    console.log(event.target.matches('[contenteditable], textarea, input'));
    if (event.target.matches('[contenteditable], textarea, input')) {
        event.stopPropagation();
    }
});