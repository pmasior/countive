import { removeCommentsFromRegex } from "./verboseRegex";

describe("removeCommentsFromRegex", () => {
  it("should remove comments and spaces not prefixed by backslash", () => {
    const regexWithComments = String.raw`
      ^ u #fefe
      ^ j #fefe
      %\ d #fefe
      $
    `;

    const regexWithoutComments = removeCommentsFromRegex(regexWithComments);

    expect(regexWithoutComments).toEqual("^u^j% d$");
  });
});
