import * as i0 from "@angular/core";
export declare class TranslationService {
    private translate;
    initialize(defaultLang?: string): void;
    changeLanguage(lang: string): void;
    get(key: string, params?: Record<string, any>): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TranslationService>;
}
