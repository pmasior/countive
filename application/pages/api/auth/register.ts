import type { NextApiRequest, NextApiResponse } from "next";

import { createUserIfNotExist } from "backend/repository/user";
import { EMAIL_REGEX } from "backend/constants/fieldsValidationRegexs";
import prisma from "prisma/prismaClient";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const handlePostMethod = async () => {
    await breakRegisterIfInvalid(req, res);
    const { email, password } = req.body;
    createUserIfNotExist(email, password);
    res.status(201).end();
  };

  if (req.method === "POST") {
    handlePostMethod();
  } else {
    res.status(405).end();
  }
};

export default handler;

const breakRegisterIfInvalid = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email, password } = req.body;
  const isMissingParams = () => !email || !password;
  const isInvalidEmail = () => !EMAIL_REGEX.test(email);
  const isUserAlreadyExist = async () =>
    await prisma.user.findFirst({
      where: { email: email },
    });

  if (isMissingParams()) {
    res.status(422).json({ message: "Missing email or password" }); //TODO: or return;
  } else if (isInvalidEmail()) {
    res.status(422).json({ message: "Invalid email" });
  } else if (await isUserAlreadyExist()) {
    res.status(422).json({ message: "User arleady exists" });
  }

  return true;
};
