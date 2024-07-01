"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apksign_1 = __importDefault(require("../../android-tools/apksign"));
const base_1 = __importDefault(require("../base"));
class SignQueueItem extends base_1.default {
    static create() {
        return new this;
    }
    task(config) {
        return (0, apksign_1.default)({
            apk: config.apk,
            key: config.key,
            cert: config.cert,
            jks: config.jks
        });
    }
}
exports.default = SignQueueItem;
