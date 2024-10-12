export function getExpiryFromToken(token?: string): Date {
    if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return new Date(payload.exp * 1000);
    }
    throw new Error("No token provided");
}

export function getTimeoutFromToken(token?: string): number {
    if (token) {
        const expiry = getExpiryFromToken(token);
        return expiry.getTime() - Date.now();
    }
    throw new Error("No token provided");
}

export const cookieOptions = {
    path: "/",
    sameSite: "lax" as "lax",
    secure: true,
    domain: global.window?.location.hostname,
};