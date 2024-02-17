"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDispatch = exports.useSelector = void 0;
var react_redux_1 = require("react-redux");
var useSelector = function (state) { return (0, react_redux_1.useSelector)(state); };
exports.useSelector = useSelector;
var useDispatch = function () { return (0, react_redux_1.useDispatch)(); };
exports.useDispatch = useDispatch;
//# sourceMappingURL=react-redux-hooks.js.map