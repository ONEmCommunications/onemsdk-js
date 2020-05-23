function parseNumber(value, type="int") {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
        let parse;
        if (typeof type === 'string' && type.toLowerCase() === 'int') {
            parse = parseInt;
        } else {
            parse = parseFloat;
        }
        const result = parse(value);
        if (isNaN(result)) {
            return undefined;
        } else {
            return result;
        }
    } else {
        return undefined;
    }
}

module.exports = {
    parseNumber
}
