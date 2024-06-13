"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendApk = void 0;
const base_1 = __importDefault(require("../base"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const task_1 = __importDefault(require("../../task"));
function appendApk({ apk, files, folders }) {
    return new task_1.default({
        name: 'append',
        processer: () => new Promise((resolve, reject) => {
            const zip = new adm_zip_1.default(apk);
            files.forEach(file => {
                zip.addLocalFile(file.path, file.name);
            });
            folders.forEach(folder => {
                zip.addLocalFolder(folder.path, folder.name);
            });
            zip.writeZip(apk, err => {
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
exports.appendApk = appendApk;
class AppendQueueItem extends base_1.default {
    constructor() {
        super(...arguments);
        this.addDex = false;
        this.addAssets = false;
    }
    static dex() {
        const ins = new this;
        ins.addDex = true;
        return ins;
    }
    static assets() {
        const ins = new this;
        ins.addAssets = true;
        return ins;
    }
    task(config) {
        return appendApk({
            apk: config.apk,
            files: this.addDex ? [{
                    path: config.dex
                }] : [],
            folders: this.addAssets ? [{
                    path: config.assets,
                    name: 'assets'
                }].concat(config.libs ? [{
                    path: config.libs,
                    name: 'libs'
                }] :
                []) : [],
        });
    }
    merge(item) {
        this.addDex = this.addDex || item.addDex;
        this.addAssets = this.addAssets || item.addAssets;
        return this;
    }
}
exports.default = AppendQueueItem;
