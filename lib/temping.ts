import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as rimraf from "rimraf";

interface IAffixOptions {
  dir?: string;
  prefix?: string;
  suffix?: string;
}

export interface ITemping {
  clean(): void;
  mkdir(prefix?: string): string;
}

class Temping implements ITemping {
  // 삭제 할 디렉토리
  #dirsToDelete: string[] = [];

  // remove directory AND file
  clean() {
    let target;

    while ((target = this.#dirsToDelete.shift()) !== undefined) {
      rimraf.sync(target);
    }
  }

  // create directory AND save directory path
  mkdir(prefix?: string): string {
    const dirPath = _generateName(prefix);

    fs.mkdirSync(dirPath);

    fs.appendFileSync(`${dirPath}/test.txt`, "tttt");

    this.#dirsToDelete.push(dirPath);

    return dirPath;
  }
}

function _track() {
  return new Temping();
}

// random name generate AND save path
function _generateName(rawAffixes?: string | IAffixOptions): string {
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

export default {
  track: _track,
  generateName: _generateName,
};
