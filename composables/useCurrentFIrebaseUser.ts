import { getAuth, onAuthStateChanged } from "firebase/auth";

export default async function currentUser() {
    const auth = getAuth();
    try {
       onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log(user)
              return user
              // ...
            }
        });
    } catch (error) {
        console.log(error)
    }

    
    
}
