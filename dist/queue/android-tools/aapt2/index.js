"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = exports.compile = void 0;
const factory_1 = require("../../task/factory");
function compile(fn) {
    return (0, factory_1.FactoryExecTask)('compile resource', () => {
        const { outpath, res } = fn();
        return ["aapt2", "compile", `-o ${outpath}`, ...res];
    });
}
exports.compile = compile;
function link(fn, encoding) {
    return (0, factory_1.FactoryExecTask)('link resource', () => {
        const { outpath, rjava, namespace, manifest, flat } = fn();
        return ["aapt2", "link", `-o ${outpath}`, `--java ${rjava}`, `-I ${namespace}`, `--manifest ${manifest}`, '--auto-add-overlay', ...flat];
    }, undefined, encoding);
}
exports.link = link;
