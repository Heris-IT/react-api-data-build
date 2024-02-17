"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRequestHandler = exports.performRequest = exports.getLoadingPromise = exports.getRequestConfig = exports.getRequestProperties = void 0;
var getRequest_1 = require("../selectors/getRequest");
var fail_1 = require("./fail");
var success_1 = require("./success");
var getRequestKey_1 = require("../helpers/getRequestKey");
var formatUrl_1 = require("../helpers/formatUrl");
var createBinding_1 = require("../helpers/createBinding");
var request_1 = __importDefault(require("../request"));
var cacheExpired_1 = require("../selectors/cacheExpired");
var getActions_1 = require("../helpers/getActions");
var getFailedData_1 = require("../selectors/getFailedData");
var getResultData_1 = require("../selectors/getResultData");
var withApiData_1 = require("../withApiData");
var getRequestProperties = function (endpointConfig, globalConfig, state, body) {
    var defaultProperties = { body: body, headers: {}, method: endpointConfig.method };
    var requestProperties = composeConfigPipeFn(endpointConfig.setRequestProperties, globalConfig.setRequestProperties)(defaultProperties, state);
    requestProperties.headers = composeConfigPipeFn(endpointConfig.setHeaders, globalConfig.setHeaders)(defaultProperties.headers, state);
    return requestProperties;
};
exports.getRequestProperties = getRequestProperties;
var getRequestConfig = function (endpointConfig, globalConfig) {
    var _a, _b;
    var parseMethod = (_b = (_a = endpointConfig.parseMethod) !== null && _a !== void 0 ? _a : globalConfig.parseMethod) !== null && _b !== void 0 ? _b : 'json';
    return {
        parseMethod: parseMethod
    };
};
exports.getRequestConfig = getRequestConfig;
// passes return value from endpoint function to global function
var composeConfigPipeFn = function (endpointFn, globalFunction) {
    var id = function (val) { return val; };
    var fnA = endpointFn || id;
    var fnB = globalFunction || id;
    return function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return fnA.apply(void 0, __spreadArray([fnB.apply(void 0, __spreadArray([value], __read(args), false))], __read(args), false));
    };
};
// calls global function after endpoint function if endpoint function does not return false
var composeConfigOverrideFn = function (endpointFn, globalFn) {
    var fallback = function (val) { return undefined; };
    var fnA = endpointFn || fallback;
    var fnB = globalFn || fallback;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fnA.apply(void 0, __spreadArray([], __read(args), false)) !== false && fnB.apply(void 0, __spreadArray([], __read(args), false));
    };
};
var requestFunction = request_1.default;
var __DEV__ = process.env.NODE_ENV === 'development';
var loadingPromises = {};
var getLoadingPromise = function (requestKey) {
    var _a;
    return (_a = loadingPromises[requestKey]) !== null && _a !== void 0 ? _a : null;
};
exports.getLoadingPromise = getLoadingPromise;
/**
 * Manually trigger an request to an endpoint. Prefer to use {@link withApiData} instead of using this function directly.
 * This is an action creator, so make sure to dispatch the return value.
 */
var performRequest = function (endpointKey, inputParams, body, instanceId, bindingsStore, customConfig) {
    if (instanceId === void 0) { instanceId = ''; }
    if (bindingsStore === void 0) { bindingsStore = new createBinding_1.BindingsStore(); }
    return function (dispatch, getState) {
        var state = getState();
        var endpointConfig = state.apiData.endpointConfig[endpointKey];
        var globalConfig = state.apiData.globalConfig;
        if (!endpointConfig) {
            var errorMsg = "apiData.performRequest: no config with key ".concat(endpointKey, " found!");
            if (__DEV__) {
                console.error(errorMsg);
            }
            throw new Error(errorMsg);
        }
        var config = __assign(__assign({}, endpointConfig), customConfig);
        // Merge the defaultParams and URL inputParams. This is where any defaultParams get overwritten.
        var params = __assign(__assign({}, config.defaultParams), inputParams);
        var getCurrentBinding = function (request) {
            return bindingsStore.getBinding(endpointKey, params, dispatch, instanceId, getState().apiData, request);
        };
        var apiDataRequest = (0, getRequest_1.getRequest)(state.apiData, endpointKey, params, instanceId);
        var requestKey = (0, getRequestKey_1.getRequestKey)(endpointKey, params || {}, instanceId);
        if (apiDataRequest && apiDataRequest.networkStatus === 'loading' && loadingPromises[requestKey]) {
            return loadingPromises[requestKey];
        }
        // don't re-trigger calls when already loading and don't re-trigger succeeded GET calls
        // TODO: unit test this scenario
        if (apiDataRequest &&
            (0, withApiData_1.shouldAutoTrigger)(state.apiData, endpointKey) &&
            apiDataRequest.networkStatus === 'success' &&
            !(0, cacheExpired_1.cacheExpired)(config, apiDataRequest)) {
            return Promise.resolve(getCurrentBinding(apiDataRequest));
        }
        var url = (0, formatUrl_1.formatUrl)(config.url, params, config.queryStringOpts);
        dispatch({
            type: 'FETCH_API_DATA',
            payload: {
                requestKey: requestKey,
                endpointKey: endpointKey,
                params: params,
                url: url,
            },
        });
        var requestProperties = (0, exports.getRequestProperties)(config, globalConfig, state, body);
        var requestConfig = (0, exports.getRequestConfig)(config, globalConfig);
        var promise = new Promise(function (resolve, reject) {
            var timeout = config.timeout || globalConfig.timeout;
            var abortTimeout;
            var aborted = false;
            if (timeout) {
                abortTimeout = setTimeout(function () {
                    aborted = true;
                    handleFail(new Error('Timeout'));
                }, timeout);
            }
            requestFunction(url, requestProperties, requestConfig).then(function (handledResponse) {
                if (aborted) {
                    return;
                }
                clearTimeout(abortTimeout);
                if (handledResponse.response.ok) {
                    handleSuccess(handledResponse);
                }
                else {
                    handleFail(handledResponse.body, handledResponse.response);
                }
            }, function (error) {
                if (aborted) {
                    return;
                }
                clearTimeout(abortTimeout);
                handleFail(error);
            });
            function beforeProps() {
                return {
                    request: (0, getRequest_1.getRequest)(getState().apiData, endpointKey, params, instanceId),
                    requestBody: body,
                    endpointKey: endpointKey,
                };
            }
            function afterProps(isFailed) {
                return __assign(__assign({}, beforeProps()), { resultData: isFailed
                        ? (0, getFailedData_1.getFailedData)(getState().apiData, endpointKey, params, instanceId)
                        : (0, getResultData_1.getResultData)(getState().apiData, endpointKey, params, instanceId), getState: getState, dispatch: dispatch, actions: (0, getActions_1.getActions)(dispatch) });
            }
            function handleSuccess(_a, skipBefore) {
                var response = _a.response, responseBody = _a.body;
                if (skipBefore === void 0) { skipBefore = false; }
                if (!skipBefore) {
                    // before success cb, allows turning this into fail by altering ok value
                    var beforeSuccess = composeConfigPipeFn(config.beforeSuccess, globalConfig.beforeSuccess);
                    var alteredResp = beforeSuccess({ response: response, body: responseBody }, beforeProps());
                    response = alteredResp.response;
                    responseBody = alteredResp.body;
                    if (!response.ok) {
                        handleFail(responseBody, response, true);
                        return;
                    }
                }
                // dispatch success
                dispatch((0, success_1.success)(requestKey, config, response, responseBody));
                // after success cb
                if (config.afterSuccess || globalConfig.afterSuccess) {
                    var afterSuccess = composeConfigOverrideFn(config.afterSuccess, globalConfig.afterSuccess);
                    afterSuccess(afterProps(false));
                }
                resolve(getCurrentBinding());
            }
            function handleFail(responseBody, response, skipBefore) {
                if (skipBefore === void 0) { skipBefore = false; }
                if (!skipBefore) {
                    // before error cb, allows turning this into success by altering ok value
                    var beforeFailed = composeConfigPipeFn(config.beforeFailed, globalConfig.beforeFailed);
                    var alteredResp = beforeFailed({ response: response, body: responseBody }, beforeProps());
                    response = alteredResp.response;
                    responseBody = alteredResp.body;
                    if (response && response.ok) {
                        handleSuccess({ response: response, body: responseBody }, true);
                        return;
                    }
                }
                // dispatch fail
                dispatch((0, fail_1.fail)(requestKey, responseBody, response));
                // after error cb
                if (config.afterFailed || globalConfig.afterFailed) {
                    var afterFailed = composeConfigOverrideFn(config.afterFailed, globalConfig.afterFailed);
                    afterFailed(afterProps(true));
                }
                reject(getCurrentBinding());
            }
        });
        dispatch({
            type: 'FETCH_API_DATA',
            payload: {
                requestKey: requestKey,
                endpointKey: endpointKey,
                params: params,
                url: url
            },
        });
        loadingPromises[requestKey] = promise;
        // .catch(() => null) is added to prevent unhandled promise rejection errors
        promise.catch(function () { return null; }).finally(function () { return delete loadingPromises[requestKey]; });
        return promise;
    };
};
exports.performRequest = performRequest;
/**
 * Use your own request function that calls the api and reads the responseBody response. Make sure it implements the
 * {@link RequestHandler} interface.
 * @param requestHandler
 */
var setRequestHandler = function (requestHandler) {
    requestFunction = requestHandler;
};
exports.setRequestHandler = setRequestHandler;
//# sourceMappingURL=performRequest.js.map