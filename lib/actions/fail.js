"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fail = void 0;
var fail = function (requestKey, errorBody, response) { return ({
    type: 'API_DATA_FAIL',
    payload: {
        requestKey: requestKey,
        response: response,
        errorBody: errorBody,
    },
}); };
exports.fail = fail;
//# sourceMappingURL=fail.js.map