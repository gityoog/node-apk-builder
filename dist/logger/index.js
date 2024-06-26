"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc_di_1 = require("ioc-di");
const config_1 = __importDefault(require("../config"));
const fs_1 = __importDefault(require("fs"));
let ApkBuilderLogger = class ApkBuilderLogger {
    init() {
        if (this.config.log) {
            if (fs_1.default.existsSync(this.config.log)) {
                fs_1.default.rmSync(this.config.log);
            }
        }
    }
    info(tag, value) {
        this.update(`[${new Date().toLocaleString()}]I<${tag}> ${value}`);
    }
    bindOut(callback) {
        this._out = callback;
    }
    update(value) {
        var _a;
        if (this.config.log) {
            fs_1.default.appendFileSync(this.config.log, value + '\n');
        }
        (_a = this._out) === null || _a === void 0 ? void 0 : _a.call(this, value);
    }
    constructor() {
        this.init();
    }
    destroy() {
        this._out = undefined;
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", config_1.default)
], ApkBuilderLogger.prototype, "config", void 0);
__decorate([
    ioc_di_1.Already,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApkBuilderLogger.prototype, "init", null);
__decorate([
    ioc_di_1.Destroy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApkBuilderLogger.prototype, "destroy", null);
ApkBuilderLogger = __decorate([
    (0, ioc_di_1.Service)(),
    __metadata("design:paramtypes", [])
], ApkBuilderLogger);
exports.default = ApkBuilderLogger;
