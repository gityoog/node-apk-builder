"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adm_zip_1 = __importDefault(require("adm-zip"));
const factory_1 = require("../../task/factory");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function d8(fn, encoding) {
    return (0, factory_1.FactoryExecTask)('compile dex', () => {
        const { classpath, output, inputs = [], lib, classes } = fn();
        if (!(0, fs_1.existsSync)(output)) {
            (0, fs_1.mkdirSync)(output, { recursive: true });
        }
        let zip = undefined;
        if (classes) {
            const admZip = new adm_zip_1.default();
            admZip.addLocalFolder(classes);
            zip = path_1.default.resolve(output, 'classes.zip');
            admZip.writeZip(zip);
        }
        return ['d8', `-JDfile.encoding=UTF-8`, `--lib ${lib}`, classpath ? `--classpath ${classpath}` : '', `--output ${output}`, ...inputs,
            ...(zip ? [zip] : [])
        ];
    }, undefined, encoding);
}
exports.default = d8;
