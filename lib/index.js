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
Object.defineProperty(exports, "__esModule", { value: true });
exports.styled = void 0;
var react_1 = require("react");
var utils_1 = require("./utils");
var styled = function (element, config) {
    var styledComponent = (0, react_1.forwardRef)(function (props, ref) {
        var mergedProps = __assign(__assign({}, config === null || config === void 0 ? void 0 : config.defaultVariants), props);
        // Initialize variables to store the new props and styles
        var componentProps = {};
        var componentStyles = [];
        // Pass through an existing className if it exists
        if (mergedProps.className)
            componentStyles.push(mergedProps.className);
        // Add the base style(s)
        if (config === null || config === void 0 ? void 0 : config.css)
            componentStyles.push((0, utils_1.flattenCss)(config.css));
        // Pass through the ref
        if (ref)
            componentProps.ref = ref;
        Object.keys(mergedProps).forEach(function (key) {
            var _a;
            // Apply any variant styles
            if ((config === null || config === void 0 ? void 0 : config.variants) && config.variants.hasOwnProperty(key)) {
                var variant = config.variants[key];
                if (variant && variant.hasOwnProperty(mergedProps[key])) {
                    var selector = variant[mergedProps[key]];
                    componentStyles.push((0, utils_1.flattenCss)(selector));
                }
            }
            var isVariant = (config === null || config === void 0 ? void 0 : config.variants) && config.variants.hasOwnProperty(key);
            // Only pass through the prop if it's not a variant or been told to pass through
            if (isVariant && !((_a = config === null || config === void 0 ? void 0 : config.passthrough) === null || _a === void 0 ? void 0 : _a.includes(key)))
                return;
            componentProps[key] = mergedProps[key];
        });
        // Apply any compound variant styles
        if (config === null || config === void 0 ? void 0 : config.compoundVariants) {
            var matches = (0, utils_1.findMatchingCompoundVariants)(config.compoundVariants, mergedProps);
            matches.forEach(function (match) {
                componentStyles.push((0, utils_1.flattenCss)(match.css));
            });
        }
        componentProps.className = componentStyles.join(" ");
        styledComponent.displayName = (0, utils_1.componentDisplayName)(element);
        return (0, react_1.createElement)(element, componentProps);
    });
    return styledComponent;
};
exports.styled = styled;
//# sourceMappingURL=index.js.map