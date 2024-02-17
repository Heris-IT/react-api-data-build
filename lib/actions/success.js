"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = void 0;
var normalizr_1 = require("normalizr");
var success = function (requestKey, endpointConfig, response, body) { return ({
    type: 'API_DATA_SUCCESS',
    payload: {
        requestKey: requestKey,
        response: response,
        responseBody: typeof endpointConfig.transformResponseBody === 'function'
            ? endpointConfig.transformResponseBody(body)
            : body,
        normalizedData: endpointConfig.responseSchema ? (0, normalizr_1.normalize)(body, endpointConfig.responseSchema) : undefined,
    }
}); };
exports.success = success;
//# sourceMappingURL=success.js.map