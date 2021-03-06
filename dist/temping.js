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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Temping_dirsToDelete;
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const rimraf = __importStar(require("rimraf"));
// Temping Class
class Temping {
    constructor() {
        // delete target (private variable)
        _Temping_dirsToDelete.set(this, []);
    }
    // delete target remove
    clean() {
        let target;
        while ((target = __classPrivateFieldGet(this, _Temping_dirsToDelete, "f").shift()) !== undefined) {
            rimraf.sync(target);
        }
    }
    // create directory AND save delete target
    mkdir(prefix) {
        const dirPath = Temping.path(prefix);
        fs.mkdirSync(dirPath);
        __classPrivateFieldGet(this, _Temping_dirsToDelete, "f").push(dirPath);
        return dirPath;
    }
    // generate random name
    path(rawAffixes) {
        return Temping.path(rawAffixes);
    }
    // generate random name (static method)
    static path(rawAffixes) {
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
_Temping_dirsToDelete = new WeakMap();
exports.default = {
    track: () => new Temping(),
    path: Temping.path,
};
