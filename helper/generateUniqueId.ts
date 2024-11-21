const generatedIds = new Set<string>();

export function generateUniqueId(): string {
  let newId: string;
  do {
    // Generate a random 6-digit number
    newId = Math.floor(100000 + Math.random() * 900000).toString();
  } while (generatedIds.has(newId));

  // Add to set of generated IDs
  generatedIds.add(newId);

  return newId;
}
