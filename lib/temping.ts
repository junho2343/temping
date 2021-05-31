import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as rimraf from "rimraf";

// Temping Class
class Temping implements ITemping {
  // delete target (private variable)
  #dirsToDelete: string[] = [];

  // delete target remove
  clean() {
    let target;

    while ((target = this.#dirsToDelete.shift()) !== undefined) {
      rimraf.sync(target);
    }
  }

  // create directory AND save delete target
  mkdir(prefix?: string): string {
    const dirPath = Temping.path(prefix);

    fs.mkdirSync(dirPath);

    this.#dirsToDelete.push(dirPath);

    return dirPath;
  }

  // generate random name
  path(rawAffixes?: string | IAffixOptions): string {
    return Temping.path(rawAffixes);
  }

  // generate random name (static method)
  static path(rawAffixes?: string | IAffixOptions): string {
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
    function parseAffixes(rawAffixes?: string | IAffixOptions) {
      let affixes: IAffixOptions = {};

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

export interface IAffixOptions {
  dir?: string;
  prefix?: string;
  suffix?: string;
}

export interface ITemping {
  clean(): void;
  mkdir(prefix?: string): string;
  path(rawAffixes?: string | IAffixOptions): string;
}

export default {
  track: () => new Temping(),
  path: Temping.path,
};
