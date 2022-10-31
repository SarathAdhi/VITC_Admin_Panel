import { LinkedItem } from "@elements/LinkedItem";
import { H6 } from "@elements/Text";
import {
  PresentationChartBarIcon,
  UserAddIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";
import React from "react";

export const LeftSideBar = ({ className }) => {
  return (
    <div
      // 48px is header size (h-12)
      className={clsx(
        "md:h-screen bg-[#222429] flex flex-col gap-5 py-6 px-4 md:px-8",
        className
      )}
    >
      <H6 className="text-gray-700">CORE LINKS</H6>

      <div className="grid gap-2">
        <LinkedItem
          href="/"
          className="text-gray-500 font-semibold text-xl flex items-center gap-2"
        >
          <PresentationChartBarIcon className="w-6 h-6" />
          Dashboard
        </LinkedItem>

        <LinkedItem
          href="/faculty/add"
          className="text-gray-500 font-semibold text-xl flex items-center gap-2"
        >
          <UserAddIcon className="w-6 h-6" />
          Add Faculty
        </LinkedItem>

        <LinkedItem
          href="/faculty/view"
          className="text-gray-500 font-semibold text-xl flex items-center gap-2"
        >
          <UserGroupIcon className="w-6 h-6" />
          Edit / View Faculty
        </LinkedItem>
      </div>
    </div>
  );
};
