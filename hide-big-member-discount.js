// ==UserScript==
// @name         Hide big member discount info
// @namespace    https://github.com/makaria/Tampermonkey-script/blob/master/hide-big-member-discount.js
// @version      1.0
// @description  remove the red notification abount big member discount in bilibili
// @author       maka
// @grant        none
// @include      http://*.bilibili.com/*
// @include      https://*.bilibili.com/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var addGlobalStyle = function(cssText) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = cssText;
        head.appendChild(style);
    };
    var start = function() {
        console.log('start');
        /**var num = document.querySelector('div.num');
     if (num) {
         num.style.display = 'none';
        }**/
        var none = 'div.num { display: none !important; }';
        addGlobalStyle(none);
    };
    var domReady = function(callback) {
        console.log('dom ready', document.readyState);
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(callback, 1);
        } else {
            addEventListener('DOMContentLoaded', callback, false);
        }
    };
    domReady(start);
})();
