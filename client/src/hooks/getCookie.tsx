function getCookie(cookieName: string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null; // Cookie not found
}

function useCookie(cookieName: string) {
    return getCookie(cookieName);
}

export default useCookie;