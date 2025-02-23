export default function generateCodeVerifier(length: number = 43): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);
  return Array.from(values)
    .map((x) => possible.charAt(x % possible.length))
    .join("");
}
