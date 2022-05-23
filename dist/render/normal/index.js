"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_symbols_1 = __importDefault(require("log-symbols"));
const status_1 = __importDefault(require("../../queue/task/status"));
const cli_truncate_1 = __importDefault(require("cli-truncate"));
const loading_1 = __importDefault(require("../loading"));
const chalk_1 = __importDefault(require("chalk"));
const StatusIcon = {
    [status_1.default.Type.SUCCESS]: log_symbols_1.default.success,
    [status_1.default.Type.FAILED]: log_symbols_1.default.error,
    [status_1.default.Type.WAITING]: " ",
    [status_1.default.Type.RUNNING]: loading_1.default.symbol,
    default: log_symbols_1.default.warning
};
function NormalRender({ name, index, total, status, stdout, error }) {
    const column = process.stdout.columns;
    const icon = StatusIcon[status] || StatusIcon.default;
    const content = status === status_1.default.Type.FAILED ? (0, cli_truncate_1.default)(error, Math.min(column, 200)) :
        status === status_1.default.Type.RUNNING ? stdout.slice(-4).join('\n').split('\n').slice(-4).map(item => (0, cli_truncate_1.default)(item, Math.min(column, 200))).join('\n') :
            "";
    const header = `${icon} [${index + 1}/${total}] ${name}`;
    return `${setColor(header, status)}${content ? "\n" + indent(chalk_1.default.gray(content)) : ""}`;
}
exports.default = NormalRender;
function indent(content, level = 1) {
    return content.split('\n').map(line => "  ".repeat(level) + line).join('\n');
}
function setColor(text, status) {
    const fn = ({
        [status_1.default.Type.SUCCESS]: chalk_1.default.green,
        [status_1.default.Type.FAILED]: chalk_1.default.red,
        [status_1.default.Type.RUNNING]: chalk_1.default.yellow,
    })[status] || chalk_1.default.white;
    return fn.call(chalk_1.default, text);
}
