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
  onSnapshot,
  queryEqual
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
  const getDesiredUserData = async (email) => {
    try {
      const { $db } = useNuxtApp();
      const q = query(collection($db, "users"), where("email", "==", email));
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

  /// podziałać tutaj


  const grabUser = async (name) => {
    try {
      const { $db } = useNuxtApp();
      const q = query(collection($db, "users"), where("name", "==", name));
      const querySnapshot = await getDocs(q);
      let desiredUser = {}
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        desiredUser = {
          name : user.name,
          email : user.email,
          image : user.image,
          friends : user.friends
        }
});
    return desiredUser
    } catch (error) {
      console.log(error)
    }
  }

  const setNewUserAvatar = async (email, newAvatar) => {
    try {
      const { $db } = useNuxtApp();
      const userRef = doc($db, "users", email);

      await updateDoc(userRef, {
        image: newAvatar
      });

    } catch (error) {
      console.log(error)
    }
  }

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
  const fetchFriends = async (currentUserEmail) => {
    try {
      const userData = await getDesiredUserData(currentUserEmail)
      const displayedUser = userData
      const friendsArray = Object.values(displayedUser.friends)
      let result = []
      let friendsObject = {}
      for (const friend of friendsArray) {
        const userFriend = await getDesiredUserData(friend.email);
        result.push(friendsObject = {
          name: userFriend.name,
          email: userFriend.email,
          image: userFriend.image
        })
      }
      return result
    } catch (error) {
      console.log(error);
    }
  }


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

  const addFriend = async (email, friendEmail, friendName) => {
      try {
        const { $db } = useNuxtApp();
  
        const userRef = doc($db, "users", email);
  
  
        await updateDoc(userRef, {
          friends: arrayUnion({
            name: friendName,
            email : friendEmail
  
          }),
        });
  
        console.log("User", friendName, " added to your friend list");
      } catch (error) {
        console.log(error);
      }
    };
  
    const removeFriend = async (email, friendEmail, friendName) => {
      try {
        const { $db } = useNuxtApp();
  
        const userRef = doc($db, "users", email);
  
        await updateDoc(userRef, {
          friends: arrayRemove({
            email: friendEmail,
            name: friendName
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
    setNewUserAvatar,
    getFavouriteCards,
    addFavouriteCard,
    addUser,
    addFriend,
    removeFriend,
    fetchFriends,
    fetchAllUsers,
    getDesiredUserData,
    grabUser,
  };
};
