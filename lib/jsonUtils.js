"use strict";
exports.__esModule = true;
exports.jsonWrap = void 0;
var jsonWrap = function (data) {
    if (data === undefined || data === null) {
        return 'null';
    }
    else if (typeof data === 'string') {
        return '"' + data.toLowerCase() + '"';
    }
    else if (data instanceof Array) {
        var res_1 = '[';
        data.forEach(function (item, index) {
            var temp = (0, exports.jsonWrap)(item);
            res_1 += (index > 0 ? ',' : '') + temp;
        });
        res_1 += ']';
        return res_1;
    }
    else if (typeof data === 'number') {
        return data.toString().toLowerCase();
    }
    else if (typeof data === 'object') {
        var keys = Object.keys(data).sort();
        var res_2 = '{';
        keys.forEach(function (key, index) {
            if (index) {
                res_2 += ',';
            }
            res_2 += '"' + key + '":';
            res_2 += (0, exports.jsonWrap)(data[key]);
        });
        res_2 += '}';
        return res_2.toLowerCase();
    }
    return data.toString().toLowerCase();
};
exports.jsonWrap = jsonWrap;
