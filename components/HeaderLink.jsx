import React from "react";
import clsx from "clsx";

const HeaderLink = ({ Icon, text, avatar, feed, active, hidden }) => {
  return (
    <div
      className={clsx(
        "cursor-pointer flex flex-col justify-center items-center",
        {
          "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1": feed,
        },
        {
          "text-gray-500 hover:text-gray-700": !feed,
        },
        {
          "hidden md:flex": hidden,
        },
        { "!text-black dark:!text-white": active }
      )}
    >
      <Icon className={clsx(avatar && "!h-7 !w-7 lg:!-mb-1")} />
      <h4
        className={clsx("text-sm", {
          "hidden lg:flex justify-center w-full": feed,
        })}
      >
        {text}
      </h4>
      {active && (
        <span className="hidden lg:block h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full"></span>
      )}
    </div>
  );
};

export default HeaderLink;
