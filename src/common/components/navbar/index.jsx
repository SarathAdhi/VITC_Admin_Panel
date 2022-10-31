import { LinkedItem } from "@elements/LinkedItem";
import { H3, H5 } from "@elements/Text";
import { appStore } from "@utils/store";
import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon, MenuIcon, UserIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import clsx from "clsx";

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
  const { logout } = appStore();

  return (
    <>
      <div className="flex items-center gap-2">
        <H3 className="text-white !font-medium">VIT Directory | Admin</H3>

        <button onClick={() => setIsLeftSideBarOpen((pre) => !pre)}>
          <MenuIcon className="w-5 h-5 text-white" />
        </button>
      </div>

      <Menu placement="bottom">
        <MenuButton as={"button"}>
          <div className="flex items-center gap-1 text-white">
            <UserIcon className="w-5 h-5" />
            Super Admin
            <ChevronDownIcon className="w-5 h-5" />
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
    </>
  );
};

export const Navbar = ({ setIsLeftSideBarOpen }) => {
  const { isAuth } = appStore();

  return (
    <header
      className={clsx(
        "z-50 md:absolute w-full h-auto bg-[#004c93] p-1 flex flex-col md:flex-row items-center",
        !isAuth ? "justify-around md:h-auto" : "sm:px-4 justify-between md:h-12"
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
