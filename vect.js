"use strict";
function sum(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
}
function neg(a) {
    return [-a[0], -a[1]];
}
function mul(a, b) {
    return [a[0] * (b[0] + b[1]), a[1] * (b[0] + b[1])];
}
function smul(x, a) {
    return [x * a[0], x * a[1]];
}
function norm(a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2));
}
