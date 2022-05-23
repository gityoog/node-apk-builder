"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d8_1 = __importDefault(require("../../android-tools/d8"));
const base_1 = __importDefault(require("../base"));
class D8QueueItem extends base_1.default {
    static create() {
        return new this;
    }
    task(config) {
        return (0, d8_1.default)({
            classpath: config.androidJar,
            output: config.outpath,
            inputs: config.getClassesFiles()
        });
    }
}
exports.default = D8QueueItem;
