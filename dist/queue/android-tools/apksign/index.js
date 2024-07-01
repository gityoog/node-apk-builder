"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../../task/factory");
function apksigner({ apk, key, cert, jks }) {
    if (jks) {
        return (0, factory_1.FactoryExecTask)('apksigner', ["apksigner", "-JDfile.encoding=UTF-8 sign", `--ks ${jks.path}`, `--ks-key-alias ${jks.alias}`, `--ks-pass pass:${jks.pass}`, `--key-pass pass:${jks.aliasPass}`, apk]);
    }
    return (0, factory_1.FactoryExecTask)('apksigner', ["apksigner", "-JDfile.encoding=UTF-8 sign", `--key ${key}`, `--cert ${cert}`, apk]);
}
exports.default = apksigner;
