"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = exports.compile = void 0;
const factory_1 = require("../../task/factory");
function compile({ outpath, res }) {
    return (0, factory_1.FactoryExecTask)('compile resource', ["aapt2", "compile", `-o ${outpath}`, ...res]);
}
exports.compile = compile;
function link({ namespace, outpath, rjava, manifest, flat }) {
    return (0, factory_1.FactoryExecTask)('link resource', ["aapt2", "link", `-o ${outpath}`, `--java ${rjava}`, `-I ${namespace}`, `--manifest ${manifest}`, '--auto-add-overlay', ...flat]);
}
exports.link = link;
