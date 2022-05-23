"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = __importDefault(require("./status"));
class Task {
    constructor({ processer, callback, name }) {
        this.status = new status_1.default;
        this.name = name;
        this.processer = processer;
        this.beforeSuccess = callback;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.status.isWaiting() && this.processer) {
                this.status.run();
                try {
                    yield this.processer({
                        log: value => this.status.log(value),
                        bindAbort: (callback) => this.bindAbort(callback)
                    });
                    if (this.status.isRunning()) {
                        if (this.beforeSuccess) {
                            yield this.beforeSuccess();
                        }
                        this.status.success();
                    }
                }
                catch (e) {
                    const error = e instanceof Error ? e.message : String(e);
                    this.status.fail(error);
                }
            }
        });
    }
    onLog(callback) {
        this.status.onLog(callback);
    }
    onUpdate(callback) {
        this.status.onUpdate(callback);
    }
    getStatus() {
        return this.status.get();
    }
    bindAbort(callback) {
        this._abort = callback;
    }
    destroy() {
        if (this.status.isRunning() && this._abort) {
            this.status.cancel();
            this._abort();
            this._abort = undefined;
        }
        this.processer = undefined;
        this.beforeSuccess = undefined;
        this.status.destroy();
    }
}
exports.default = Task;
