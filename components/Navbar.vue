<script setup lang="ts">
import type { isNull } from "util";

const isOpen = ref(false);
const user = ref();

const links = [
  {
    label: "Home",
    to: "/",
    icon: "i-heroicons-home",
  },
  {
    label: "My Account",
    to: "/userProfile",
    icon: "i-heroicons-user-circle",
  },
  {
    label: "Search Cards",
    to: "/searchPage",
    icon: "i-heroicons-magnifying-glass-circle",
  },
  {
    label: "Deck Builder",
    to: "/deckBuilder",
    icon: "i-heroicons-puzzle-piece",
  },
  {
    label: "Favourites",
    to: "/favourites",
    icon: "i-heroicons-star",
  },
];

const secondLinks = [
  {
    label: "Login/SignIn",
    to: "/loginPage",
    icon: "i-heroicons-sparkles",
  },
];

onMounted(async () => {
  try {
    const data = await initUser();
    user.value = data;
    console.log(user.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <nav class="h-[15vw] bg-[#2D61AF] max-h-[80px] align-middle">
    <div
      class="max-w-7xl h-full flex pl-[5vw] md:pl-0 items-center md:justify-around md:gap-6 text-white mx-auto"
    >
      <NuxtLink
        to="/"
        class="text-2xl md:w-fit text-center cursor-pointer font-[yugioh] md:pl-4 lg:pl-0 md:text-left"
        >Yu-Gi-OH
      </NuxtLink>
      <div class="flex md:justify-between md:w-fit md:gap-6">
        <NuxtLink
          v-if="user"
          to="/userProfile"
          class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
          >My Account</NuxtLink
        >
        <NuxtLink
          class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
          to="/searchPage"
          >Search Cards</NuxtLink
        >
        <NuxtLink
          class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
          >Deck Builder</NuxtLink
        >
      </div>

      <div class="absolute right-[5vw]">
        <div>
          <NuxtImg
            src="/hamburger.png"
            class="w-6 h-6 md:hidden"
            @click="isOpen = true"
          />

          <div class="flex flex-col flex-1">
            <USlideover
              v-model="isOpen"
              :overlay="true"
              class="w-[50%] left-auto"
              :side="'right'"
            >
              <div class="pt-8 pl-4 flex">
                <UVerticalNavigation :links="links" class="flex flex-col gap-2">
                  <template #default="{ link }">
                    <div>
                      <span
                        class="group-hover:text-primary relative font-[yugioh]"
                        >{{ link.label }}</span
                      >
                    </div>
                  </template>
                </UVerticalNavigation>
              </div>
              <div class="pb-2 pl-4 mt-auto">
                <UVerticalNavigation
                  :links="secondLinks"
                  class="flex flex-col gap-2"
                >
                  <template #default="{ link }">
                    <div>
                      <span
                        class="group-hover:text-primary relative font-[yugioh]"
                        >{{ link.label }}</span
                      >
                    </div>
                  </template>
                </UVerticalNavigation>
              </div>
            </USlideover>
          </div>
        </div>
      </div>

      <div class="flex md:justify-around md:w-fit md:gap-6">
        <NuxtLink
          class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
          to="/favourites"
          >Favourites</NuxtLink
        >
        <NuxtLink
          v-if="!user"
          class="hidden md:block md:text-lg hover:text-[#9B59B6] cursor-pointer"
          to="/loginPage"
          >Login/SignIn</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>
