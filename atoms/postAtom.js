import { atom } from "recoil";

// This is to determine posts invalidation, true=>invalidate, false=>don't invalidate
export const handlePostState = atom({
  key: "handlePostState",
  default: false,
});

export const getPostState = atom({
  key: "getPostState",
  default: {},
});

export const useSSRPostsState = atom({
  key: "useSSRPostsState",
  default: true,
});
