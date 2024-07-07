"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aidl_1 = __importDefault(require("../../android-tools/aidl"));
const base_1 = __importDefault(require("../base"));
class AidlQueueItem extends base_1.default {
    static create() {
        return new this;
    }
    task(config) {
        return (0, aidl_1.default)(() => ({
            inputs: config.getAidlFiles(),
            output: config.code,
            dir: config.aidl
        }));
    }
}
exports.default = AidlQueueItem;
