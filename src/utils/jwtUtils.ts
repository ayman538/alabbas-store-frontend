export function getUsernameFromToken(token: string | null): string {
  if (!token) {
    return "";
  }

  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload.sub ?? "";
  } catch {
    return "";
  }
}