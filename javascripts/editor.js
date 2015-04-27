(function () {
    'use strict';
    
    $$('[data-source]').forEach(function(demo) {
        initTemplate(demo);
        initSource(demo);
    });

    function initSource(demo) {
        var request = new XMLHttpRequest();
        request.open('GET', demo.getAttribute('data-source'), true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                demo.querySelector('.demo__wrapper').innerHTML = this.response;
                formatCode(demo, this.response)
            }
        };
        request.send();
    }

    function initTemplate(demo) {
        var html = [];
        html.push('<div class="demo__code"></div>');
        html.push('<div class="demo__output">');
            html.push('<div class="demo__wrapper"></div>');
        html.push('</div>');
        demo.innerHTML= html.join('');
    }

    function formatCode(demo, code) {
        var container = demo.querySelector('.demo__code');
        container.innerHTML = code;
        $$('style', container).forEach(function(styleNode){
            styleNode.parentNode.removeChild(styleNode);
        });
        container.innerHTML = escapeHTML(container.innerHTML);
    }
    
    function escapeHTML(html) {
        var escape = document.createElement('textarea');
        escape.innerHTML = html;
        return escape.innerHTML;
    }
    
    function $$(selector, context) {
        context = context||document;
        return Array.prototype.slice.call(context.querySelectorAll(selector), 0);
    }
})();