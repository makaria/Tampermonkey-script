// ==UserScript==
// @name         Hide login-notice
// @namespace    https://github.com/makaria/Tampermonkey-script/blob/master/hide-big-member-discount.js
// @version      1.0
// @description  hide login notice when watch stream in panda.tv
// @author       maka
// @grant        none
// @include      http://*.panda.tv/*
// @include      https://*.panda.tv/*
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';
  // TODO: stop exit fullscreen &(or) fix fullscreen not work after exit fullscreen.
  var addGlobalStyle = function (cssText) {
      var head, style;
      head = document.getElementsByTagName('head')[0];
      if (!head) { return; }
      style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = cssText;
      head.appendChild(style);
  };
  var start = function () {
      var none = '.room-player-login-notice, .login-notice-sm { display: none !important; }';
      addGlobalStyle(none);
  };
  var domReady = function (callback) {
      if (document.readyState === "complete" || document.readyState === "interactive") {
          setTimeout(callback, 1);
      } else {
          addEventListener('DOMContentLoaded', callback, false);
      }
  };
  domReady(start);
})();