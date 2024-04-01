"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../../task/factory");
const base_1 = __importDefault(require("../base"));
class InstallQueueItem extends base_1.default {
    static create() {
        return new this;
    }
    task(config) {
        return (0, factory_1.FactoryExecTask)('install', ["adb", "install", "-r", config.apk]);
    }
}
exports.default = InstallQueueItem;
