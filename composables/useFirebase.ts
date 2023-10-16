import { credential } from 'firebase-admin';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithRedirect, signOut, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';

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

export const redirectFromGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    getRedirectResult(auth)
    .then((result) => {
      console.log('Redirected sucesfully', result)
      return result
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


export const initUser = () => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log('Current user : ', user);
            resolve(user);
          } else {
            console.log('No user is currently logged in');
            resolve(null);
          }
        });
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