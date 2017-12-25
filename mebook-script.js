// ==UserScript==
// @name         Auto Redirect and Autofill for mebook.cc
// @namespace    https://github.com/makaria/Tampermonkey-script/blob/master/mebook-script.js
// @version      1.0
// @description  auto redirect to baidu yun when open a mebook.cc download link, and autofill the pwd!
// @author       maka
// @grant        none
// @include      http://mebook.cc/*
// @include      https://mebook.cc/*
// @include      http://pan.baidu.com/*
// @include      https://pan.baidu.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
     var extractPwd = function () {
         console.log('pwd');
         // select p
         var dom = document.querySelector('.desc').children[6];
         // text like '网盘密码：百度网盘密码：hcbf     天翼云盘密码：4476'
         var text = dom.textContent;
         var reg = /百度网盘密码：(.{4})/;
         var result = text.match(reg);
         var pwd = result[1];
         return pwd;
     };
     var getUrl = function () {
         console.log('url');
         var a = document.querySelector('.list a');
         return a && a.href;
     };
     var getBaiduInput = function () {
         var input = document.getElementsByTagName('input')[0];
         return input;
     };
     var getBaiduButton = function () {
         var button = document.querySelector('span.text');
         return button;
     };
     var redirectToDownload = function () {
         console.log('download');
         var a = document.querySelector('.downbtn');
         // not work?
         //a.click();
         // 在当前页面跳转，会导致无法返回列表页
         location.assign(a.href);
         // 默认打开新页面会被浏览器阻止，需要用户允许弹窗；
         //window.open(a.href, '_blank');
     };
     var redirectToBaidu = function () {
         console.log('baidu');
         var url = getUrl();
         var pwd = extractPwd();
         if (url && pwd) {
             var href = url + "#" + pwd;
             console.log(href);
             location.assign(href);
         } else {
             console.error('invalid url or pwd', 'url: ', url, 'pwd: ', pwd);
         }
     };
     var autoFill = function () {
         console.log('auto fill');
         var hash = location.hash;
         var pwd = hash.match(/^#(.{4})/)[1];
         var input = getBaiduInput();
         input.value = pwd;
         var button = getBaiduButton();
         button.click();
     };
     var start = function () {
         console.log('start');
         var href = location.href;
         var baidu = /baidu/;
         var download = /download/;
         if (href.match(baidu)) {
             autoFill();
         } else if (href.match(download)) {
             redirectToBaidu();
         } else {
             // 默认不自动跳转到下载页面
             //redirectToDownload();
         }
     };
     var domReady = function (callback) {
         console.log('dom ready');
         if (document.readyState === "complete" || document.readyState === "interactive") {
             setTimeout(callback, 1);
         } else {
             addEventListener('DOMContentLoaded', callback, false);
         }
     };
     domReady(start);
})();
