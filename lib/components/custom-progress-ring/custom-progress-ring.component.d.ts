import * as i0 from "@angular/core";
export declare class CustomProgressRingComponent {
    value: number;
    total: number;
    width: number;
    stroke: number;
    color: string;
    bgColor: string;
    get normalizedRadius(): number;
    round(num: number, decPoints: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomProgressRingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomProgressRingComponent, "custom-progress-ring", never, { "value": { "alias": "value"; "required": true; }; "total": { "alias": "total"; "required": true; }; "width": { "alias": "width"; "required": false; }; "stroke": { "alias": "stroke"; "required": false; }; "color": { "alias": "color"; "required": false; }; "bgColor": { "alias": "bgColor"; "required": false; }; }, {}, never, never, true, never>;
}
