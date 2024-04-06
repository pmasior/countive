import NextAuth from "next-auth";
import CredentialsProvider, {
  CredentialInput,
} from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { findUserByEmail } from "backend/repository/user";
import { comparePasswords } from "backend/auth/hashPassword";
import prisma from "prisma/prismaClient";

type Credentials = Record<"email" | "password", CredentialInput>;
type CredentialsInputs = Record<"email" | "password", string>;

const nextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider<Credentials>({
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "E-mail" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        breakLoginIfInvalid(credentials);
        const { email, password } = credentials as CredentialsInputs;
        const user = await findUserByEmail(email);
        const passwordFromDatabase = user?.password;
        if (
          passwordFromDatabase &&
          comparePasswords(password, passwordFromDatabase)
        ) {
          return user;
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_JS_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    encryption: true,
    secret: process.env.NEXT_AUTH_JS_JWT_SECRET,
  },
  pages: {
    signIn: "/login",
  },
};

// @ts-ignore TODO: fix this
export default NextAuth(nextAuthOptions);

const breakLoginIfInvalid = (body: CredentialsInputs | undefined) => {
  const isCredentialsUndefined = () => !body;
  const isMissingParams = () => !body?.email || !body.password;

  if (isCredentialsUndefined()) {
    console.log(JSON.stringify(!!body));
    throw new Error("Missing email and password");
  } else if (isMissingParams()) {
    console.log("err");
    throw new Error("Missing email or password");
  }
  return true;
};
