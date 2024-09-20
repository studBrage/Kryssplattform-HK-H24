import { LocationObjectCoords } from "expo-location";

export interface PostData {
  title: string;
  description: string;
  id: string;
  hashtags: string;
  author: string;
  isLiked: boolean;
  imageURL: string;
  postCoordinates: LocationObjectCoords | null;
}
