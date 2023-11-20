<script setup>

const { updateUsername } = useFirestoreUtils();

import { useUserStore } from '~/store/user'
const userStore = useUserStore();
const user = await userStore.loadGoogleUser()
const firestoreUser = await userStore.loadFirestoreCurrentLogedUser(user)
console.log(firestoreUser)



const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
const avatarsOpen = ref(false)
const newUsername = ref('');
const newAvatar = ref(props.user.image);


const avatars = [
    '/avatars/blueeyes.png',
    '/avatars/CreatorofLight.webp',
    '/avatars/darkmagician.png',
    '/avatars/darkMagicianGirl.png',
    '/avatars/kaiba.png',
    '/avatars/kuriboh.png',
    '/avatars/maiden.jpg',
    '/avatars/milleniumEye.png',
    '/avatars/milleniumKey.png',
    '/avatars/milleniumNeclace.png',
    '/avatars/milleniumPuzzle.png',
    '/avatars/milleniumRing.png',
    '/avatars/milleniumRod.png',
    '/avatars/milleniumScale.png',
    '/avatars/redEyes.webp',
    '/avatars/yugi.png'
];


</script>


<template>

<div>

    <div class="flex gap-2 pt-4">
        <span>Username : </span>
        <UInput :placeholder="props.user.name" v-model="newUsername" />
    </div>
    
    <div class="flex gap-2 pt-8">
        <span>Current avatar : </span>
        <NuxtImg :src="newAvatar" class=" h-14 w-14 border border-white rounded-full px-1 py-1 box-content" />
        <UButton @click="avatarsOpen = !avatarsOpen">Browse Avatars</UButton>
    </div>
    
    <div v-if="avatarsOpen" class="rounded-xl border border-blue-200 w-[90%] mt-4 py-4 px-4 mx-auto flex items-center flex-wrap bg-blue-100">
        <div v-for="avatar in avatars" :key="avatar" class="px-2 py-1">
            <NuxtImg :src="avatar" class=" h-14 w-14 border border-white" @click="newAvatar = avatar" >

            </NuxtImg>
        </div>
    </div>
    
    <UButton @click="updateUsername(props.user.email, newUsername)">Save</UButton>


</div>

</template>