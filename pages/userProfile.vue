<script setup>
const {
  getFavouriteCards,
  addFriend,
  removeFriend,
  fetchFriends,
  fetchAllUsers,
} = useFirestoreUtils();
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import SelectButton from "primevue/selectbutton";
import Dropdown from 'primevue/dropdown';

const fetchedFavouriteCards = ref([]);
const { $firestoreUser } = useNuxtApp();
const user = await $firestoreUser;
const allUsers = ref([]);
const friendsActive = ref(true);
const friendUsers = ref([]);
const i = ref(Number);
const numberOfFavCards = ref(Number);
const favouriteCards = ref([]);
const columns = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'button', header: 'Friend' },
];


const fetchFavoriteCards = async () => {
  try {
    const favorites = await getFavouriteCards(user.email);
    fetchedFavouriteCards.value = favorites;
    console.log(fetchedFavouriteCards.value);
    numberOfFavCards.value = fetchedFavouriteCards.value.length;
  } catch (error) {
    console.error(error);
  }
};

const fetchUsers = async () => {
  try {
    const users = await fetchAllUsers(user.email, user.displayName);
    allUsers.value = users;
    console.log(allUsers);
  } catch (error) {
    console.log(error);
  }
};

const fetchFriend = async () => {
  try {
    const friends = await fetchFriends(user.email);
    friendUsers.value = friends;
    i.value = friendUsers.value.length;
  } catch (error) {
    console.log(error);
  }
};

const addUserToFriend = async (userId, friendName) => {
  try {
    await addFriend(userId, friendName);
    await fetchFriend();
  } catch (error) {
    console.log(error);
  }
};

const removeUserFromFriends = async (userId, friendName) => {
  try {
    await removeFriend(userId, friendName);
    await fetchFriend();
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  fetchFavoriteCards();
  fetchUsers();
  fetchFriend();
  console.log(friendUsers.value);
});

const activeBox = ref("favourites");

// here will be a database query to retrive a favourite cards, decks, friends and settings of desired user
const favourites = [
  "Dark Magician Girl",
  "Dark Magician",
  "Blue-Eyes White Dragon",
  "Monster Reborn",
  "Evenly Matched",
];
const decks = [
  "Dark Magicians",
  "Ultimate Blue Eyes Deck",
  "Melffys Combo Deck",
];
</script>

<template>
  <NuxtImg
    @click="$router.go(-1)"
    src="/backArrowBlack.png"
    height="30px"
    width="30px"
    class="mt-8 ml-8"
  />

  <section v-if="user" class="max-w-3xl mx-auto">
    <div class="flex justify-end pr-10">
      <NuxtImg
        :src="user.photoURL ? user.photoURL : '/userTemplate.jpg'"
        height="60px"
        width="60px"
        class="rounded-full"
      />
    </div>
    <div class="flex justify-end pr-10 pt-3">
      <div>
        <span class="text-xl">{{ user.displayName }}</span>
      </div>
    </div>
  </section>

  <section class="flex justify-around py-8 max-w-xl mx-auto">
    <div>
      <div @click="activeBox = 'favourites'">
        <Button
          icon="pi pi-heart"
          severity="danger"
          rounded
          size="large"
          aria-label="Favorite"
        />
      </div>
    </div>
    <div>
      <div @click="activeBox = 'decks'">
        <Button
          icon="pi pi-mobile"
          severity="info"
          rounded
          size="large"
          aria-label="Decks"
        />
      </div>
    </div>

    <div>
      <div @click="activeBox = 'friends'">
        <Button
          icon="pi pi-users"
          severity="warning"
          rounded
          size="large"
          aria-label="Friends"
        />
      </div>
    </div>
    <div>
      <div @click="activeBox = 'settings'">
        <Button
          icon="pi pi-cog"
          severity="secondary"
          rounded
          size="large"
          aria-label="Settings"
        />
      </div>
    </div>
  </section>

  <section
    v-if="activeBox === 'favourites'"
    class="favourites max-w-2xl mx-auto"
  >
    <div class="w-[90%] mx-auto">
      <DataTable
        :value="fetchedFavouriteCards"
        scrollable
        scrollHeight="50vh"
        paginator
        :rows="10"
        class="w-full"
      >
        <Column field="card" header="Name">
          <template #body="slotProps">
            <NuxtLink
              :to="`card/${slotProps.data.card}`"
              class="cursor-pointer"
            >
              <span>{{ slotProps.data.card }}</span>
            </NuxtLink>
          </template>
        </Column>
        <Column header="image">
          <template #body="slotProps">
            <NuxtLink
              :to="`card/${slotProps.data.card}`"
              class="cursor-pointer"
            >
              <img :src="slotProps.data.image" class="h-[100px] w-[70px]" />
            </NuxtLink>
          </template>
        </Column>
      </DataTable>
    </div>
      
  </section>

  <section v-if="activeBox === 'decks'" class="decks max-w-2xl mx-auto">
    <div class="flex flex-col gap-5 w-[90%] mx-auto">
      <div
        v-for="deck in decks"
        :key="deck"
        class="px-4 py-2 bg-[#cbd5e1] rounded-xl flex justify-between gap-6"
      >
        <div class="w-[50%]">
          <span class="text-xl">{{ deck }}</span>
        </div>
        <div class="w-[50%] flex items-center justify-between">
          <NuxtImg src="/user/edit.svg" height="25px" width="25px" />
          <NuxtImg src="/user/share.svg" height="25px" width="25px" />
          <NuxtImg src="/user/goto.svg" height="25px" width="25px" />
        </div>
      </div>
    </div>
  </section>

  <section v-if="activeBox === 'friends'" class="friends max-w-2xl mx-auto">
    <div class="flex w-[90%] mx-auto justify-around">
      <div
        class="w-[50%] text-center rounded-t-xl"
        :class="friendsActive ? 'bg-[#d4d4d4]' : 'bg-none'"
        @click="friendsActive = true"
      >
        <Button
          label="Friends"
          severity="info"
          :badge="i"
          badgeClass="p-badge-info"
          aria-label="Friends"
          class="w-full"
        />
      </div>
      <div
        class="w-[50%] text-center rounded-t-xl"
        :class="!friendsActive ? 'bg-[#d4d4d4]' : 'bg-none'"
        @click="friendsActive = false"
      >
        <Button
          label="All users"
          severity="secondary"
          aria-label="All users"
          class="w-full"
        />
      </div>
    </div>

    <div v-if="!friendsActive" class="w-[90%] mx-auto pb-2 bg-[#d4d4d4]">

      <DataView :value="allUsers">
        <template #list="slotProps">
            <!-- work here  -->
                <div class="flex p-4 gap-4 w-full justify-around">
                            <div>{{ slotProps.data.name }}</div>
                            <span>{{ slotProps.data.email }}</span>
                            <Button @click="friendUsers.includes(slotProps.data.name) ? addUserToFriend(user.email, slotProps.data.name) : removeUserFromFriends(user.email, slotProps.data.name)" :icon="friendUsers.includes(slotProps.data.name) ? 'pi-heart' : 'pi-heart-fill'" rounded ></Button>
                </div>
            
        </template>
      </DataView>

      <!-- <div class="flex flex-col justify-center gap-5 w-[90%] mx-auto">
        <div
          v-for="friend in allUsers"
          :key="friend"
          class="flex flex-row justify-between pt-2 items-center text-center"
        >
          <div class="flex justify-center items-center">
            <div class="px-4 py-2 bg-[#cbd5e1] rounded-xl h-fit">
              <NuxtLink :to="`user/${user}`" class="">
                <NuxtImg src="/userTemplate.jpg" height="50px" width="50px" />
              </NuxtLink>
            </div>
            <span>{{ friend }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <span
              v-if="!friendUsers.includes(friend)"
              @click="addUserToFriend(user.email, friend)"
              >Add Friend</span
            >
            <span
              v-if="friendUsers.includes(friend)"
              @click="removeUserFromFriends(user.email, friend)"
              >Remove</span
            >
          </div>
        </div>
      </div> -->
    </div>

    <div v-if="friendsActive" class="w-[90%] mx-auto pb-2 bg-[#d4d4d4]">
      <!-- <div class="flex flex-row flex-wrap justify-center gap-5 w-[90%] mx-auto">
        <div
          v-for="friend in friendUsers"
          :key="friend"
          class="flex flex-row items-center text-center"
        >
          <NuxtLink
            :to="`user/${user}`"
            class="flex justify-center flex-col items-center"
          >
            <div class="px-4 py-2 bg-[#cbd5e1] rounded-xl w-28 h-fit">
              <NuxtImg src="/userTemplate.jpg" />
            </div>
            <span>{{ friend }}</span>
          </NuxtLink>
        </div>
      </div> -->
    </div>
  </section>

  <section v-if="activeBox === 'settings'" class="settings max-w-2xl mx-auto">
    <div>
      <div class="w-[90%] mx-auto">
        <div class="flex justify-between">
          <button class="px-4 py-2 bg-[#2D61AF] rounded-xl text-white mb-5">
            Save changes
          </button>
          <button
            @click="logoutUser()"
            class="px-4 py-2 bg-[#cbd5e1] rounded-xl text-white mb-5"
          >
            Logout
          </button>
        </div>

        <div class="flex flex-col">
          <label>Username</label>
          <input
            placeholder="user1234"
            class="border rounded-lg border-black px-3 py-2 mb-4 placeholder:text-gray-600"
          />
        </div>
        <div class="flex flex-col">
          <label>Email</label>
          <input
            placeholder="user1234@gmail.com"
            class="border rounded-lg border-black px-3 py-2 mb-4 placeholder:text-gray-600"
          />
        </div>
        <div class="flex flex-col">
          <label>Password</label>
          <input
            placeholder="123456"
            class="border rounded-lg border-black px-3 py-2 mb-4 placeholder:text-gray-600"
          />
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>

.ui-dropdown {
  width: 10px;
  height: 10px;
  border: 1px solid red;
}

</style>