<script setup>
const { loadCurrentUser, getDesiredUserData, setNewUserAvatar } =
  useFirestoreUtils();

const desiredUserFunction = async () => {
  try {
    const data = await loadCurrentUser(); // GoogleUser credentials
    user.value = data;

    const cup = await getDesiredUserData(user.value.email);
    displayedUser.value = cup;

    newAvatar.value = displayedUser.image;
  } catch (error) {
    console.log(error);
  }
};

const user = ref();
const displayedUser = ref();
const avatarsOpen = ref(false);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const newAvatar = ref();

const avatars = [
  "/avatars/blueeyes.png",
  "/avatars/CreatorofLight.webp",
  "/avatars/darkmagician.png",
  "/avatars/darkMagicianGirl.png",
  "/avatars/kaiba.png",
  "/avatars/kuriboh.png",
  "/avatars/maiden.jpg",
  "/avatars/milleniumEye.png",
  "/avatars/milleniumKey.png",
  "/avatars/milleniumNeclace.png",
  "/avatars/milleniumPuzzle.png",
  "/avatars/milleniumRing.png",
  "/avatars/milleniumRod.png",
  "/avatars/milleniumScale.png",
  "/avatars/redEyes.webp",
  "/avatars/yugi.png",
];

onMounted(async () => {
  await desiredUserFunction();
});
</script>

<template>
  <div v-if="displayedUser">
    <div class="flex gap-2 pt-8">
      <span>Current avatar : </span>
      <NuxtImg
        :src="displayedUser.image"
        class="h-14 w-14 border border-white rounded-full px-1 py-1 box-content"
      />
      <UButton @click="avatarsOpen = !avatarsOpen">Browse Avatars</UButton>
    </div>

    <div
      v-if="avatarsOpen"
      class="rounded-xl border border-blue-200 w-[90%] mt-4 py-4 px-4 mx-auto flex items-center flex-wrap bg-blue-100 dark:text-white dark:bg-[#202020]"
    >
      <div v-for="avatar in avatars" :key="avatar" class="px-2 py-1">
        <NuxtImg
          :src="avatar"
          class="h-14 w-14 border border-white"
          @click="displayedUser.image = avatar"
        >
        </NuxtImg>
      </div>
    </div>

    <UButton @click="setNewUserAvatar(displayedUser.email, displayedUser.image)"
      >Save</UButton
    >
  </div>
</template>
