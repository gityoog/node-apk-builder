"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RenderLoading {
    constructor() {
        this.value = '';
        this.ref = '';
        this.dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        this.index = 0;
        this.enabled = false;
        this.timer = null;
    }
    transform() {
        if (this.enabled) {
            const dot = this.dots[this.index];
            this.value = this.ref.replace(new RegExp(RenderLoading.symbol, 'g'), dot);
            this.update();
        }
    }
    createTimer() {
        if (!this.timer) {
            this.timer = setInterval(() => {
                this.index = (this.index + 1) % this.dots.length;
                this.transform();
            }, 80);
        }
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = null;
    }
    enable() {
        if (this.enabled === false) {
            this.enabled = true;
            this.createTimer();
        }
    }
    disable() {
        if (this.enabled) {
            this.enabled = false;
            this.clearTimer();
        }
        this.update();
    }
    setRef(value) {
        this.ref = value;
        if (value.includes(RenderLoading.symbol)) {
            this.enable();
        }
        else {
            this.disable();
        }
    }
    onUpdate(callback) {
        this._update = callback;
    }
    update() {
        var _a;
        (_a = this._update) === null || _a === void 0 ? void 0 : _a.call(this, this.enabled ? this.value : this.ref);
    }
    destroy() {
        this.clearTimer();
        this._update = undefined;
    }
}
exports.default = RenderLoading;
RenderLoading.symbol = "\uF666";
