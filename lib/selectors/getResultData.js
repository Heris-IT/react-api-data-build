"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultData = void 0;
var normalizr_1 = require("normalizr");
var getRequest_1 = require("./getRequest");
/**
 * Get the de-normalized result data of an endpoint, or undefined if not (yet) available. This value is automatically
 * bound when using {@link withApiData}.
 */
var getResultData = function (state, endpointKey, params, instanceId) {
    if (instanceId === void 0) { instanceId = ''; }
    var config = state.endpointConfig[endpointKey];
    if (!config) {
        if (process.env.NODE_ENV === 'development') {
            console.warn("apiData.getResult: configuration of endpoint ".concat(endpointKey, " not found."));
        }
        return;
    }
    var request = (0, getRequest_1.getRequest)(state, endpointKey, params, instanceId);
    if (!request) {
        return;
    }
    return request.networkStatus === 'failed'
        ? undefined
        : request.result && (config.responseSchema
            ? (0, normalizr_1.denormalize)(request.result, config.responseSchema, state.entities)
            : request.result);
};
exports.getResultData = getResultData;
//# sourceMappingURL=getResultData.js.map