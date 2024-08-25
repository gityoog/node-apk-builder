"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueToJava = void 0;
function valueToJava(key, value, level = 0) {
    const result = [];
    if (Array.isArray(value)) {
        const type = value.reduce((t, v) => {
            if (t === 'Object')
                return t;
            const valueType = getValueType(v);
            if (t === '')
                return valueType;
            if (t !== valueType)
                return 'Object';
        }, '');
        result.push(`public static final ${type}[] ${key} = new ${type}[] {${value.map(v => JSON.stringify(v)).join(',')}};`);
    }
    else if (typeof value === 'object') {
        result.push(`public static final class ${key} {
${Object.keys(value).map(k => valueToJava(k, value[k], level + 1)).join('\n')}`);
        result.push('}');
    }
    else {
        const valueType = getValueType(value);
        result.push(`public static final ${valueType} ${key} = ${JSON.stringify(value)};`);
    }
    return result.map(r => ' '.repeat(level * 2) + r).join('\n');
}
exports.valueToJava = valueToJava;
const baseType = {
    string: 'String',
    number: 'double',
    boolean: 'boolean'
};
function getValueType(value) {
    const valueType = typeof value;
    if (valueType in baseType)
        return baseType[valueType];
    return 'Object';
}
