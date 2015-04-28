define('editor', ['unindentor'], function (unindentor) {
    'use strict';

    function init(selector) {
        $$(selector).forEach(function (demoElement) {
            initTemplate(demoElement);
            initSource(demoElement);
        });
    }

    function initSource(demoElement) {
        var request = new XMLHttpRequest();
        request.open('GET', demoElement.getAttribute('data-source'), true);
        request.onload = function () {
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
        demoElement.innerHTML = html.join('');
    }

    function initOutput(demoElement, code) {
        var outputElement = demoElement.querySelector('.demo__output');
        outputElement.innerHTML = code;
        $$('[contenteditable]', outputElement).forEach(function(styleElement){
            unindentor.unindentElement(styleElement);
        })
    }

    function initCode(demoElement, code) {
        var container = demoElement.querySelector('.demo__code');
        container.innerHTML = code;
        $$('style', container).forEach(function (styleNode) {
            styleNode.parentNode.removeChild(styleNode);
        });
        $$('[data-at]', container).forEach(function (element) {
            element.removeAttribute('data-at');
        });
        $$('[data-element]', container).forEach(function (element) {
            element.removeAttribute('data-element');
        });
        $$('*', container).forEach(function (element) {
            element.innerHTML = element.innerHTML.trim();
        });
        container.innerHTML = escapeHTML(container.innerHTML).trim();
    }

    function escapeHTML(html) {
        var escape = document.createElement('textarea');
        escape.innerHTML = html;
        return escape.innerHTML;
    }

    function $$(selector, context) {
        context = context || document;
        return Array.prototype.slice.call(context.querySelectorAll(selector), 0);
    }
    
    return {
        init: init
    }
});