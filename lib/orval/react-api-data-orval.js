"use strict";
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
exports.ReactApiDataOrvalClient = exports.generateVerbImports = void 0;
var case_1 = require("./case");
var generateVerbImports = function (_a) {
    var response = _a.response, body = _a.body, queryParams = _a.queryParams, params = _a.params;
    return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(response.imports), false), __read(body.imports), false), __read((queryParams ? [{ name: queryParams.schema.name }] : [])), false), __read(params.flatMap(function (_a) {
        var imports = _a.imports;
        return imports;
    })), false);
};
exports.generateVerbImports = generateVerbImports;
var generateReactApiDataHook = function (_a, _b) {
    var _c, _d;
    var verb = _a.verb, operationName = _a.operationName, params = _a.params, response = _a.response, body = _a.body;
    var pathRoute = _b.pathRoute;
    var errorType = "".concat(response.definition.errors || 'unknown');
    var pathParams = (_d = (_c = pathRoute.match(/\{([^}]+)\}/g)) === null || _c === void 0 ? void 0 : _c.reduce(function (acc, part) {
        acc[part.replace(/[_{}]/g, '')] = (0, case_1.camel)(part);
        return acc;
    }, {})) !== null && _d !== void 0 ? _d : {};
    var hasParams = (params === null || params === void 0 ? void 0 : params.length) > 0;
    var isPartialAllowed = verb !== 'get';
    var paramType = "{".concat(params
        .map(function (_a) {
        var _b;
        var implementation = _a.implementation;
        var parts = implementation.split(':');
        var first = parts.shift();
        return "".concat((_b = pathParams[first !== null && first !== void 0 ? first : '']) !== null && _b !== void 0 ? _b : first, ":").concat(parts.join(':'));
    })
        .join(', '), "}");
    var hookParamType = hasParams && isPartialAllowed ? "Partial<".concat(paramType, ">") : paramType;
    return "export const ".concat((0, case_1.camel)("use-".concat(operationName)), " = (\n    params: ").concat(hookParamType).concat(isPartialAllowed ? ' = {}' : '', ", options?: HookOptions \n) => useApiData<").concat(response.definition.success || 'unknown', ", ").concat(errorType, ", ").concat(hookParamType, ", ").concat(body.definition.length > 0 ? body.definition : 'unknown', ">('").concat(operationName, "', params, options);\n");
};
var ReactApiDataOrvalClient = function () {
    var endpoints = [];
    var getReactApiDataDependencies = function () { return [
        {
            exports: [{ name: 'useApiData', values: true }, { name: 'Binding' }, { name: 'HookOptions' }, { name: 'Method' }],
            dependency: 'react-api-data',
        },
    ]; };
    var generateReactApiDataTitle = function () { return ''; };
    var generateReactApiDataHeader = function () { return ''; };
    var generateReactApiDataFooter = function () { return "const getUrl = (path: string) => `${path}`;\nexport const endpointConfig = {".concat(endpoints
        .map(function (_a) {
        var _b = _a.verbOptions, operationName = _b.operationName, verb = _b.verb, pathRoute = _a.options.pathRoute;
        return "\n    ".concat(operationName, ": {\n        url: getUrl('").concat(pathRoute.replace(/\{([^}]+)\}/g, function (fullMatch, part) { return ":".concat((0, case_1.camel)(part)); }), "'),\n        method: '").concat(verb.toUpperCase(), "' as Method,\n    }");
    })
        .join(','), ",\n};\n"); };
    var generateReactApiData = function (verbOptions, options) {
        var imports = (0, exports.generateVerbImports)(verbOptions);
        var implementation = generateReactApiDataHook(verbOptions, options);
        endpoints.push({ verbOptions: verbOptions, options: options });
        return {
            implementation: implementation,
            imports: imports,
        };
    };
    return function () { return ({
        client: generateReactApiData,
        header: generateReactApiDataHeader,
        dependencies: getReactApiDataDependencies,
        footer: generateReactApiDataFooter,
        title: generateReactApiDataTitle,
    }); };
};
exports.ReactApiDataOrvalClient = ReactApiDataOrvalClient;
//# sourceMappingURL=react-api-data-orval.js.map