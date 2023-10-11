<script setup>
import { signOut, onAuthStateChanged } from 'firebase/auth';
const { auth } = useFirebase();
console.log(auth)

const currentUser = ref()

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


</template>