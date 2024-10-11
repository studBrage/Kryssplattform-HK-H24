import { db } from "@/firebaseConfig";
import { CommentData } from "@/utils/postData";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

export const addComment = async (postId: string, comment: CommentData) => {
  try {
    const commentRef = await addDoc(collection(db, "comments"), comment);
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: arrayUnion(commentRef.id),
    });
    console.log("Added comment with id", commentRef.id);
    return commentRef.id;
  } catch (error) {
    console.log("Error adding comment", error);
  }
};
