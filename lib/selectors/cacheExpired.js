"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheExpired = void 0;
var cacheExpired = function (endpointConfig, request) {
    return Date.now() - request.lastCall >
        (typeof endpointConfig.cacheDuration === 'number' ? endpointConfig.cacheDuration : Number.POSITIVE_INFINITY);
};
exports.cacheExpired = cacheExpired;
//# sourceMappingURL=cacheExpired.js.map