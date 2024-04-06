import React from "react";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useSession } from "next-auth/react";
import { SWRConfig } from "swr";

import Body from "src/app/layouts/Category";
import { getFallbackForApp } from "backend/utils/getFallbackForApp";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { fallback: { ...(await getFallbackForApp(context)) } } };
};

const Category: NextPage = ({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useSession({ required: true });

  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        {/* TODO: is it good place for add material icons? */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Body />
    </SWRConfig>
  );
};

export default Category;
