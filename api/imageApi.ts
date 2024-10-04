import { getStorageRef } from "@/firebaseConfig";
import { uploadBytes } from "firebase/storage";

export const uploadImageToFirebase = async (uri: string) => {
  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();

  const imagePath = uri.split("/").pop()?.split(".")[0] ?? "anonymtBilde";

  const uploadPath = `images/${imagePath}`;

  const imageRef = getStorageRef(uploadPath);
  console.log("Laster opp bilde til", imageRef);

  try {
    console.log("pls");
    await uploadBytes(imageRef, blob);
    console.log("Uploading image to", uploadPath);
  } catch (e) {
    console.error("error uploading image", e);
  }
};
