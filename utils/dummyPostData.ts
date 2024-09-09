import { PostData } from "./postData";

const globalPosts: PostData[] = [
    {
        title: "Min første post", 
        description: "Jeg har trua", 
        id: "p1", 
        hashtags: "#Kult! #fin", 
        author: "Bjørn"
    }
]

export const getPostById = (id: string) => {
    return globalPosts.find((post) => post.id === id);
}

export const getAllPosts = () => {
    return globalPosts;
}