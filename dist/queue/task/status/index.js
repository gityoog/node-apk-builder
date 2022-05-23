"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type[Type["WAITING"] = 0] = "WAITING";
    Type[Type["RUNNING"] = 1] = "RUNNING";
    Type[Type["SUCCESS"] = 2] = "SUCCESS";
    Type[Type["FAILED"] = 3] = "FAILED";
    Type[Type["CANCELED"] = 4] = "CANCELED";
    Type[Type["DESTROY"] = 5] = "DESTROY";
})(Type || (Type = {}));
class TaskStatus {
    constructor() {
        this.type = Type.WAITING;
        this.data = [];
        this.error = '';
        this.updateTime = Date.now();
    }
    get() {
        return {
            type: this.type,
            data: this.data,
            error: this.error,
            updateTime: this.updateTime
        };
    }
    isRunning() {
        return this.type === Type.RUNNING;
    }
    isWaiting() {
        return this.type === Type.WAITING;
    }
    log(value) {
        var _a;
        const text = value.trimEnd();
        this.data.push(text);
        (_a = this._log) === null || _a === void 0 ? void 0 : _a.call(this, text);
        this.update();
    }
    onLog(callback) {
        this._log = callback;
    }
    run() {
        this.type = Type.RUNNING;
        this.log('starting');
    }
    success() {
        this.type = Type.SUCCESS;
        this.log('successful');
    }
    fail(err) {
        this.type = Type.FAILED;
        this.error = err;
        this.log(`failed: ${err}`);
    }
    cancel() {
        this.type = Type.CANCELED;
        this.log(`cancel`);
    }
    update() {
        var _a;
        this.updateTime = Date.now();
        (_a = this._update) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    onUpdate(callback) {
        this._update = callback;
    }
    destroy() {
        this.type = Type.DESTROY;
        this._update = undefined;
        this._log = undefined;
        this.data = [];
        this.error = '';
    }
}
TaskStatus.Type = Type;
exports.default = TaskStatus;
