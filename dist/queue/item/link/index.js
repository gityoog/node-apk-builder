"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
const aapt2_1 = require("../../android-tools/aapt2");
class LinkQueueItem extends base_1.default {
    static create() {
        return new this;
    }
    task(config) {
        return (0, aapt2_1.link)(() => ({
            outpath: config.apk,
            rjava: config.code,
            namespace: config.androidJar,
            manifest: config.manifest,
            flat: config.getFlatFiles()
        }), config.encoding.aapt2);
    }
}
exports.default = LinkQueueItem;
