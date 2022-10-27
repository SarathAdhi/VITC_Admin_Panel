import clsx from "clsx";
import Head from "next/head";
import React from "react";

export const PageWrapper = ({ title, className, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={clsx("w-full min-h-screen", className)}>{children}</main>
    </>
  );
};
