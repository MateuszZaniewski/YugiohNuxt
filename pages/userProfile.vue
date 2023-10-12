<script setup>
import { signOut, onAuthStateChanged } from 'firebase/auth';
const { auth } = useFirebase();

const currentUser = ref()

const logout = () => {
  signOut(auth).then(() => {
    navigateTo('/');
}).catch((error) => {
  // An error happened.
});
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser.value = user
    console.log(user.email)
  } else {
  }
});
});



</script>
<template>

    <span>User profile</span>

    <h1>Hello {{ currentUser ? currentUser.email : null }}</h1>

    <button @click="logout">Logout</button>


</template>