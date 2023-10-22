import { CollectionReference, collection, addDoc, getDocs, query, where, deleteDoc, setDoc, doc, getDoc } from "firebase/firestore";

export const useFirestoreUtils = () => {
  const getFavouriteCards = async (username) => {
    try {
      const { $db } = useNuxtApp();

      const colRef = collection($db, 'favourites');
      const q = query(colRef, where('author', '==', username));

      const querySnapshot = await getDocs(q);
      let favs = [];
      querySnapshot.forEach((doc) => {
        favs.push({ ...doc.data(), id: doc.id });
      });
      return favs;
    } catch (error) {
      console.error('Error fetching favorite cards:', error);
      return [];
    }
  };

  const addFavouriteCard = async (card, username) => {

    try {
      const { $db } = useNuxtApp();
      const colRef = collection($db, 'favourites');

      const containsCard = (arr, cardValue) => {
        return arr.some(obj => obj.card === cardValue);
      };

      const userCards = await getFavouriteCards(username)

      if(!containsCard(userCards, card)){
        addDoc(colRef, {
          author: username, 
          card: card
        })
      }

    } catch (error) {
      console.log(error)
    }
  }  

  return {
    getFavouriteCards,
    addFavouriteCard
  };
};

// addDoc(colRef, {
//   author: username, 
//   card: card
// })