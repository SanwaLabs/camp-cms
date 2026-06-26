export function relationName(
  relation: { name: string } | { name: string }[] | null | undefined,
  fallback = "Unassigned",
): string {
  if (!relation) {
    return fallback;
  }

  if (Array.isArray(relation)) {
    return relation[0]?.name ?? fallback;
  }

  return relation.name;
}

export function relationRecord<T>(
  relation: T | T[] | null | undefined,
): T | null {
  if (!relation) {
    return null;
  }

  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation;
}
