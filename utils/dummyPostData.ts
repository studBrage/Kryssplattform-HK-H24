import { PostData } from "./postData";

let globalPosts: PostData[] = [
  {
    title: "Min første post",
    description: "Jeg har trua",
    id: "p1",
    hashtags: "#Kult! #fin",
    author: "Bjørn",
    isLiked: false,
    imageURL: "",
    postCoordinates: null,
  },
];

export const toggleLike = (id: string) => {
  const post = globalPosts.find((post) => post.id === id);
  if (post) {
    post.isLiked = !post.isLiked;
  }
};

export const getPostById = (id: string) => {
  return globalPosts.find((post) => post.id === id);
};

export const addNewPost = (post: PostData) => {
  globalPosts.unshift(post);
};

export const getAllPosts = () => {
  return globalPosts;
};
