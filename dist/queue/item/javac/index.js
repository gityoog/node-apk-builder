"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.javac = void 0;
const factory_1 = require("../../task/factory");
const base_1 = __importDefault(require("../base"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function javac(fn, encoding) {
    return (0, factory_1.FactoryExecTask)('javac', () => {
        const { classpath, output, inputs, source, lib } = fn();
        const inputsFile = path_1.default.resolve(output, 'inputs.txt');
        if (!fs_1.default.existsSync(output)) {
            fs_1.default.mkdirSync(output, { recursive: true });
        }
        fs_1.default.writeFileSync(inputsFile, inputs.join('\n'), { encoding: 'utf-8' });
        // todo 增量编译 
        return ['javac', '-encoding UTF-8 -J-Dfile.encoding=UTF-8', '-source 10 -target 10',
            `-cp ${lib.length > 0 ? '.;' + lib.join(';') + ';' + classpath : classpath}`,
            `-d ${output}`, '@' + inputsFile];
    }, undefined, encoding);
}
exports.javac = javac;
class JavacQueueItem extends base_1.default {
    static create() {
        return new this;
    }
    task(config) {
        return javac(() => ({
            classpath: config.main ? [config.androidJar, config.code].join(';') : config.androidJar,
            output: config.classes,
            source: config.code,
            dist: config.outpath,
            inputs: config.getJavaFiles(),
            lib: config.getLibFiles()
        }), config.encoding.javac);
    }
}
exports.default = JavacQueueItem;
