"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActions = void 0;
var __1 = require("..");
var __2 = require("..");
var __3 = require("..");
var purgeRequest_1 = require("../actions/purgeRequest");
var getActions = function (dispatch) {
    return {
        invalidateCache: function (endpointKey, params, instanceId) {
            if (instanceId === void 0) { instanceId = ''; }
            return dispatch((0, __1.invalidateRequest)(endpointKey, params, instanceId));
        },
        perform: function (endpointKey, params, body, instanceId) {
            if (instanceId === void 0) { instanceId = ''; }
            return dispatch((0, __3.performRequest)(endpointKey, params, body, instanceId));
        },
        purgeRequest: function (endpointKey, params, instanceId) {
            if (instanceId === void 0) { instanceId = ''; }
            return dispatch((0, purgeRequest_1.purgeRequest)(endpointKey, params, instanceId));
        },
        purgeAll: function () { return dispatch((0, __2.purgeAll)()); }
    };
};
exports.getActions = getActions;
//# sourceMappingURL=getActions.js.map