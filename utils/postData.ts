import { LocationObjectCoords } from "expo-location";

export interface PostData {
  title: string;
  description: string;
  id: string;
  hashtags: string;
  author: string;
  isLiked: boolean;
  likes: string[];
  imageURL: string;
  postCoordinates: LocationObjectCoords | null;
  comments: string[];
}

export interface CommentObject {
  id: string;
  comment: CommentData;
}

export interface CommentData {
  authorId: string;
  authorName: string;
  comment: string;
}
