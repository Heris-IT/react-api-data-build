"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var performRequest_1 = require("./actions/performRequest");
var getDataFromTree = function (tree, store, renderFn) {
    var renderFunction = renderFn !== null && renderFn !== void 0 ? renderFn : require('react-dom/server').renderToStaticMarkup;
    renderFunction(tree);
    var apiData = store.getState().apiData;
    return Promise.all(Object.keys(apiData.requests).map(function (requestKey) {
        var promise = (0, performRequest_1.getLoadingPromise)(requestKey);
        return promise;
    }));
};
exports.default = getDataFromTree;
//# sourceMappingURL=getDataFromTree.js.map