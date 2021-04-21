declare class Temping implements ITemping {
    #private;
    clean(): void;
    mkdir(prefix?: string): string;
    generateName(rawAffixes?: string | IAffixOptions): string;
    static generateName(rawAffixes?: string | IAffixOptions): string;
}
export interface IAffixOptions {
    dir?: string;
    prefix?: string;
    suffix?: string;
}
export interface ITemping {
    clean(): void;
    mkdir(prefix?: string): string;
}
declare const _default: {
    track: () => Temping;
    generateName: typeof Temping.generateName;
};
export default _default;
