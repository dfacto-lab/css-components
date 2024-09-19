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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFiles = exports.generateOutput = exports.stylesToConfig = exports.extractStyles = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var glob_promise_1 = __importDefault(require("glob-promise"));
var sass_1 = __importDefault(require("sass"));
var extractStyles = function (path) {
    var fileContent = (0, path_1.extname)(path) === ".scss"
        ? sass_1.default.compile(path).css
        : fs_1.default.readFileSync(path).toString();
    return fileContent.match(/(h[1-6]|[a-zA-Z_]*)(?:[.]{1})([a-zA-Z_]+[\w\-_]*)(?:[\s\.\,\{\>#\:]{0})/gim);
};
exports.extractStyles = extractStyles;
var stylesToConfig = function (styles) {
    var config = {};
    styles.forEach(function (item) {
        var parts = item.split(".");
        var element = parts[0];
        var className = parts[1];
        var chunks = className.split("_");
        if (chunks.length === 2)
            return;
        if (chunks.length >= 1) {
            var component = chunks[0];
            if (!config[component]) {
                config[component] = {
                    variants: {},
                    compoundVariants: [],
                    css: component,
                    element: element,
                };
            }
            if (chunks.length === 3 || chunks.length === 4) {
                var variant = chunks[1];
                var option = chunks[2];
                if (!config[component].variants[variant]) {
                    config[component].variants[variant] = {};
                }
                config[component].variants[variant][option] = className;
            }
            else if (chunks.length > 4) {
                var variants = chunks.slice(1, chunks.length);
                var vars = variants.reduce(function (acc, cur, i, arr) {
                    if (i % 2 !== 0 || i + 1 >= arr.length)
                        return acc;
                    acc[cur] = arr[i + 1];
                    return acc;
                }, {});
                config[component].compoundVariants.push(__assign(__assign({}, vars), { css: className }));
            }
        }
    });
    return config;
};
exports.stylesToConfig = stylesToConfig;
var generateOutput = function (config, cssFilename) {
    var s = "";
    s += "import { styled } from \"@phntms/css-components\";\n\n";
    s += "import css from \"./".concat(cssFilename, "\";\n\n");
    Object.keys(config).forEach(function (key) {
        var hasVariants = Object.keys(config[key].variants).length > 0;
        var hasCompoundVariants = config[key].compoundVariants.length > 0;
        var componentName = key.charAt(0).toUpperCase() + key.slice(1);
        s += "export const ".concat(componentName, " = styled(\"").concat(config[key].element, "\", {\n");
        s += "  css: css.".concat(key, ",\n");
        if (hasVariants) {
            s += "  variants: {\n";
            Object.keys(config[key].variants).forEach(function (variant) {
                s += "    ".concat(variant, ": {\n");
                Object.keys(config[key].variants[variant]).forEach(function (option) {
                    s += "      ".concat(option, ": css.").concat(config[key].variants[variant][option], ",\n");
                });
                s += "    },\n";
            });
            s += "  },\n";
        }
        if (hasCompoundVariants) {
            s += "  compoundVariants: [\n";
            config[key].compoundVariants.forEach(function (variant) {
                s += "    {\n";
                Object.keys(variant).forEach(function (key) {
                    s += "      ".concat(key, ": css.").concat(variant[key], ",\n");
                });
                s += "    },\n";
            });
            s += "  ],\n";
        }
        if (hasVariants) {
            s += "  defaultVariants: {\n";
            Object.keys(config[key].variants).forEach(function (variant) {
                Object.keys(config[key].variants[variant]).forEach(function (option) {
                    if (config[key].variants[variant][option].endsWith("default"))
                        s += "    ".concat(variant, ": \"").concat(option, "\",\n");
                });
            });
            s += "  },\n";
        }
        s += "});\n";
    });
    return s;
};
exports.generateOutput = generateOutput;
var findFiles = function (glob) { return (0, glob_promise_1.default)(glob); };
exports.findFiles = findFiles;
//# sourceMappingURL=utils.js.map