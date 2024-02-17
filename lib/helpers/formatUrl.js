"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUrl = void 0;
var query_string_1 = require("query-string");
var formatUrl = function (url, params, queryStringOpts) {
    if (!params) {
        return url;
    }
    var replacedParams = new Set();
    var parsedUrl = url.replace(/:[a-zA-Z]+/g, function (match) {
        var paramName = match.substr(1);
        if (params[paramName]) {
            if (Array.isArray(params[paramName])) {
                throw new TypeError('react-api-data: tried to use an array in an url parameter, this is supported, but only with query parameters.\nEither remove the parameter from your url, or change the type.');
            }
            replacedParams.add(paramName);
            return encodeURIComponent(String(params[paramName]));
        }
        return '';
    });
    var query = Object.assign.apply(Object, __spreadArray([{}], __read(Object.entries(params)
        .filter(function (_a) {
        var _b = __read(_a, 1), paramName = _b[0];
        return !replacedParams.has(paramName);
    })
        .map(function (_a) {
        var _b;
        var _c = __read(_a, 2), key = _c[0], val = _c[1];
        return (_b = {}, _b[key] = val, _b);
    })), false));
    return (0, query_string_1.stringifyUrl)({
        url: parsedUrl,
        query: query,
    }, __assign({ arrayFormat: 'bracket' }, queryStringOpts));
};
exports.formatUrl = formatUrl;
//# sourceMappingURL=formatUrl.js.map