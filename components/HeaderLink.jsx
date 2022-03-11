import React from "react";
import clsx from "clsx";

const HeaderLink = ({ Icon, text, avatar, feed }) => {
  return (
    <div
      className={clsx(
        "cursor-pointer flex flex-col justify-center items-center",
        {
          "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1": feed,
        },
        {
          "text-gray-500 hover:text-gray-700": !feed,
        }
      )}
    >
      <Icon className={clsx(avatar && "!h-7 !w-7 lg:!-mb-1")} />
      <h4 className="text-sm">{text}</h4>
    </div>
  );
};

export default HeaderLink;
