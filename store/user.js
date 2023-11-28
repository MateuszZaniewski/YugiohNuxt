import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const currentUserEmail = ref("");

  function setUserEmail(payload) {
    currentUserEmail.value = payload;
  }

  return { setUserEmail, currentUserEmail };
});

// const loadFirestoreCurrentLogedUser = async (googleUser) => {
//         const { $db } = useNuxtApp();
//         if(googleUser){
//           const q = query(collection($db, "users"), where("email", "==", googleUser.email));
//           const querySnapshot = await getDocs(q);
//           let desiredUser = {}
//           querySnapshot.forEach((doc) => {
//             const user = doc.data();
//             desiredUser = {
//               name: user.name,
//               email: user.email,
//               friends: user.friends,
//               image: user.image
//             }
//           });
//           return desiredUser
//         }
// };

// const loadAllFirestoreUsers = async () => {
//   const { $db } = useNuxtApp();
//   const googleUser = await loadGoogleUser()
//   const currentUser = await loadFirestoreCurrentLogedUser(googleUser)
//   const q = query(collection($db, "users"));
//   const querySnapshot = await getDocs(q);
//   let allUsers = []
//   querySnapshot.forEach((doc) => {
//     const user = doc.data();
//     if(currentUser && user){
//       if(user.email !== currentUser.email){
//         allUsers.push({
//           name: user.name,
//           email: user.email,
//           friends: user.friends,
//           image: user.image
//         })
//       }
//     }

//   });
//   return allUsers
// }
