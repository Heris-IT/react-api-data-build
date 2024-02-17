"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoadingState = void 0;
var getApiDataRequest_1 = require("./getApiDataRequest");
var getLoadingState = function (apiDataState, endpointKey, params, instanceId) {
    if (instanceId === void 0) { instanceId = ''; }
    var config = apiDataState.endpointConfig[endpointKey];
    if (!config) {
        if (process.env.NODE_ENV === 'development') {
            console.warn("apiData.getResult: configuration of endpoint ".concat(endpointKey, " not found."));
        }
        return false;
    }
    var request = (0, getApiDataRequest_1.getApiDataRequest)(apiDataState, endpointKey, params, instanceId);
    if (!request) {
        return false;
    }
    return request.networkStatus === 'loading';
};
exports.getLoadingState = getLoadingState;
//# sourceMappingURL=getLoadingState.js.map