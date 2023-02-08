import { db } from "./firebase";

 export const checkLiked = async (user:string, github_user_id:number)=> {
    const favoriteRef = db.collection(`/users`).doc(user);
    const userData = (await favoriteRef.get()).data()
    console.log(userData);
    
    return userData?.githubUserId && userData?.githubUserId.findIndex((item: number) => item === github_user_id) != -1
}

checkLiked('123456', 25525592).then(response => console.log(response))