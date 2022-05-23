"use strict";
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
exports.FactoryExecTask = void 0;
const execa_1 = require("execa");
const __1 = __importDefault(require(".."));
function FactoryExecTask(name, command, callback) {
    return new __1.default({
        name,
        processer: ({ log, bindAbort }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const proc = (0, execa_1.execaCommand)(Array.isArray(command) ? command.join(' ') : command, {
                env: {
                    PATH: process.env.PATH
                },
                shell: false
            });
            (_a = proc.stderr) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
                log(String(data));
            });
            (_b = proc.stdout) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
                log(String(data));
            });
            bindAbort(() => proc.kill());
            return proc;
        }),
        callback
    });
}
exports.FactoryExecTask = FactoryExecTask;
