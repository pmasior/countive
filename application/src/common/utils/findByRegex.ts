export const findByRegex = (string: string, regex: string) => {
  const compiledRegex = new RegExp(regex);
  const matchedByRegex = string.match(compiledRegex);
  return matchedByRegex?.[0];
};
