"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../../task/factory");
function d8({ classpath, output, inputs }) {
    return (0, factory_1.FactoryExecTask)('compile dex', ['d8', `--classpath ${classpath}`, `--output ${output}`, ...inputs]);
}
exports.default = d8;
