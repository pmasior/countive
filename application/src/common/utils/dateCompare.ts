export const isDateBetween = (date: Date, since: Date, until: Date): boolean =>
  date >= new Date(since) && date < new Date(until);
