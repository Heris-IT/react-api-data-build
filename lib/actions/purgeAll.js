"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgeAll = void 0;
/**
 * Remove all the requests and entities but keep the configurations. This can be usefull when creating a log out feature.
 * @example
 * dispatch(purgeAll());
 */
var purgeAll = function () { return ({
    type: 'PURGE_ALL_API_DATA',
}); };
exports.purgeAll = purgeAll;
//# sourceMappingURL=purgeAll.js.map