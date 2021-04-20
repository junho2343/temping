interface AffixOptions {
    dir?: string;
    prefix?: string;
    suffix?: string;
}
declare class Temping {
    #private;
    clean(): void;
    mkdir(prefix?: string): string;
}
declare function _track(): Temping;
declare function _generateName(rawAffixes?: string | AffixOptions): string;
declare const _default: {
    track: typeof _track;
    generateName: typeof _generateName;
};
export default _default;
