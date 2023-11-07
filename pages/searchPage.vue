<script setup lang="ts">
let clickedCard = ref();

const { $firestoreUser } = useNuxtApp();
const user = await $firestoreUser

const page = ref(1)
const cardsPerPage = ref(12);
const pageCount = computed(() => Math.ceil(fetchedCards.value.length / cardsPerPage.value));
let fetchedCards = ref<Card[]>([]);
let allCardsForHints = {}
// Wartość allCardsForHints powinna być stała, nie zmieniać się po wciśnięciu szukania np:
// if(allCardsForHitns === undefined) {
  // nadać jej wartość kart, a gdy już ma jakąś wartość to zostawić ją w spokoju
//}

const makeCardDetails = (card: Object) => {
  clickedCard.value = card;
};

interface Card {
  id: string;
  name: string;
  card_images: {
    image_url: string;
  }[];
}
const { useSetAttribute, useSetCardType } = useUtils()
const attributes = useAttributes();
const monsterTypes = useMonsterTypes();
const cardRaces = useCardRaces();
const cardLevels = useCardLevels();
const sort = useSort();
const fname = useFnameParam();
const order = useSortMethod();
const currentPage = useCurrentPage();
const filtersExpanded = useFiltersOpen();
const innerWidth = ref(window.innerWidth);
const fav = useFavs()

let attr = ref(attributes.value);

const visibleCards = computed(() => {
  const startIndex = (page.value - 1) * cardsPerPage.value;
  const endIndex = startIndex + cardsPerPage.value;
  return fetchedCards.value.slice(startIndex, endIndex);
});

const searchForCards = async (
  name: String,
  attribute: Array<String>,
  level: Array<String>,
  race: Array<String>,
  type: Array<String>,
  sort: String,
) => {
  try {
    const apiFetch = await connectToYugiohApi(
      name,
      attribute,
      level,
      race,
      type,
      sort,
    );
    if (apiFetch) {
      fetchedCards.value = apiFetch;

      if (order.value === "Descending") {
        fetchedCards.value = fetchedCards.value.reverse();
        
      } else {
        fetchedCards.value = fetchedCards.value;
        
      }
      console.log(fetchedCards.value);
    } else {
      // Handle the case when no cards are found
      fetchedCards.value = [];
      console.log("No cards found.");
    }
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(error);
    fetchedCards.value = [];
  }
};

onMounted(() => {
    searchForCards(
    fname.value,
    attributes.value,
    cardLevels.value,
    cardRaces.value,
    monsterTypes.value,
    sort.value,
  );
});

watch(
  () => fname.value,
  (newValue) => {
    currentPage.value = 1;
  },
);

let showHints = false;

const filteredCards = computed(() => {
  return fetchedCards.value.filter((card) =>
    card.name.toLowerCase().startsWith(fname.value.toLowerCase())
  );
});

</script>

<template>
  <Navbar />

  <section
    class="searchBar w-[90%] mx-auto pt-5 flex items-center max-w-[730px]"
  >

    
    <input
      v-model="fname"
      type="search"
      placeholder="Search"
      class="search border-2 h-11 w-[80%] mx-auto rounded-l-3xl rounded-bl-3xl pl-[10%] text-base border-[#2D61AF]"
      list="hints"
      @focus="showHints = true"
      @blur="showHints = false"
    />

    <datalist v-if="showHints" id="hints">
      <option v-for="card in fetchedCards" :key="card.name" :value="card.name"></option>
    </datalist>
    
    <button
      @click="
        searchForCards(
          fname,
          attributes,
          cardLevels,
          cardRaces,
          monsterTypes,
          sort,
        ), filtersExpanded = false
      "
      class="h-11 w-[20%] border-2 rounded-r-3xl rounded-br-3xl border-[#2D61AF] bg-[url('/glass.png')] bg-no-repeat bg-[#2D61AF] bg-center"
    ></button>
  </section>

  <div
    class="pt-5 w-[90%] mx-auto flex justify-between items-center max-w-[730px]"
  >
    <div
      @click="filtersExpanded = !filtersExpanded"
      class="flex justify-center w-fit border-2 rounded-3xl border-black py-1 px-5 gap-2 cursor-pointer"
    >
      <NuxtImg
        v-if="!filtersExpanded"
        src="/filter.png"
        height="20"
        width="20"
      />
      <span>{{ !filtersExpanded ? "Filters" : "Close" }}</span>

      <span
        v-if="
          !filtersExpanded &&
          monsterTypes.length +
            attributes.length +
            cardRaces.length +
            cardLevels.length !=
            0
        "
        >{{
          monsterTypes.length +
          attributes.length +
          cardRaces.length +
          cardLevels.length
        }}</span
      >
    </div>
  </div>

  <Filters
    v-model="attr"
    :class="filtersExpanded ? 'flex' : 'hidden'"
    class="max-w-[730px]"
  />
  <div class="flex gap-5 pt-5 lg:max-w-[1400px] mx-auto justify-center">
    <div
      class="hidden lg:block lg:w-[30vw] lg:max-h-[700px] border lg:ml-8 overflow-scroll"
      v-if="!filtersExpanded && clickedCard"
    >
      <div class="flex flex-col w-[90%] mx-auto">
        <NuxtImg
          :src="clickedCard.card_images[0].image_url"
          class="max-w-[350px] max-h-[500px] pt-4"
        />
        <span class="text-2xl text-center pt-2">{{ clickedCard.name }}</span>

        <div class="flex justify-center items-center gap-5 pt-4">
          <div class="flex gap-4">
                  <NuxtImg @click="fav = !fav" :src='fav ? "/fullHeart.png" : "/emptyHeart.png"' height="30px" width="30px" alt="Add to favourites"/>
                  <NuxtImg src="/add.png" height="30px" width="30px" alt="Add to deck" />
          </div>
          <div class="flex gap-2 items-center">
            <NuxtImg
              :src="useSetAttribute(clickedCard)"
              height="30px"
              width="30px"
            />
            <span v-if="clickedCard.attribute">{{
              clickedCard.attribute
            }}</span>
            <span v-else>{{ clickedCard.type }}</span>
          </div>
          <div v-if="clickedCard.level" class="flex gap-2 items-center">
            <NuxtImg src="/level.webp" height="30px" width="30px" />
            <span>{{ clickedCard.level }}</span>
          </div>
          <div v-if="!clickedCard.level" class="flex gap-2 items-center">
            <NuxtImg
              :src="useSetCardType(clickedCard)"
              height="30px"
              width="30px"
            />
            <span>{{ clickedCard.race }}</span>
          </div>
          
        </div>

        <div v-if="clickedCard.atk >= 0" class="pt-2">
          <!-- [ Beast / Effect / Tuner ] -->
          <span class="font-bold">
            [<span>{{ clickedCard.race }} </span>
            <span v-if="clickedCard.type != 'Normal Monster'"
              >/ {{ clickedCard.type }}</span
            >]</span
          >
        </div>

        <div class="pt-2 pb-4">
          <p>{{ clickedCard.desc }}</p>
        </div>

        <div v-if="clickedCard.atk >= 0" class="flex gap-4 pb-4">
          <div class="flex gap-1">
            <span class="font-bold">ATK/</span>
            <span>{{ clickedCard.atk }}</span>
          </div>
          <div class="flex gap-1">
            <span class="font-bold">DEF/</span>
            <span>{{ clickedCard.def }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-if="visibleCards.length > 0 && !filtersExpanded"
        class="flex flex-wrap justify-center gap-3 mx-auto w-[90%] max-w-3xl lg:w-[50vw] px-2 py-2 border border-gray-300 rounded-xl"
      >
        <div
          v-for="card in visibleCards" :key="card.id"
          class="justify-center w-fit mx-auto"
          :class="innerWidth <= 1024 ? 'flex' : 'hidden'"
        >
          <NuxtLink
            :src="card.card_images[0].image_url"
            class="h-[200px] w-[140px]"
            :to="`card/${card.name}`"
          >
            <!-- rework this :class to hide it -->
            <NuxtImg
              :src="card.card_images[0].image_url"
              class="h-[200px] w-[140px] rounded-md"
              @click="makeCardDetails(card)"
            />
          </NuxtLink>
        </div>

        <div
          v-for="card in visibleCards"
          class="justify-center w-fit mx-auto"
          :class="innerWidth > 1024 ? 'flex' : 'hidden'"
        >
          <NuxtLink
            :src="card.card_images[0].image_url"
            class="h-[200px] w-[140px]"
          >
            <!-- rework this :class to hide it -->
            <NuxtImg
              :src="card.card_images[0].image_url"
              class="h-[200px] w-[140px]"
              @click="makeCardDetails(card)"
            />
          </NuxtLink>
        </div>
      </div>
      <div class="flex justify-center pt-4">
        <UPagination v-model="page" :page-count="12" :total="fetchedCards.length" show-first show-last show-firs size="xs" :active-button="{ variant: 'solid' }"
        :inactive-button="{ color: 'gray' }"
        class="flex gap-1">
        </UPagination>
      </div>
    </div>
  </div>



</template>

<style scoped>
.glass {
  background-image: url("../public/glass.png");
}

input::-webkit-search-cancel-button {
  padding-right: 10%;
}
</style>