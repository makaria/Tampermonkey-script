// ==UserScript==
// @name         ONE PUNCH MANHUABUDANG
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto punch for manhuabudang.com
// @author       You
// @match        https://www.manhuabudang.com/*
// @match        http://www.manhuabudang.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var mockPunch = function () {
        console.log('punch---mock punch');
        var userInit = {credentials: "include"};
        var userUrl = location.protocol + '//' + location.host + '/u.php';
        fetch(userUrl, userInit)
        .then((req) => {
            return req.text();
        }).then((data) => {
            var doneReg = /card card_old" disabled/;
            if (doneReg.test(data)) {
                console.info('punch---你已经打过卡啦~');
                return false;
            }
            var verifyReg = /verifyhash = '(.*?)'/;
            var verifyResult = data.match(verifyReg);
            var verifyhash = verifyResult && verifyResult[1];
            var punchInit = {
                credentials: 'include',
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
                body: 'step=2'
            };
            var punchUrl = location.protocol + '//' + location.host + '/jobcenter.php?action=punch&verify=' + verifyhash;
            fetch(punchUrl, punchInit)
            .then((req) => {
                return req.blob();
            }).then((blob) => {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var text = reader.result;
                    var flag = text.match(/"flag":'(.*?)'/);
                    if (flag && flag[1]) {
                        console.info('punch---打卡成功');
                    } else {
                        var message = text.match(/"message":'(.*?)'/);
                        console.info('punch---' + message[1]);
                    }
                };
                reader.readAsText(blob, 'GBK');
            });
        });
    };
    var realPunch = function () {
        console.log('punch---real punch!');
        var disabled = document.querySelectorAll('.card.card_old')[0].disabled;
        if (!disabled) {
            var money = document.getElementById('money').innerText;
            punchJob(money);
        } else {
            console.info('punch---已经打过卡啦~');
        }
    };
    var start = function () {
        console.log('punch---start');
        var path = location.pathname;
        var reg = /u\.php/;
        var result = reg.test(path);
        if (result) {
            realPunch();
        } else {
            mockPunch();
        }
    };
    var domReady = function (callback) {
        // console.log('dom ready');
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(callback, 1);
        } else {
            addEventListener('DOMContentLoaded', callback, false);
        }
    };
    domReady(start);
})();
