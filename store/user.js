import { defineStore } from 'pinia'
import {
    CollectionReference,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    setDoc,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    onSnapshot
  } from "firebase/firestore";

export const useUserStore = defineStore('userStore', () => {
    const { $firestoreUser } = useNuxtApp();

    const loadGoogleUser = async () => {
        const googleUser = await $firestoreUser;
        return googleUser
    };

    const loadFirestoreCurrentLogedUser = async (googleUser) => {
            const { $db } = useNuxtApp();
            const q = query(collection($db, "users"), where("email", "==", googleUser.email));
            const querySnapshot = await getDocs(q);
            let desiredUser = {}
            querySnapshot.forEach((doc) => {
              const user = doc.data();
              desiredUser = {
                name: user.name,
                email: user.email,
                friends: user.friends,
                image: user.image
              }
            });
            return desiredUser
    };

  
  return { loadGoogleUser, loadFirestoreCurrentLogedUser }
})