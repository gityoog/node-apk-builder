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
const iconv_lite_1 = __importDefault(require("iconv-lite"));
function FactoryExecTask(name, arg, callback, encoding) {
    return new __1.default({
        name,
        processer: (_a) => __awaiter(this, [_a], void 0, function* ({ log, bindAbort }) {
            var _b, _c;
            arg = typeof arg === 'function' ? arg() : arg;
            const command = Array.isArray(arg) ? arg.join(' ') : arg;
            const proc = (0, execa_1.execaCommand)(command, {
                env: {
                    PATH: process.env.PATH
                },
                shell: false
            });
            if (encoding) {
                if (!iconv_lite_1.default.encodingExists(encoding)) {
                    encoding = undefined;
                }
            }
            const pushLog = (data) => {
                log(encoding ? iconv_lite_1.default.decode(data, encoding) : String(data));
            };
            (_b = proc.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
                pushLog(data);
            });
            (_c = proc.stdout) === null || _c === void 0 ? void 0 : _c.on('data', (data) => {
                pushLog(data);
            });
            bindAbort(() => proc.kill());
            return proc;
        }),
        callback
    });
}
exports.FactoryExecTask = FactoryExecTask;
