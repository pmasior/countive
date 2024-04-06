import { parse } from "date-fns";
import { recognizeByRegex } from "./recognizeByRegex";

const DAY_REGEX = String.raw`(?:0?[1-9]|[12][0-9]|3[0-1])`;
const MONTH_REGEX = String.raw`(?:0?[1-9]|1[1-2])`;
const YEAR_REGEX = String.raw`(?:19|20[0-9]{2})`;

const LONG_DATE = String.raw`\b${DAY_REGEX}\.${MONTH_REGEX}\.${YEAR_REGEX}\b`;
const SHORT_DATE = String.raw`\b${DAY_REGEX}\.${MONTH_REGEX}\b`;

export const DATE_REGEX = String.raw`
  ${LONG_DATE}  # ex: 20.12.2021
  |
  ${SHORT_DATE} # ex: 20.12
`;

export const recognizeDate = (inputTransaction: string) =>
  recognizeByRegex(inputTransaction, "date", DATE_REGEX, convertToDate);

const CONVERT_DATE = [
  { recognizeRegex: String.raw`\d\.\d\.\d{4}`, dateFnsFormat: "d.L.Y" },
  { recognizeRegex: String.raw`\d\d\.\d\.\d{4}`, dateFnsFormat: "dd.L.Y" },
  { recognizeRegex: String.raw`\d\.\d\d\.\d{4}`, dateFnsFormat: "d.LL.Y" },
  { recognizeRegex: String.raw`\d\d\.\d\d\.\d{4}`, dateFnsFormat: "dd.LL.Y" },
  { recognizeRegex: String.raw`\d\.\d`, dateFnsFormat: "d.L" },
  { recognizeRegex: String.raw`\d\d\.\d`, dateFnsFormat: "dd.L" },
  { recognizeRegex: String.raw`\d\.\d\d`, dateFnsFormat: "d.LL" },
  { recognizeRegex: String.raw`\d\d\.\d\d`, dateFnsFormat: "dd.LL" },
  { recognizeRegex: String.raw``, dateFnsFormat: "" },
];

/**
 * Convert found date to correct Date object
 * @param foundValue string matching to DATE_REGEX regular expression
 * @returns object with foundValue and foundValue convert to correct Date object
 */
export const convertToDate = (foundValue: string) => {
  let parsedValue: Date | null = null;

  CONVERT_DATE.some(({ recognizeRegex, dateFnsFormat }) => {
    if (new RegExp(recognizeRegex).test(foundValue)) {
      parsedValue = parse(foundValue, dateFnsFormat, new Date());
      return true;
    }
  });

  return { foundValue, parsedValue };
};
