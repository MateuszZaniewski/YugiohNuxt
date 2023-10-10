import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const useCreateUser = async (firebase:any, email: string, password: string) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error)
      // Handle the error
    }
  };