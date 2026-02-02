/**
 * Calculates the uptime of the user since account creation.
 * @param createdAt - The account creation date string.
 * @returns An object containing years, days, and the formatted creation date.
 */
export function calculateUptime(createdAt: string) {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - createdDate.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return {
        years: Math.floor(totalDays / 365),
        days: totalDays % 365,
        since: createdDate.toDateString(),
    };
}
