// ==UserScript==
// @name         Fly to the top
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fly you to the top.
// @author       Maka
// @match        https://greasyfork.org/zh-CN/scripts/5181-scroll-to-bottom-or-top/code
// @include      http://*
// @include      https://*
// @exclude		 http://localhost*
// @exclude      about:blank
// @exclude      about:newtab
// @exclude      chrome://newtab/
// @grant        none
// ==/UserScript==

//top button
var a = document.createElement('span');
var c = 'opacity:0.3;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAJcEhZcwAACxMAAAsTAQCanBgAAAACYktHRAD/h4/MvwAAARlJREFUaEPtlD2KAkEQRkc91sTqiSb1B2QRvJOBiaCewcxcEUx3v3K6VMRRu7qL2oF68JjWQL5HD3aqqiraTDc8W4sHWOMB1niANR5gjQdY4wHWeIA12gGToBqaATR8HFSL0Arg8YxahEbA83hGJSJ3QNN4JntEzoBX48/wWB9vZI3IFdA0fgj7UC0iR8C78Wu4g2oRqQGfxjNqESkB345nKGIAs0ZIA2LHM1tIEafrpzviCEmAdDxDEfQ6ZYmQBPyGJxMznmm6iWgkAVM4qo+i8cwGPkbQ70bfQK8sy3CMYgUv8AdKxjMHuIR7OKMvYkn5F1rAlPEM3cS8PsaTEvAv8ABrPMAaD7DGA6zxAGs8wBoPsKblAUXxB4ozRWtoGc5gAAAAAElFTkSuQmCC") no-repeat scroll 50% 50% rgba(0, 0, 0, 1);border-radius:0px 0px 0px 0px;cursor:pointer;position:fixed;bottom:6.59340659%;width:48px;height:48px;right:0px;z-index:9999';
a.style.cssText = c;
a.href = "#shadow-root";
a.addEventListener('mouseover', function(){ a.style.opacity = 1;}, false);
a.addEventListener('mouseout', function(){ a.style.opacity = 0.3; }, false);
a.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
top.document.body.appendChild(a);
