declare class Temping implements ITemping {
    #private;
    clean(): void;
    mkdir(prefix?: string): string;
    path(rawAffixes?: string | IAffixOptions): string;
    static path(rawAffixes?: string | IAffixOptions): string;
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
declare const _default: {
    track: () => Temping;
    path: typeof Temping.path;
};
export default _default;
