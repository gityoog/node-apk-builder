"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zipalign_1 = __importDefault(require("../../android-tools/zipalign"));
const base_1 = __importDefault(require("../base"));
class AlignQueueItem extends base_1.default {
    static create() {
        return new this;
    }
    task(config) {
        return (0, zipalign_1.default)({ apk: config.apk });
    }
}
exports.default = AlignQueueItem;
