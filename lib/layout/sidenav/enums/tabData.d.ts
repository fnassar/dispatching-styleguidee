export interface Tab {
    title: string;
    module?: string[];
    permissions?: string[];
    partnerTypes?: string[];
    hidden?: boolean | (() => boolean);
    icon: SvgIcons;
}
export interface MainTab extends Tab {
    link?: string;
    isExpanded?: boolean;
    subTabs?: SubTab[];
    activeSubIndex?: number;
    sessionsToDestroy?: string[];
    tag?: string;
    badgeCount?: number | (() => number);
}
export interface SubTab extends Tab {
    link: string;
}
export type SvgIcons = 'insightsSvg' | 'planningSvg' | 'plansSvg' | 'tasksSvg' | 'resourcesSvg' | 'teamsSvg' | 'usersSvg' | 'assetsSvg' | 'vehiclesSvg' | 'equipmentSvg' | 'zonesSvg' | 'AnalysisSvg';
