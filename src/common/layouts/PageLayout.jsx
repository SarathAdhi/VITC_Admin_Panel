import React from "react";
import clsx from "clsx";
import { PageWrapper } from "./PageWrapper";
import { Navbar } from "@elements/navbar";

export const PageLayout = ({
  title = "",
  children,
  className = "",
  LeftSideBar = null,
  breadcrumbItem = [],
}) => {
  return (
    <PageWrapper title={title} className="flex flex-col items-center">
      <Navbar breadcrumbItem={breadcrumbItem} />

      <div className="w-full max-w-[1440px] p-2 sm:p-5">
        <div className={LeftSideBar && "gap-5 md:grid md:grid-cols-14"}>
          {LeftSideBar && (
            <div className="z-40 sticky top-2 md:col-span-4 xl:col-span-3 ">
              {LeftSideBar}
            </div>
          )}

          <div
            className={clsx(
              "w-full",
              LeftSideBar && "col-span-10 xl:col-span-11",
              className
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
