import * as i0 from "@angular/core";
export interface AvatarItem {
    imgPath?: string;
    name: string;
}
export declare class CustomAvatarsComponent {
    items: AvatarItem[];
    size: number;
    overlapOffset: number;
    removeOutline: boolean;
    getInitials(name: string): string;
    getRandomColor(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomAvatarsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomAvatarsComponent, "custom-avatars", never, { "items": { "alias": "items"; "required": false; }; "size": { "alias": "size"; "required": false; }; "overlapOffset": { "alias": "overlapOffset"; "required": false; }; "removeOutline": { "alias": "removeOutline"; "required": false; }; }, {}, never, never, true, never>;
}
