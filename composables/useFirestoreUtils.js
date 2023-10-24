import { CollectionReference, collection, addDoc, getDocs, query, where, deleteDoc, setDoc, doc, getDoc } from "firebase/firestore";

export const useFirestoreUtils = () => {
  const getFavouriteCards = async (username) => {
    try {
      const { $db, $firestoreUser } = useNuxtApp();

      // MAKE THIS A USER AVAIBLE EVERYWHERE !!!!

      // const o = await $userek
      // console.log(o)

      ////
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

  const addFavouriteCard = async (card, username, image) => {

    try {
      const { $db } = useNuxtApp();
      const colRef = collection($db, 'favourites');
      const userCards = await getFavouriteCards(username)
      const setId = `${username}-${card}`

      const containsCard = (arr, cardValue) => {
        return arr.some(obj => obj.card === cardValue);
      };

      if(!containsCard(userCards, card)){
        await setDoc(doc($db, "favourites", setId), {
          author: username, 
          card: card,
          image: image
        });
        console.log('Card added')
      } else {
        const docRef = doc($db, 'favourites', setId);
        await deleteDoc(docRef);
        console.log('Card deleted')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return {
    getFavouriteCards,
    addFavouriteCard,
  };
};