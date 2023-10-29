import { CollectionReference, collection, addDoc, getDocs, query, where, deleteDoc, setDoc, doc, getDoc } from "firebase/firestore";

export const useFirestoreUtils = () => {
  const getFavouriteCards = async (username) => {
    try {
      const { $db} = useNuxtApp();

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

  const addUser = async(username,email) => {
    try {

      const { $db } = useNuxtApp();
      const setId = email

      const userRef = doc($db,'users',setId)
      const userSnap = await getDoc(userRef)

      if(userSnap.exists()){
        console.log('User already exists')
      } else {
        setDoc(doc($db, "users", setId), {
          name: username,
          friends: [],
          email: email
        });
        console.log('User added to DB')
      }
    } catch (error) {
      console.log(error)
    }
  };

  const fetchAllUsers = async(email, username) => {
    try {
      const { $db, $firestoreUser } = useNuxtApp();
      const user = await $firestoreUser

      const q = query(collection($db, "users"))
      const querySnapshot = await getDocs(q);
      const users = []
      querySnapshot.forEach((doc) => {
        // adding all users to the list (excluding current user)
        if(doc.id != user.email){
          users.push(doc.id)
        }
      });
      return users

    } catch (error) {
      console.log(error)
    }
  }

  return {
    getFavouriteCards,
    addFavouriteCard,
    addUser,
    fetchAllUsers,
  };
};