"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../../task/factory");
function d8(fn) {
    return (0, factory_1.FactoryExecTask)('compile dex', () => {
        const { classpath, output, inputs, lib } = fn();
        return ['d8', `-JDfile.encoding=UTF-8 --classpath ${classpath}`, `--output ${output}`, ...inputs, ...lib];
    });
}
exports.default = d8;
