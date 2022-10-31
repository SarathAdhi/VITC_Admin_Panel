import React, { useState } from "react";
import clsx from "clsx";
import { PageWrapper } from "./PageWrapper";
import { Navbar } from "@components/Navbar";
import { appStore } from "@utils/store";
import { LeftSideBar } from "@components/LeftSideBar";
import { Footer } from "@components/Footer";

export const PageLayout = ({ title = "", children, className = "" }) => {
  const { isAuth } = appStore();
  const [isLeftSideBarOpen, setIsLeftSideBarOpen] = useState(true);

  return (
    <PageWrapper title={title} className="flex flex-col items-center">
      <Navbar setIsLeftSideBarOpen={setIsLeftSideBarOpen} />

      <div
        className={clsx(
          "flex-1 w-full",
          isAuth && isLeftSideBarOpen
            ? "md:grid md:grid-cols-14"
            : "flex flex-col"
        )}
      >
        {/* pt-16 for topnavbar, till md its absolute */}
        {isAuth && isLeftSideBarOpen && (
          <LeftSideBar className="md:pt-16 z-40 md:sticky top-0 md:col-span-4 xl:col-span-3 " />
        )}

        {/* mt-12 for topnavbar, till md its absolute */}
        <div
          className={clsx(
            "w-full flex-1 flex flex-col gap-5 md:mt-12",
            isAuth && "col-span-10 xl:col-span-11"
          )}
        >
          <div className={clsx("w-full flex-1 p-4", className)}>{children}</div>

          {isAuth && <Footer />}
        </div>
      </div>
    </PageWrapper>
  );
};
