"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
/**
 * Register your global and endpoint configurations. Make sure you do this before you mount any components using
 * withApiData.
 */
var configure = function (globalConfig, endpointConfig) { return ({
    type: 'CONFIGURE_API_DATA',
    payload: {
        globalConfig: globalConfig,
        endpointConfig: endpointConfig
    }
}); };
exports.configure = configure;
//# sourceMappingURL=configure.js.map