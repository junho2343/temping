"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _dirsToDelete;
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const rimraf = __importStar(require("rimraf"));
class Temping {
    constructor() {
        // delete directory AND file
        _dirsToDelete.set(this, []);
    }
    // remove directory AND file
    clean() {
        let target;
        while ((target = __classPrivateFieldGet(this, _dirsToDelete).shift()) !== undefined) {
            rimraf.sync(target);
        }
    }
    // create directory AND save directory path
    mkdir(prefix) {
        const dirPath = Temping.generateName(prefix);
        fs.mkdirSync(dirPath);
        fs.appendFileSync(`${dirPath}/test.txt`, "tttt");
        __classPrivateFieldGet(this, _dirsToDelete).push(dirPath);
        return dirPath;
    }
    generateName(rawAffixes) {
        return Temping.generateName(rawAffixes);
    }
    // random name generate AND save path
    static generateName(rawAffixes) {
        const now = new Date();
        // set affixes
        const affixes = parseAffixes(rawAffixes);
        const nameArr = [
            affixes.prefix,
            String(now.getFullYear()),
            String(now.getMonth()),
            String(now.getDate()),
            "-",
            String(process.pid),
            "-",
            Math.random().toString(36).substr(2, 11),
            affixes.suffix,
        ].join("");
        return path.join(affixes.dir || os.tmpdir(), nameArr);
        // set affixes
        function parseAffixes(rawAffixes) {
            let affixes = {};
            if (rawAffixes) {
                switch (typeof rawAffixes) {
                    case "string":
                        affixes.prefix = rawAffixes;
                        break;
                    case "object":
                        affixes = rawAffixes;
                        break;
                    default:
                        throw new Error("Unknown affix declaration: " + rawAffixes);
                }
            }
            return affixes;
        }
    }
}
_dirsToDelete = new WeakMap();
exports.default = {
    track: () => new Temping(),
    generateName: Temping.generateName,
};
