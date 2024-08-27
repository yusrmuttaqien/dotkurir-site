export function getPathnameFromMetadata(state: any): string | undefined {
  const res = Object.getOwnPropertySymbols(state || {})
    .map((p) => state[p])
    .find((state) => state?.hasOwnProperty?.('urlPathname'));

  return res?.urlPathname.replace(/\?.+/, '');
}
