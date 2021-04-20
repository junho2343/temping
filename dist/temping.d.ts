interface IAffixOptions {
    dir?: string;
    prefix?: string;
    suffix?: string;
}
export interface ITemping {
    clean(): void;
    mkdir(prefix?: string): string;
}
declare class Temping implements ITemping {
    #private;
    clean(): void;
    mkdir(prefix?: string): string;
}
declare function _track(): Temping;
declare function _generateName(rawAffixes?: string | IAffixOptions): string;
declare const _default: {
    track: typeof _track;
    generateName: typeof _generateName;
};
export default _default;
