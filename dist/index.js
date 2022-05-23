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
var ApkBuilder_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ioc_di_1 = require("ioc-di");
const watchpack_1 = __importDefault(require("watchpack"));
const queue_1 = __importDefault(require("./queue"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const render_1 = __importDefault(require("./render"));
const task_manager_1 = __importDefault(require("./queue/task-manager"));
// todo aidl 
// todo lib 
let ApkBuilder = ApkBuilder_1 = class ApkBuilder {
    /** @deprecated Please use ApkBuilder.Create */
    constructor(options) {
        this.config = new config_1.default(options);
    }
    static Create(...args) {
        return (0, ioc_di_1.Init)(new ApkBuilder_1(...args));
    }
    build() {
        this.config.setMode('release');
        return this.queue.all();
    }
    watch() {
        this.config.setMode('debug');
        this.queue.all();
        this.watchpack = new watchpack_1.default({
            aggregateTimeout: 1000,
            ignored: /R\.java/
        });
        this.watchpack.watch([this.config.manifest], [this.config.code, this.config.assets, this.config.res]);
        this.watchpack.on("aggregated", (changes) => {
            if (changes.has(this.config.manifest)) {
                this.queue.buildManifest();
            }
            if (changes.has(this.config.code)) {
                this.queue.buildSource();
            }
            if (changes.has(this.config.assets)) {
                this.queue.buildAssets();
            }
            if (changes.has(this.config.res)) {
                this.queue.buildRes();
            }
        });
    }
    onLog(callback) {
        return this.logger.bindOut(callback);
    }
    setRender(callback) {
        return this.render.onUpdate(callback);
    }
    setUpdater(callback) {
        return this.manager.onUpdate(callback);
    }
    destroy() {
        var _a;
        (_a = this.watchpack) === null || _a === void 0 ? void 0 : _a.close();
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", queue_1.default)
], ApkBuilder.prototype, "queue", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", config_1.default)
], ApkBuilder.prototype, "config", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", logger_1.default)
], ApkBuilder.prototype, "logger", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", render_1.default)
], ApkBuilder.prototype, "render", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", task_manager_1.default
    /** @deprecated Please use ApkBuilder.Create */
    )
], ApkBuilder.prototype, "manager", void 0);
__decorate([
    ioc_di_1.Destroy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApkBuilder.prototype, "destroy", null);
ApkBuilder = ApkBuilder_1 = __decorate([
    (0, ioc_di_1.Service)(),
    (0, ioc_di_1.Container)(),
    __metadata("design:paramtypes", [Object])
], ApkBuilder);
exports.default = ApkBuilder;
