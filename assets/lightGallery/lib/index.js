"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lightgallery_1 = require("./lightgallery");
function lightGallery(el, options) {
    if (!el) {
        return;
    }
    try {
        console.log('caling lg');
        return new lightgallery_1.LightGallery(el, options);
    }
    catch (err) {
        console.error('lightGallery has not initiated properly', err);
    }
}
exports.default = lightGallery;
//# sourceMappingURL=index.js.map