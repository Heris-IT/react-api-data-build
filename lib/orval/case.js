"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camel = exports.pascal = void 0;
var unicodes = function (s, prefix) {
    if (prefix === void 0) { prefix = ''; }
    return s.replace(/(^|-)/g, "$1\\u".concat(prefix)).replace(/,/g, "\\u".concat(prefix));
};
var symbols = unicodes('20-26,28-2F,3A-40,5B-60,7B-7E,A0-BF,D7,F7', '00');
var lowers = "a-z".concat(unicodes('DF-F6,F8-FF', '00'));
var uppers = "A-Z".concat(unicodes('C0-D6,D8-DE', '00'));
var impropers = 'A|An|And|As|At|But|By|En|For|If|In|Of|On|Or|The|To|Vs?\\.?|Via';
var regexps = {
    capitalize: new RegExp("(^|[".concat(symbols, "])([").concat(lowers, "])"), 'g'),
    pascal: new RegExp("(^|[".concat(symbols, "])+([").concat(lowers).concat(uppers, "])"), 'g'),
    fill: new RegExp("[".concat(symbols, "]+(.|$)"), 'g'),
    sentence: new RegExp("(^\\s*|[\\?\\!\\.]+\"?\\s+\"?|,\\s+\")([".concat(lowers, "])"), 'g'),
    improper: new RegExp("\\b(".concat(impropers, ")\\b"), 'g'),
    relax: new RegExp("([^".concat(uppers, "])([").concat(uppers, "]*)([").concat(uppers, "])(?=[^").concat(uppers, "]|$)"), 'g'),
    upper: new RegExp("^[^".concat(lowers, "]+$")),
    hole: /[^\s]\s[^\s]/,
    apostrophe: /'/g,
    room: new RegExp("[".concat(symbols, "]")),
};
var deapostrophe = function (s) { return s.replace(regexps.apostrophe, ''); };
var up = String.prototype.toUpperCase;
var low = String.prototype.toLowerCase;
var fill = function (sinput, fillWith, isDeapostrophe) {
    if (isDeapostrophe === void 0) { isDeapostrophe = false; }
    var s = sinput;
    if (fillWith != null) {
        s = s.replace(regexps.fill, function (m, next) { return (next ? fillWith + next : ''); });
    }
    if (isDeapostrophe) {
        s = deapostrophe(s);
    }
    return s;
};
var decap = function (s) { return low.call(s.charAt(0)) + s.slice(1); };
var relax = function (m, before, acronym, caps) { return "".concat(before, " ").concat(acronym ? "".concat(acronym, " ") : '').concat(caps); };
var prep = function (sinput, isFill, isPascal, isUpper) {
    if (isFill === void 0) { isFill = false; }
    if (isPascal === void 0) { isPascal = false; }
    if (isUpper === void 0) { isUpper = false; }
    var s = sinput == null ? '' : "".concat(sinput); // force to string
    if (!isUpper && regexps.upper.test(s)) {
        s = low.call(s);
    }
    if (!isFill && !regexps.hole.test(s)) {
        var holey = fill(s, ' ');
        if (regexps.hole.test(holey)) {
            s = holey;
        }
    }
    if (!isPascal && !regexps.room.test(s)) {
        s = s.replace(regexps.relax, relax);
    }
    return s;
};
var pascal = function (s) {
    return fill(prep(s, false, true).replace(regexps.pascal, function (m, border, letter) { return up.call(letter); }), '', true);
};
exports.pascal = pascal;
var camel = function (s) { return decap((0, exports.pascal)(s)); };
exports.camel = camel;
//# sourceMappingURL=case.js.map