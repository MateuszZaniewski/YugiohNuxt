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


// export const reditect = () => {
//   // Result from Redirect auth flow.
// getRedirectResult(auth)
// .then(function (result) {
//   if (!result) return;
//   const credential = GoogleAuthProvider.credentialFromResult(result);
//   if (credential) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const token = credential?.accessToken;
//     oauthToken.textContent = token ?? '';
//   } else {
//     oauthToken.textContent = 'null';
//   }
//   // The signed-in user info.
//   const user = result.user;
// })
// .catch(function (error) {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   const credential = error.credential;
//   if (errorCode === 'auth/account-exists-with-different-credential') {
//     alert(
//       'You have already signed up with a different auth provider for that email.',
//     );
//     // If you are using multiple auth providers on your app you should handle linking
//     // the user's accounts here.
//   } else {
//     console.error(error);
//   }
// });
// }


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