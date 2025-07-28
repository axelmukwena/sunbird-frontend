export const isPathActive = (current: string, target?: string): boolean => {
  if (!target) return false;

  // root route must match exactly
  if (target === "/") return current === "/";

  // for every other route:
  //   • exact match  →  "/meetings" === "/meetings"
  //   • prefix match →  "/meetings/123" starts with "/meetings/"
  return current === target || current.startsWith(`${target}/`);
};
