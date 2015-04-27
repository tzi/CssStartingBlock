require(
    ['bespoke', 'bespoke-classes', 'bespoke-keys', 'bespoke-touch', 'bespoke-hash'],
    function(bespoke, classes, keys, touch, hash) {
        var deck = bespoke.from('article', [
            classes(),
            keys('horizontal'),
            touch(),
            hash()
        ]);
        
        // Initialize code editor 
        unindentor($$('[contenteditable]'));

        // Useful selector
        function $$(selector, context) {
            context = context||document;
            return Array.prototype.slice.call(context.querySelectorAll(selector), 0);
        }
    }
);