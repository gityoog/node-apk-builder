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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc_di_1 = require("ioc-di");
const config_1 = __importDefault(require("../config"));
const align_1 = __importDefault(require("./item/align"));
const append_1 = __importDefault(require("./item/append"));
const clean_1 = __importDefault(require("./item/clean"));
const d8_1 = __importDefault(require("./item/d8"));
const install_1 = __importDefault(require("./item/install"));
const javac_1 = __importDefault(require("./item/javac"));
const link_1 = __importDefault(require("./item/link"));
const res_1 = __importDefault(require("./item/res"));
const am_start_1 = __importDefault(require("./item/am-start"));
const sign_1 = __importDefault(require("./item/sign"));
const item_1 = __importDefault(require("./item"));
const task_manager_1 = __importDefault(require("./task-manager"));
const aidl_1 = __importDefault(require("./item/aidl"));
let ApkBuilderQueue = class ApkBuilderQueue {
    constructor() {
        this.map = new Map;
        this.lock = false;
    }
    buildSource() {
        this.push(javac_1.default.create(), d8_1.default.create(), append_1.default.dex());
    }
    buildManifest() {
        this.push(link_1.default.create(), append_1.default.dex(), append_1.default.assets());
    }
    buildRes() {
        this.push(res_1.default.create(), link_1.default.create(), append_1.default.dex(), append_1.default.assets());
    }
    buildAssets() {
        this.push(append_1.default.assets());
    }
    buildAidl() {
        this.push(aidl_1.default.create());
    }
    all() {
        return this.push(clean_1.default.create(), res_1.default.create(), link_1.default.create(), this.config.aidl ? aidl_1.default.create() : undefined, javac_1.default.create(), d8_1.default.create(), append_1.default.dex(), append_1.default.assets());
    }
    push(...data) {
        data.forEach(item => {
            if (!item)
                return;
            if (this.map.has(item.constructor)) {
                const old = this.map.get(item.constructor);
                this.map.set(item.constructor, item.merge(old));
            }
            else {
                this.map.set(item.constructor, item);
            }
        });
        return this.next();
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!this.lock && this.map.size > 0) {
                this.lock = true;
                const tasks = (0, item_1.default)([...this.map.values()].concat([
                    align_1.default.create(),
                    sign_1.default.create()
                ]).concat(this.config.adb &&
                    this.config.adb.install !== false
                    ?
                        install_1.default.create() :
                    []).concat(((_a = this.config.adb) === null || _a === void 0 ? void 0 : _a.main) || ((_b = this.config.adb) === null || _b === void 0 ? void 0 : _b.service) ?
                    am_start_1.default.create() : [])).map(item => item.task(this.config));
                this.map.clear();
                yield this.tasks.run(tasks);
                this.lock = false;
                this.next();
            }
        });
    }
    destroy() {
        this.map.clear();
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", task_manager_1.default)
], ApkBuilderQueue.prototype, "tasks", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", config_1.default)
], ApkBuilderQueue.prototype, "config", void 0);
__decorate([
    ioc_di_1.Destroy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApkBuilderQueue.prototype, "destroy", null);
ApkBuilderQueue = __decorate([
    (0, ioc_di_1.Service)()
], ApkBuilderQueue);
exports.default = ApkBuilderQueue;
