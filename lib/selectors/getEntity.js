"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntity = void 0;
var normalizr_1 = require("normalizr");
/**
 * Selector for getting a single entity from normalized data.
 */
var getEntity = function (state, schema, id) {
    var entity = state.entities[schema.key] && state.entities[schema.key][id];
    return entity && (0, normalizr_1.denormalize)(id, schema, state.entities);
};
exports.getEntity = getEntity;
//# sourceMappingURL=getEntity.js.map