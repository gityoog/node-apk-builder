"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("../../task/process");
function aidl(fn) {
    return (0, process_1.FactoryProcessTask)('build aidl', () => {
        const { inputs, output, dir } = fn();
        return inputs.map(input => {
            return ['aidl', `-o ${output}`, `-I ${dir}`, input];
        });
    });
}
exports.default = aidl;
