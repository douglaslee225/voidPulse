import React from "react";
import { Kids } from "../../ui/FullScreenModalOverlay";

export const HeaderButton: Kids<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { disableHover?: boolean }
> = ({ children, className = "", disableHover = false, ...props }) => {
  return (
    <button
      className={`${
        disableHover ? "cursor-default" : "accent-hover"
      } w-full p-2 my-2 rounded-md flex items-center group justify-between text-primary-300 text-xs mono-body ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
