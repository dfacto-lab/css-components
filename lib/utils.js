"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentDisplayName = exports.flattenCss = exports.findMatchingCompoundVariants = void 0;
var findMatchingCompoundVariants = function (compoundVariants, props) {
    return compoundVariants.filter(function (compoundVariant) {
        return Object.keys(compoundVariant).every(function (key) { return key === "css" || compoundVariant[key] === props[key]; });
    });
};
exports.findMatchingCompoundVariants = findMatchingCompoundVariants;
var flattenCss = function (css) {
    return Array.isArray(css) ? css.join(" ") : css;
};
exports.flattenCss = flattenCss;
var componentDisplayName = function (component) {
    return typeof window == "undefined" ? component.displayName : component.toString();
};
exports.componentDisplayName = componentDisplayName;
//# sourceMappingURL=utils.js.map