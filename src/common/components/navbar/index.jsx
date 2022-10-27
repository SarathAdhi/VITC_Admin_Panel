import React from "react";
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { LinkedItem } from "@components/LinkedItem";

export const Navbar = ({ breadcrumbItem = [] }) => {
  const isBreadcrumbItemEmpty = !breadcrumbItem.length === 0;

  return (
    <header className="w-full">
      <div className="h-10 bg-[#3a77a5]"></div>

      <div className="flex bg-[#373F6E]">
        <LinkedItem href="/">
          <img src="/assets/vitlogo.png" />
        </LinkedItem>

        <div></div>
      </div>

      {isBreadcrumbItemEmpty && (
        <Breadcrumb bgColor={"#c5383a"} color={"white"} p={2}>
          {breadcrumbItem.map(({ href, name }) => (
            <BreadcrumbItem key={name}>
              <LinkedItem href={href}>{name}</LinkedItem>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}
    </header>
  );
};
