"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanOutpath = void 0;
const base_1 = __importDefault(require("../base"));
const rimraf_1 = __importDefault(require("rimraf"));
const fs_1 = __importDefault(require("fs"));
const task_1 = __importDefault(require("../../task"));
function cleanOutpath({ outpath }) {
    return new task_1.default({
        name: 'clean',
        processer: () => new Promise((resolve, reject) => {
            if (fs_1.default.existsSync(outpath)) {
                rimraf_1.default.sync(outpath);
            }
            fs_1.default.mkdir(outpath, err => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve();
                }
            });
        })
    });
}
exports.cleanOutpath = cleanOutpath;
class CleanQueueItem extends base_1.default {
    static create() {
        return new this;
    }
    task(config) {
        return cleanOutpath({
            outpath: config.outpath
        });
    }
}
exports.default = CleanQueueItem;
