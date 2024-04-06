import { isArray, mergeWith, union } from "lodash";

/**
 * Recursive merge objects, if object property is array then they are combined
 * @param allRecognizedFields destination object
 * @param recognizedFields source object
 * @returns merged object
 */
export const mergeToObject = <T>(allRecognizedFields: T, recognizedFields: T) =>
  mergeWith(allRecognizedFields, recognizedFields, (destination, source) => {
    if (isArray(destination)) {
      return union(destination, source);
    }
  });
