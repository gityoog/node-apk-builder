"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aapt2_1 = require("../../android-tools/aapt2");
const base_1 = __importDefault(require("../base"));
class ResQueueItem extends base_1.default {
    static create() {
        return new this;
    }
    task(config) {
        return (0, aapt2_1.compile)(() => ({
            outpath: config.outpath,
            res: config.getResFiles()
        }));
    }
}
exports.default = ResQueueItem;
