import { compileVerboseRegex } from "src/common/utils/verboseRegex";
import { AMOUNT_REGEX } from "./recognizeAmount";
import { DATE_REGEX } from "./recognizeDate";
import { NOTE_REGEX } from "./recognizeNote";
import { TAG_REGEX } from "./recognizeTags";

const expectFindValueByRegex = (value: string, regex: string) => {
  const compiledRegex = compileVerboseRegex(regex);
  const foundByRegex = compiledRegex.exec(value);
  expect(foundByRegex?.[0]).toBe(value);
};

describe("regexs", () => {
  it.each`
    value
    ${"+100"}
    ${"+100,0"}
    ${"+100."}
    ${"+100,00"}
    ${"+100.00"}
    ${"100.00"}
    ${"-30"}
    ${"-30,00"}
    ${"-30.00"}
    ${"- 30,00"}
    ${"- 30.00"}
    ${"- 30, 00"}
    ${"- 30. 00"}
  `("should find Amount '$value'", ({ value }) => {
    expectFindValueByRegex(value, AMOUNT_REGEX);
  });

  it.each`
    value
    ${"1.1.2021"}
    ${"01.01.2021"}
    ${"1.01.2021"}
    ${"20.12.2021"}
    ${"20.12"}
    ${"1.1"}
  `("should find Date '$value'", ({ value }) => {
    expectFindValueByRegex(value, DATE_REGEX);
  });

  it.each`
    value
    ${"`Notatka"}
    ${"'Notatka'"}
    ${'"Notatka'}
  `("should find Note '$value'", ({ value }) => {
    expectFindValueByRegex(value, NOTE_REGEX);
  });

  it.each`
    value
    ${"#Tag"}
  `("should find Tag '$value'", ({ value }) => {
    expectFindValueByRegex(value, TAG_REGEX);
  });
});
