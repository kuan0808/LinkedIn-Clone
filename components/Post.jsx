import React, { useState } from "react";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { Avatar, IconButton } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

import { modalState, modalTypeState } from "../atoms/modalAtom";
import { getPostState } from "../atoms/postAtom";

const truncate = (str, length, ending = "...see more") =>
  str.length > length ? str.substr(0, length - 1) + ending : str;

const Post = ({ post, modalPost }) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);

  const [showFullInput, setShowFullInput] = useState(false);

  return (
    <div
      className={clsx(
        "bg-white dark:bg-[#1D2226] space-y-2 py-2.5 border border-gray-300 dark:border-none",
        {
          "rounded-r-lg": modalPost,
          "rounded-lg": !modalPost,
        }
      )}
    >
      <div className="flex items-center px-2.5 cursor-pointer">
        <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.username}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-80">{post.email}</p>
          {/* Timeage stamp */}
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>
      {post.input && (
        <div className="px-2.5 break-all md:break-normal">
          {modalPost || showFullInput ? (
            <p onClick={() => setShowFullInput(false)}>{post.input}</p>
          ) : (
            <p onClick={() => setShowFullInput(true)}>
              {truncate(post.input, 120)}
            </p>
          )}
        </div>
      )}

      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          alt=""
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(post);
          }}
        />
      )}
    </div>
  );
};

export default Post;
