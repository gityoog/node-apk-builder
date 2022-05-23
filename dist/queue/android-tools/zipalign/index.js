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
const fs_1 = __importDefault(require("fs"));
const factory_1 = require("../../task/factory");
function zipalign({ apk }) {
    return (0, factory_1.FactoryExecTask)('zipalign', ["zipalign", "-p", "-f", "4", apk, apk + ".aligned"], () => __awaiter(this, void 0, void 0, function* () {
        fs_1.default.unlinkSync(apk);
        fs_1.default.renameSync(apk + ".aligned", apk);
    }));
}
exports.default = zipalign;
