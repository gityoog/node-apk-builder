"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../../task/factory");
const fs_1 = require("fs");
function d8(fn, encoding) {
    return (0, factory_1.FactoryExecTask)('compile dex', () => {
        const { classpath, output, inputs, lib } = fn();
        if (!(0, fs_1.existsSync)(output)) {
            (0, fs_1.mkdirSync)(output, { recursive: true });
        }
        return ['d8', `-JDfile.encoding=UTF-8`, `--lib ${lib}`, classpath ? `--classpath ${classpath}` : '', `--output ${output}`, ...inputs];
    }, undefined, encoding);
}
exports.default = d8;
