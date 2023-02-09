import { db } from "./firebase";

 export const checkLiked = async (user:string, github_user_id:number)=> {
    const favoriteRef = db.collection(`/users`).doc(user);
    const userData = (await favoriteRef.get()).data()
    return userData?.githubUserId && userData?.githubUserId.findIndex((item: number) => item === github_user_id) != -1
}
