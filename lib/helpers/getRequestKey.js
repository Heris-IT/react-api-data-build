"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestKey = void 0;
var getRequestKey = function (endpointKey, params, instanceId) {
    if (params === void 0) { params = {}; }
    if (instanceId === void 0) { instanceId = ''; }
    return "".concat(endpointKey, "/").concat(Object.keys(params)
        .sort()
        .map(function (param) { return "".concat(param, "=").concat(params[param]); })
        .join('&')).concat(instanceId !== '' ? '#' + instanceId : '');
};
exports.getRequestKey = getRequestKey;
//# sourceMappingURL=getRequestKey.js.map