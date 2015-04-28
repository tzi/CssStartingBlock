(function () {
    'use strict';
    
    $$('[data-source]').forEach(function(demoElement) {
        initTemplate(demoElement);
        initSource(demoElement);
        demoElement.addEventListener('click', function() {
            var outputElement = demoElement.querySelector('.demo__output');
            outputElement.classList.toggle('alternate');
            updateStyleWatcher(outputElement);
        })
    });

    function initSource(demoElement) {
        var request = new XMLHttpRequest();
        request.open('GET', demoElement.getAttribute('data-source'), true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                initOutput(demoElement, this.response);
                initCode(demoElement, this.response);
            }
        };
        request.send();
    }

    function initTemplate(demoElement) {
        var html = [];
        html.push('<div class="demo__code"></div>');
        html.push('<div class="demo__output">');
        html.push('</div>');
        demoElement.innerHTML= html.join('');
    }
    
    function initOutput(demoElement, code) {
        var outputElement = demoElement.querySelector('.demo__output');
        outputElement.innerHTML = code;
        updateStyleWatcher(outputElement);
    }

    function initCode(demoElement, code) {
        var container = demoElement.querySelector('.demo__code');
        container.innerHTML = code;
        $$('style', container).forEach(function(styleNode){
            styleNode.parentNode.removeChild(styleNode);
        });
        $$('[data-at]', container).forEach(function(element) {
            element.removeAttribute('data-at');
        });
        $$('[data-element]', container).forEach(function(element) {
            element.removeAttribute('data-element');
        });
        container.innerHTML = escapeHTML(container.innerHTML).trim();
    }

    function updateStyleWatcher(outputElement) {
        $$('[data-at]', outputElement).forEach(function(element) {
            var propertyNameList = element.getAttribute('data-at').split(';');
            var content = [];
            
            for (var i=0; i<propertyNameList.length; i++) {
                var propertyName = propertyNameList[i];
                if (propertyName) {
                    var propertyKeyList;
                    var pos = propertyName.indexOf(':');
                    if (pos > -1) {
                        propertyKeyList = propertyName.substr(pos + 1).split(' ');
                        propertyName = propertyName.substr(0, pos);
                    } else {
                        propertyKeyList = [propertyName];
                    }
                    var valueList = [];
                    for (var j=0; j<propertyKeyList.length; j++) {
                        var propertyKey = propertyKeyList[j];
                        pos = propertyKey.indexOf('=');
                        if (pos > -1) {
                            valueList.push(propertyKey.substr(pos + 1));
                        } else {
                            var value = getComputedStyle(element).getPropertyCSSValue(propertyKey);
                            if (value) {
                                valueList.push(value.cssText);
                            }
                        }
                    }
                    if (valueList.length) {
                        content.push(propertyName + ": " + valueList.join(' ') + ';');
                    }
                }
            }
            element.innerHTML = '<div class="demo__style-watcher">'+content.join('\n')+'</div>';
        });
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