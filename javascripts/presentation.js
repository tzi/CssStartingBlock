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

require(['unindentor'], function(unindentor){
    unindentor.unindentElementList('[contenteditable]');
});