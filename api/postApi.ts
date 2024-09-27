import { PostData } from "@/utils/postData";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const createPost = async (post: PostData) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), post);
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.log("Error adding document", e);
  }
};

export const getAllPosts = async () => {
  const queryResult = await getDocs(collection(db, "posts"));
  return queryResult.docs.map((doc) => {
    console.log(doc.data());
    return { ...doc.data(), id: doc.id } as PostData;
  });
};

export const getPostById = async (id: string) => {
  const specificPost = await getDoc(doc(db, "posts", id));
  console.log("post by spesific id", specificPost.data());
  return {
    ...specificPost.data(),
    id: specificPost.id,
  } as PostData;
};
