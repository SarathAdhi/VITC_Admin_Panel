import { LinkedItem } from "@elements/LinkedItem";
import { H6 } from "@elements/Text";
import {
  CheckCircleIcon,
  PresentationChartBarIcon,
  UserAddIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

const pages = [
  {
    name: "Dashboard",
    href: "/dashboard",
    Icon: PresentationChartBarIcon,
  },
  {
    name: "View Approvals",
    href: "/approvals",
    Icon: CheckCircleIcon,
  },
  {
    name: "Add Faculty",
    href: "/faculty/add",
    Icon: UserAddIcon,
  },
  {
    name: "Edit / View Faculty",
    href: "/faculty/view",
    Icon: UserGroupIcon,
  },
];

const SlideOver = ({ isLeftSideBarOpen, setIsLeftSideBarOpen }) => {
  return (
    <Drawer
      isOpen={isLeftSideBarOpen}
      placement="left"
      onClose={() => setIsLeftSideBarOpen(false)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton />
          <H6>CORE LINKS</H6>
        </DrawerHeader>

        <DrawerBody mt={5}>
          <div className="grid gap-5">
            {pages.map(({ name, href, Icon }) => (
              <LinkedItem
                key={name}
                href={href}
                className="text-gray-600 font-semibold text-xl flex items-center gap-2"
              >
                <Icon className="w-6 h-6" />
                {name}
              </LinkedItem>
            ))}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export const LeftSideBar = ({ isLeftSideBarOpen, setIsLeftSideBarOpen }) => {
  return (
    <SlideOver
      isLeftSideBarOpen={isLeftSideBarOpen}
      setIsLeftSideBarOpen={setIsLeftSideBarOpen}
    />
  );
};
