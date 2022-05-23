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
const logger_1 = __importDefault(require("../../logger"));
let TaskManager = class TaskManager {
    constructor() {
        this.data = [];
        this.startTime = 0;
        this.endTime = 0;
    }
    run(tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clear();
            tasks.forEach(task => {
                this.data.push(task);
                task.onLog(value => {
                    this.logger.info(task.name, value);
                });
                task.onUpdate(() => {
                    this.update();
                });
            });
            this.start();
            for (const task of this.data) {
                yield task.start();
            }
            this.end();
        });
    }
    start() {
        this.endTime = 0;
        this.startTime = Date.now();
        this.update();
    }
    end() {
        this.endTime = Date.now();
        this.update();
    }
    update() {
        var _a;
        (_a = this._update) === null || _a === void 0 ? void 0 : _a.call(this, {
            startTime: this.startTime,
            endTime: this.endTime,
            tasks: this.data.map(task => ({
                name: task.name,
                status: task.getStatus()
            }))
        });
    }
    onUpdate(callback) {
        this._update = callback;
    }
    clear() {
        this.data.forEach(task => {
            task.destroy();
        });
        this.data = [];
    }
    destroy() {
        this._update = undefined;
        this.clear();
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", logger_1.default)
], TaskManager.prototype, "logger", void 0);
__decorate([
    ioc_di_1.Destroy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskManager.prototype, "destroy", null);
TaskManager = __decorate([
    (0, ioc_di_1.Service)()
], TaskManager);
exports.default = TaskManager;
