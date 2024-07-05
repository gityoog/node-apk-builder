"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
const factory_1 = require("../../task/factory");
class AmStartQueueItem extends base_1.default {
    static create() {
        return new this;
    }
    task(config) {
        const { main, service } = config.adb;
        if (service) {
            return (0, factory_1.FactoryExecTask)('am startservice', ["adb", "shell am startservice", "-n", service]);
        }
        else {
            return (0, factory_1.FactoryExecTask)('am start', ["adb", "shell am start", "-n", main]);
        }
    }
}
exports.default = AmStartQueueItem;
