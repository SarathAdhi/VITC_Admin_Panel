import { LinkedItem } from "@elements/LinkedItem";
import { H3, H4, H5 } from "@elements/Text";
import { appStore } from "@utils/store";
import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  BellIcon,
  ChevronDownIcon,
  MenuIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import clsx from "clsx";
import Image from "next/image";

const UserNavbar = () => (
  <>
    <LinkedItem href="/">
      <img src="/assets/vit-logo-white.png" className="w-52" />
    </LinkedItem>

    <H5 className="text-white">VIT Directory</H5>
  </>
);

const AdminNavbar = ({ setIsLeftSideBarOpen }) => {
  const router = useRouter();
  const { user, logout } = appStore();

  console.log(user);

  const { role, image } = user;

  return (
    <>
      <div className="flex items-center gap-5">
        <button onClick={() => setIsLeftSideBarOpen((pre) => !pre)}>
          <MenuIcon className="w-6 h-6 text-white" />
        </button>

        <H4 className="text-white !font-medium">VIT Directory | Admin</H4>
      </div>

      <div className="flex items-center gap-5">
        <LinkedItem href="#" className="flex relative p-2.5">
          <BellIcon className="w-5 h-5 text-white" />

          <span className="absolute top-0 right-0 text-sm bg-red-500 w-5 h-5 text-center text-white rounded-full">
            1
          </span>
        </LinkedItem>

        <Menu placement="bottom">
          <MenuButton as={"button"}>
            <div className="flex items-center gap-2 text-white">
              {image ? (
                <img src={user.image} className="w-8 h-8 rounded-full" />
              ) : (
                <UserIcon className="w-5 h-5" />
              )}

              <div className="flex">
                {role}
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            </div>
          </MenuButton>

          <MenuList className="!p-0" zIndex={999}>
            <MenuItem
              onClick={() => {
                logout();
                router.replace("/admin");
              }}
              className="font-medium text-lg"
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </>
  );
};

export const Navbar = ({ setIsLeftSideBarOpen }) => {
  const { isAuth } = appStore();

  return (
    <header
      className={clsx(
        "z-50 fixed w-full h-auto bg-[#004c93] p-1 flex flex-col justify-between md:flex-row items-center",
        !isAuth ? " md:h-auto" : "sm:px-4 md:h-12"
      )}
    >
      {!isAuth ? (
        <UserNavbar />
      ) : (
        <AdminNavbar setIsLeftSideBarOpen={setIsLeftSideBarOpen} />
      )}
    </header>
  );
};
