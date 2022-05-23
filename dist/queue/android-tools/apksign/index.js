"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../../task/factory");
function apksigner({ apk, key, cert }) {
    return (0, factory_1.FactoryExecTask)('apksigner', ["apksigner", "sign", `--key ${key}`, `--cert ${cert}`, apk]);
}
exports.default = apksigner;
