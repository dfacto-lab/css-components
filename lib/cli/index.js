#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var yargs_1 = __importDefault(require("yargs/yargs"));
var utils_1 = require("./utils");
var argv = (0, yargs_1.default)(process.argv.slice(2))
    .options({
    css: {
        type: "string",
        describe: "path to css file, or glob pattern",
        demandOption: true,
    },
    output: {
        type: "string",
        describe: "filename to save alongside the css file",
        default: "styles.ts",
    },
    overwrite: {
        type: "boolean",
        describe: "should the output file be overwritten if it exists",
        default: false,
    },
})
    .parseSync();
var cssFile = argv.css;
var outputFileName = argv.output;
var overwrite = argv.overwrite;
(0, utils_1.findFiles)(cssFile).then(function (files) {
    files.forEach(function (file) {
        var styles = (0, utils_1.extractStyles)(file);
        var config = (0, utils_1.stylesToConfig)(styles || []);
        var output = (0, utils_1.generateOutput)(config, path_1.default.basename(file));
        var folder = path_1.default.dirname(file);
        var outputPath = path_1.default.join(folder, outputFileName);
        var exists = fs_1.default.existsSync(outputPath);
        if (exists && !overwrite) {
            console.log("File ".concat(outputPath, " already exists, skipping"));
            return;
        }
        fs_1.default.writeFileSync(outputPath, output);
        console.log("".concat(Object.keys(config).length, " components written to: ").concat(outputPath));
    });
});
//# sourceMappingURL=index.js.map