"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purge = void 0;
/**
 * Remove all the requests and entities but keep the configurations. This can be usefull when creating a log out feature.
 * @example
 * dispatch(purge());
 */
var purge = function () { return ({
    type: 'PURGE_API_DATA',
}); };
exports.purge = purge;
//# sourceMappingURL=purge.js.map