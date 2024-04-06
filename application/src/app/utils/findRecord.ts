export const findRecordById = <T extends { id: number }>(
  records: T[],
  id: number
): T | undefined => records.find((r) => r.id === id);
