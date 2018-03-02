// ==UserScript==
// @name         Fly to the top
// @namespace    https://github.com/makaria/Tampermonkey-script/blob/master/fly-to-top.js
// @version      1.0
// @description  Fly you to the top.
// @author       maka
// @include      http://*
// @include      https://*
// @exclude      http://localhost*
// @exclude      about:blank
// @exclude      about:newtab
// @exclude      chrome://newtab/
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var start = function() {
        createElement();
    };
    var createElement = function () {
        var button = document.createElement('span');
        button.style.opacity = 0.3;
        button.style.transitionDuration = '0.2s';
        button.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAJcEhZcwAACxMAAAsTAQCanBgAAAACYktHRAD/h4/MvwAAARlJREFUaEPtlD2KAkEQRkc91sTqiSb1B2QRvJOBiaCewcxcEUx3v3K6VMRRu7qL2oF68JjWQL5HD3aqqiraTDc8W4sHWOMB1niANR5gjQdY4wHWeIA12gGToBqaATR8HFSL0Arg8YxahEbA83hGJSJ3QNN4JntEzoBX48/wWB9vZI3IFdA0fgj7UC0iR8C78Wu4g2oRqQGfxjNqESkB345nKGIAs0ZIA2LHM1tIEafrpzviCEmAdDxDEfQ6ZYmQBPyGJxMznmm6iWgkAVM4qo+i8cwGPkbQ70bfQK8sy3CMYgUv8AdKxjMHuIR7OKMvYkn5F1rAlPEM3cS8PsaTEvAv8ABrPMAaD7DGA6zxAGs8wBoPsKblAUXxB4ozRWtoGc5gAAAAAElFTkSuQmCC")';
        button.style.backgroundRepeat =  'no-repeat';
        button.style.backgroundAttachment = 'scroll';
        button.style.backgroundPosition = '50% 50%';
        button.style.backgroundColor = 'black';
        button.style.borderRadius = '0px';
        button.style.cursor = 'pointer';
        button.style.position = 'fixed';
        button.style.bottom = '6.18%';
        button.style.right = '6px';
        button.style.width = '48px';
        button.style.height = '48px';
        button.style.zIndex = 9999;
        button.href = "#shadow-root";
        button.addEventListener('mouseover', function() {
            button.style.opacity = 1;
        }, false);
        button.addEventListener('mouseout', function() {
            button.style.opacity = 0.3;
        }, false);
        button.addEventListener('click', function() {
            getScrollElement();
        }, false);
        button.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            button.style.display = 'none';
        });
        window.top.document.body.appendChild(button);
    };
    var traversalUsingTreeWalker = function (node) {
        var els = [];
        var treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT,null,false);
        node = treeWalker.nextNode();
        while (node != null) {
            // console.log(node.tagName);
            var scrollTop = node.scrollTop;
            if (scrollTop !== 0) {
                els.push(node);
            }
            node = treeWalker.nextNode();
        }
        return els;
    };
    var getScrollElement = function () {
        var els = traversalUsingTreeWalker(window.top.document);
        fly(els);
    };
    var fly = function (els) {
        window.scrollTo(0, 0);
        els.forEach((el) => {
            el.scrollTop = 0;
        });
    };
    var domReady = function(callback) {
        // console.log('dom ready');
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(callback, 1);
        } else {
            addEventListener('DOMContentLoaded', callback, false);
        }
    };
    domReady(start);
})();
