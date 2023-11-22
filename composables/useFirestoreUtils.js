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

export const useFirestoreUtils = () => {
  // Functions that works 

  const addUser = async (username, email) => {
    try {
      const { $db } = useNuxtApp();
      const setId = email;

      const userRef = doc($db, "users", setId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log("User already exists");
      } else {
        setDoc(doc($db, "users", setId), {
          name: username,
          friends: [],
          email: email,
          image: '/userTemplate.jpg'
        });
        console.log("User added to DB");
      }
    } catch (error) {
      console.log(error);
    }
  };


const loadCurrentUser = async () => {
  const { $firestoreUser } = useNuxtApp();
  const googleUser = await $firestoreUser;
    return googleUser
};

const loadCurrentUserData = async (currentUserEmail) => {
  try {
    const { $db } = useNuxtApp();
    const q = query(collection($db, "users"), where("email", "==", currentUserEmail));
    const querySnapshot = await getDocs(q);
    let currentUserData = {}
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      currentUserData = {
        name: user.name,
        email: user.email,
        friends: user.friends,
        image: user.image
      }
    });
    return currentUserData
  } catch (error) {
    console.log(error)
  }
}

  // Fetch from DB an user that you want to display in [username].vue
  const getDesiredUserData = async (name) => {
    try {
      const { $db } = useNuxtApp();
      const q = query(collection($db, "users"), where("name", "==", name));
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
    } catch (error) {
      console.log(error)
    }
  };

  // Fetch all users from DB
  const fetchAllUsers = async (email) => {
    try {
      const { $db } = useNuxtApp();
      const q = query(collection($db, "users"));
      const querySnapshot = await getDocs(q);
      let allUsers = []
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if(email != user.email){
          allUsers.push({
            name: user.name,
            email: user.email,
            friends: user.friends,
            image: user.image
          })
        }
      });
      return allUsers
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch friends array from an active user
  const fetchFriends = async (email) => {
    try {
      const { $db } = useNuxtApp();
      const userRef = doc($db, "users", email);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const friendsArray = userData.friends;
        return friendsArray;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFavouriteCard = async (card, email, image) => {
    try {
      const { $db } = useNuxtApp();
      const colRef = collection($db, "favourites");
      const userCards = await getFavouriteCards(email);
      const setId = `${email}-${card}`;

      const containsCard = (arr, cardValue) => {
        return arr.some((obj) => obj.card === cardValue);
      };

      if (!containsCard(userCards, card)) {
        await setDoc(doc($db, "favourites", setId), {
          author: email,
          card: card,
          image: image,
        });
        console.log("Card added");
      } else {
        const docRef = doc($db, "favourites", setId);
        await deleteDoc(docRef);
        console.log("Card deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFavouriteCards = async (email) => {
    try {
      const { $db } = useNuxtApp();

      const colRef = collection($db, "favourites");
      const q = query(colRef, where("author", "==", email));

      const querySnapshot = await getDocs(q);
      let favs = [];
      querySnapshot.forEach((doc) => {
        favs.push({ ...doc.data(), id: doc.id });
      });
      return favs;
    } catch (error) {
      console.error("Error fetching favorite cards:", error);
      return [];
    }
  };




  /// Function that not work good 

  const addFriend = async (email, friendName, image) => {
      try {
        const { $db } = useNuxtApp();
  
        const userRef = doc($db, "users", email);
  
  
        await updateDoc(userRef, {
          friends: arrayUnion({
            name: friendName,
            image: image,
  
          }),
        });
  
        console.log("User", friendName, " added to your friend list");
      } catch (error) {
        console.log(error);
      }
    };
  
    const removeFriend = async (email, friendName, image) => {
      try {
        const { $db } = useNuxtApp();
  
        const userRef = doc($db, "users", email);
  
        await updateDoc(userRef, {
          friends: arrayRemove({
            name: friendName,
            image: image
          }),
        });
  
        console.log("User", friendName, " removed to your friend list");
      } catch (error) {
        console.log(error);
      }
    };















  return {
    loadCurrentUser,
    loadCurrentUserData,
    getFavouriteCards,
    addFavouriteCard,
    addUser,
    addFriend,
    removeFriend,
    fetchFriends,
    fetchAllUsers,
    getDesiredUserData,
  };
};
