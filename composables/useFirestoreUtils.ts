import { CollectionReference, collection, addDoc, getDocs, query, where, deleteDoc, setDoc, doc, getDoc } from "firebase/firestore";

export const useFirestoreUtils = () => {
  const getFavouriteCards = async (username: string) => {
    try {
      const { $db } = useNuxtApp();

      const colRef = collection($db, 'favourites');
      const q = query(colRef, where('author', '==', username));

      const querySnapshot = await getDocs(q);
      let favs: Array<Object> = [];
      querySnapshot.forEach((doc) => {
        favs.push({ ...doc.data(), id: doc.id });
      });
      return favs;
    } catch (error) {
      console.error('Error fetching favorite cards:', error);
      return [];
    }
  };

  return {
    getFavouriteCards,
  };
};