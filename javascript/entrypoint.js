"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("./frame");
window.onload = function () {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl2");
    var drawer = new frame_1.Drawer({ canvas: canvas, gl: gl });
    drawer.start();
};
