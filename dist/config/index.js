"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
class ApkBuilderConfig {
    constructor({ dist, src, buildTools, sign, androidJar, adb, render = true, lib, libs, encoding }) {
        this.src = src;
        this.dist = dist;
        this.key = sign.key;
        this.cert = sign.cert;
        this.androidJar = androidJar;
        this.adb = adb;
        this.render = render;
        if (buildTools) {
            process.env.PATH += (isWindows() ? ';' : ':') + `${buildTools}`;
        }
        this.res = path_1.default.join(this.src, 'res');
        this.manifest = path_1.default.join(this.src, 'AndroidManifest.xml');
        this.code = path_1.default.join(this.src, 'java');
        this.assets = path_1.default.join(this.src, 'assets');
        this.log = path_1.default.join(this.dist, 'log.txt');
        this.lib = lib;
        this.libs = libs;
        this.jks = sign.jks;
        if (typeof encoding === 'string') {
            this.encoding = {
                javac: encoding,
                d8: encoding,
                aapt2: encoding
            };
        }
        else {
            this.encoding = encoding || {
                javac: undefined,
                d8: undefined,
                aapt2: undefined
            };
        }
        this.setMode('release');
    }
    setMode(mode) {
        this.outpath = path_1.default.join(this.dist, mode);
        this.apk = path_1.default.join(this.outpath, 'app.apk');
        this.classes = path_1.default.join(this.outpath, 'classes');
        this.dex = path_1.default.join(this.outpath, 'classes.dex');
    }
    getResFiles() {
        return glob_1.glob.sync('**/*.*', {
            cwd: this.res
        }).map(p => path_1.default.join(this.res, p));
    }
    getFlatFiles() {
        return glob_1.glob.sync('**/*.flat', {
            cwd: this.outpath
        }).map(p => path_1.default.join(this.outpath, p));
    }
    getJavaFiles() {
        return glob_1.glob.sync('**/*.java', {
            cwd: this.code
        }).map(p => path_1.default.join(this.code, p));
    }
    getClassesFiles() {
        return glob_1.glob.sync('**/*.class', {
            cwd: this.classes
        }).map(p => path_1.default.join(this.classes, p));
    }
    getLibFiles() {
        return this.lib ? glob_1.glob.sync('**/*.jar', {
            cwd: this.lib
        }).map(p => path_1.default.join(this.lib, p)) : [];
    }
}
function isWindows() {
    return process.platform === 'win32' || process.env.OSTYPE && /^(msys|cygwin)$/.test(process.env.OSTYPE);
}
exports.default = ApkBuilderConfig;
