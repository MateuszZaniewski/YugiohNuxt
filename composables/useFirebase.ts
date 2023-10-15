import { credential } from 'firebase-admin';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithRedirect, signOut, GoogleAuthProvider } from 'firebase/auth';

export const createUser = async (email:string, password:string) => {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    .catch((error) => console.log(error))
    return credentials
};

export const signInUser = async (email:string, password:string) => {
    const auth = getAuth();
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        .catch((error) => console.log(error))
    return credentials
};

export const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
        const credentials = await signInWithRedirect(auth, provider)
    .catch((error) => console.log(error))
    return credentials
}


export const initUser = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Current user : ',user)
        } else {
            console.log('Current user : ',user)
        } 
      });
};


export const logoutUser = async () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        navigateTo('/');
    }).catch((error) => {
      // An error happened.
    });
}