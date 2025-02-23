export default async function generateCodeChallenge(
  verifier: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = new Bun.CryptoHasher("sha256", data);

  return btoa(String.fromCharCode(...new Uint8Array(hash.digest())))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
