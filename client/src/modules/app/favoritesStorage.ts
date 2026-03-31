const STORAGE_KEY = "ufc-manager-favoritos";

export function getFavoriteIds(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is number => typeof x === "number");
  } catch {
    return [];
  }
}

function persist(ids: number[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function setFavoriteIds(ids: number[]): void {
  persist([...new Set(ids)]);
}

export function addFavoriteId(id: number): boolean {
  const ids = getFavoriteIds();
  if (ids.includes(id)) return false;
  ids.push(id);
  persist(ids);
  return true;
}

export function removeFavoriteId(id: number): void {
  persist(getFavoriteIds().filter((x) => x !== id));
}
