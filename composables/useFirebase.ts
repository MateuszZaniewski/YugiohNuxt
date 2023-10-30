import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithRedirect, signOut, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
const { addUser } = useFirestoreUtils()

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
        .then(result => {
          console.log('User Sign In')
        })
    .catch((error) => console.log(error))
    return credentials
}

export const redirectFromGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    getRedirectResult(auth)
    .then((result) => {
      if(result){
        console.log(result)
        addUser(result.user.displayName, result.user.email)
      }
      
  }).catch((error) => {
    console.log(error)
  });
}

export const initUser = () => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
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