"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const align_1 = __importDefault(require("./align"));
const append_1 = __importDefault(require("./append"));
const clean_1 = __importDefault(require("./clean"));
const d8_1 = __importDefault(require("./d8"));
const install_1 = __importDefault(require("./install"));
const javac_1 = __importDefault(require("./javac"));
const link_1 = __importDefault(require("./link"));
const res_1 = __importDefault(require("./res"));
const am_start_1 = __importDefault(require("./am-start"));
const sign_1 = __importDefault(require("./sign"));
const QueueItems = [clean_1.default, res_1.default, link_1.default, javac_1.default, d8_1.default, append_1.default, align_1.default, sign_1.default, install_1.default, am_start_1.default];
const Index = new Map();
QueueItems.forEach((item, index) => {
    Index.set(item, index);
});
function getIndex(ins) {
    if (!Index.has(ins.constructor)) {
        throw new Error(`Unknown queue item: ${ins.constructor.name}`);
    }
    return Index.get(ins.constructor);
}
function SortQueueItem(data) {
    return data.sort((a, b) => {
        return getIndex(a) - getIndex(b);
    });
}
exports.default = SortQueueItem;
