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
const chalk_1 = __importDefault(require("chalk"));
const log_update_1 = __importDefault(require("log-update"));
const task_manager_1 = __importDefault(require("../queue/task-manager"));
const normal_1 = __importDefault(require("./normal"));
const loading_1 = __importDefault(require("./loading"));
const config_1 = __importDefault(require("../config"));
let ApkBuilderRender = class ApkBuilderRender {
    init() {
        this.manager.onUpdate(({ startTime, endTime, tasks }) => {
            if (this.isDestroyed) {
                return;
            }
            this.startTime = startTime;
            this.endTime = endTime;
            this.total = tasks.length;
            tasks.forEach(({ name, status }, index) => {
                const item = this.data[index] || {
                    updateTime: 0,
                    value: ''
                };
                if (!this.data[index]) {
                    this.data[index] = item;
                }
                if (status.updateTime > item.updateTime) {
                    item.updateTime = status.updateTime;
                    item.value = (0, normal_1.default)({ name, index, total: this.total, status: status.type, stdout: status.data, error: status.error });
                }
            });
            this.loading.setRef(Array(this.total).fill(0).map((_, index) => this.data[index]).map(item => item.value).join('\n'));
        });
        this.loading.onUpdate(value => {
            const out = value + `\n\nBuild ${this.endTime ? 'Complete' : 'Time'}: ${chalk_1.default.yellow(`${((this.endTime || Date.now()) - this.startTime) / 1000}s`)}`;
            if (this._update) {
                this._update(out);
            }
            else if (this.config.render) {
                (0, log_update_1.default)(`─ ${chalk_1.default.bgCyan.black(' Apk Builder ')} ─\n\n`
                    + out);
            }
        });
    }
    onUpdate(callback) {
        this._update = callback;
    }
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
        this.total = 0;
        this.data = {};
        this.isDestroyed = false;
        this.init();
    }
    destroy() {
        this.loading.destroy();
        this.isDestroyed = true;
        this._update = undefined;
        this.data = null;
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", task_manager_1.default)
], ApkBuilderRender.prototype, "manager", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", loading_1.default)
], ApkBuilderRender.prototype, "loading", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", config_1.default)
], ApkBuilderRender.prototype, "config", void 0);
__decorate([
    ioc_di_1.Already,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApkBuilderRender.prototype, "init", null);
__decorate([
    ioc_di_1.Destroy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApkBuilderRender.prototype, "destroy", null);
ApkBuilderRender = __decorate([
    (0, ioc_di_1.Service)(),
    __metadata("design:paramtypes", [])
], ApkBuilderRender);
exports.default = ApkBuilderRender;
