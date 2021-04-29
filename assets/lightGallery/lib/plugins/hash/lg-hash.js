"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var lg_events_1 = require("../../lg-events");
var lg_hash_settings_1 = require("./lg-hash-settings");
var Hash = /** @class */ (function () {
    function Hash(instance, $LG) {
        // get lightGallery core plugin instance
        this.core = instance;
        this.$LG = $LG;
        // extend module default settings with lightGallery core settings
        this.settings = __assign(__assign({}, lg_hash_settings_1.hashSettings), this.core.settings);
        if (this.settings.hash) {
            this.oldHash = window.location.hash;
            this.init();
        }
        return this;
    }
    Hash.prototype.init = function () {
        // Change hash value on after each slide transition
        this.core.LGel.on(lg_events_1.lGEvents.afterSlide + ".hash", this.onAfterSlide.bind(this));
        this.core.LGel.on(lg_events_1.lGEvents.afterClose + ".hash", this.onCloseAfter.bind(this));
        // Listen hash change and change the slide according to slide value
        this.$LG(window).on("hashchange.lg.hash.global" + this.core.lgId, this.onHashchange.bind(this));
    };
    Hash.prototype.onAfterSlide = function (event) {
        var slideName = this.core.galleryItems[event.detail.index].slideName;
        slideName = this.core.settings.customSlideName
            ? slideName || event.detail.index
            : event.detail.index;
        if (history.replaceState) {
            history.replaceState(null, '', window.location.pathname +
                window.location.search +
                '#lg=' +
                this.core.settings.galleryId +
                '&slide=' +
                slideName);
        }
        else {
            window.location.hash =
                'lg=' + this.core.settings.galleryId + '&slide=' + slideName;
        }
    };
    Hash.prototype.onCloseAfter = function () {
        // Reset to old hash value
        if (this.oldHash &&
            this.oldHash.indexOf('lg=' + this.core.settings.galleryId) < 0) {
            if (history.replaceState) {
                history.replaceState(null, '', this.oldHash);
            }
            else {
                window.location.hash = this.oldHash;
            }
        }
        else {
            if (history.replaceState) {
                history.replaceState(null, document.title, window.location.pathname + window.location.search);
            }
            else {
                window.location.hash = '';
            }
        }
    };
    Hash.prototype.onHashchange = function () {
        if (!this.core.lgOpened)
            return;
        var _hash = window.location.hash;
        var index = this.core.getIndexFromUrl(_hash);
        // it galleryId doesn't exist in the url close the gallery
        if (_hash.indexOf('lg=' + this.core.settings.galleryId) > -1) {
            this.core.slide(index, false, false);
        }
        else if (this.core.lGalleryOn) {
            this.core.closeGallery();
        }
    };
    Hash.prototype.closeGallery = function () {
        if (!this.settings.hash) {
            return;
        }
    };
    Hash.prototype.destroy = function () {
        this.core.LGel.off('.lg.hash');
        this.core.LGel.off('.hash');
        this.$LG(window).off("hashchange.lg.hash.global" + this.core.lgId);
    };
    return Hash;
}());
exports.default = Hash;
//# sourceMappingURL=lg-hash.js.map