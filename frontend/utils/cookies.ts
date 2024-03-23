/**
 * Retrieves the value of a cookie by its name.
 * @param cookieName - The name of the cookie to retrieve.
 * @returns The value of the cookie, or an empty string if the cookie does not exist.
 */
export function getCookie(cookieName: string): string {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

/**
 * Removes a cookie by its name.
 * @param cookieName - The name of the cookie to remove.
 */
export function removeCookie(cookieName: string): void {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Sets a cookie with the specified name, value, and expiration time.
 * @param cookieName - The name of the cookie to set.
 * @param cookieValue - The value to assign to the cookie.
 * @param days - The number of days until the cookie expires.
 */
export function setCookie(cookieName: string, cookieValue: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
}