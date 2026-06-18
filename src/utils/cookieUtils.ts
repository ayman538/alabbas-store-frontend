export function setCookie(name: string, value: string, days = 1) {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((item) => item.startsWith(`${name}=`));

  return cookie ? cookie.split("=")[1] : null;
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}