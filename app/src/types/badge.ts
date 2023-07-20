export interface Badge {
    attemptCount: number,
    date: string,
    did: string,
    exhibitName: string,
    exhibitOrganization: string,
    exhibitOsid: string,
    osCreatedAt: string,
    osCreatedBy: string,
    osOwner: [string],
    osUpdatedAt: string,
    osUpdatedBy: string,
    osid: string,
    results: {score: number, totalScore: number, badgeWon: boolean},
    title: string,
    visitorMobileNumber: string,
    visitorName: string
}