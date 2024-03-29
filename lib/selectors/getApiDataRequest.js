"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiDataRequest = void 0;
var getRequestKey_1 = require("../helpers/getRequestKey");
/**
 * Selector to manually get a {@link DataRequest}. This value is automatically bind when using {@link withApiData}.
 * This selector can be useful for tracking request status when a request is triggered manually, like a POST after a
 * button click.
 */
var getApiDataRequest = function (state, endpointKey, params, instanceId) {
    if (instanceId === void 0) { instanceId = ''; }
    return state.requests[(0, getRequestKey_1.getRequestKey)(endpointKey, params, instanceId)];
};
exports.getApiDataRequest = getApiDataRequest;
//# sourceMappingURL=getApiDataRequest.js.map