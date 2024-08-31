"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("../util");
class ApkBuilderConfig {
    constructor({ dist, src, buildTools, sign, androidJar, adb, render = true, lib, libs, encoding, resources = [], aidl, main, buildConfig, autoVersion = false }) {
        this.isDev = false;
        this.isProd = false;
        this.src = src;
        this.main = main;
        this.dist = dist;
        this.key = sign.key;
        this.cert = sign.cert;
        this.androidJar = androidJar;
        this.adb = adb;
        this.render = render;
        this.resources = resources;
        this.aidl = aidl;
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
        this.autoVersion = autoVersion;
        this.buildConfig = buildConfig;
    }
    setDev() {
        this.isDev = true;
        this.isProd = false;
        this.init();
    }
    setProd() {
        this.isDev = false;
        this.isProd = true;
        this.init();
    }
    init() {
        var _a;
        this.outpath = path_1.default.join(this.dist, this.isDev ? 'debug' : 'release');
        this.apk = path_1.default.join(this.outpath, 'app.apk');
        this.classes = path_1.default.join(this.outpath, 'classes');
        this.dex = path_1.default.join(this.outpath, 'classes.dex');
        this.jarD8Out = path_1.default.join(this.outpath, 'dex-jar');
        this.jarDex = path_1.default.join(this.jarD8Out, 'classes.dex');
        const mode = ((_a = process.argv.find(v => v.startsWith('--mode='))) === null || _a === void 0 ? void 0 : _a.split('=')[1]) || (this.isDev ? 'debug' : 'release');
        this.setMode(mode);
    }
    setMode(mode = "") {
        if (this.buildConfig) {
            const folder = this.buildConfig.package.split('.');
            const envs = this.buildConfig.env[mode] || {};
            envs.mode = mode;
            envs.isDev = this.isDev;
            envs.isProd = this.isProd;
            fs_1.default.writeFileSync(path_1.default.join(this.src, "java", ...folder, "BuildConfig.java"), `package ${this.buildConfig.package};
public class BuildConfig {
${Object.keys(envs).map(k => (0, util_1.valueToJava)(k, envs[k], 1)).join('\n')}
}`);
        }
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
    getAidlFiles() {
        return this.aidl ? glob_1.glob.sync('**/*.aidl', {
            cwd: this.aidl
        }).map(p => path_1.default.join(this.aidl, p)) : [];
    }
    getJavaFiles() {
        if (this.main) {
            return this.main.map(p => path_1.default.join(this.code, p + '.java'));
        }
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
