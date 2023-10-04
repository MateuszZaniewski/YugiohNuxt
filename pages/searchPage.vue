<script setup lang="ts">
let clickedCard = ref();
const cardsPerPage = ref(12);

let fetchedCards = ref<Card[]>([]);

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

const attributes = useAttributes();
const monsterTypes = useMonsterTypes();
const cardRaces = useCardRaces();
const cardLevels = useCardLevels();
const sort = useSort();
const fname = useFnameParam();
const order = useSortMethod();
const maxLength = usePagesLength();
const currentPage = useCurrentPage();
const filtersExpanded = useFiltersOpen();
const innerWidth = ref(window.innerWidth);

let attr = ref(attributes.value);

const setAttribute = (card: any) => {
  return card.attribute === "DARK"
    ? "./Attributes/DARK.png"
    : card.attribute === "LIGHT"
    ? "./Attributes/LIGHT.png"
    : card.attribute === "EARTH"
    ? "./Attributes/EARTH.png"
    : card.attribute === "WATER"
    ? "./Attributes/WATER.png"
    : card.attribute === "FIRE"
    ? "./Attributes/FIRE.png"
    : card.attribute === "WIND"
    ? "./Attributes/WIND.png"
    : card.attribute === "DIVINE"
    ? "./Attributes/DIVINE.png"
    : card.type === "Spell Card"
    ? "./Attributes/SPELL.svg"
    : card.type === "Trap Card"
    ? "./Attributes/TRAP.svg"
    : "xD";
};

const setCardType = (card: any) => {
  return card.race === "Continuous"
    ? "./CardTypes/Continuous.png"
    : card.race === "Counter"
    ? "./CardTypes/Counter.png"
    : card.race === "Equip"
    ? "./CardTypes/Equip.png"
    : card.race === "Field"
    ? "./CardTypes/Field.png"
    : card.race === "Normal"
    ? "./CardTypes/Normal.png"
    : card.race === "Quick-Play"
    ? "./CardTypes/Quick-Play.png"
    : "./CardTypes/Ritual.png";
};

const visibleCards = computed(() => {
  maxLength.value = Math.ceil(fetchedCards.value.length / 12);
  const startIndex = (currentPage.value - 1) * cardsPerPage.value;
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
</script>

<template>
  <Navbar />

  <section
    class="searchBar w-[90%] mx-auto pt-5 flex items-center max-w-[730px]"
  >
    <div></div>
    <input
      v-model="fname"
      type="search"
      placeholder="Search"
      class="search border-2 h-11 w-[80%] mx-auto rounded-l-3xl rounded-bl-3xl pl-[10%] text-base border-[#2D61AF]"
    />
    <button
      @click="
        searchForCards(
          fname,
          attributes,
          cardLevels,
          cardRaces,
          monsterTypes,
          sort,
        )
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
      <span>{{ !filtersExpanded ? "Filers" : "Close" }}</span>

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
          <div class="flex gap-2 items-center">
            <NuxtImg
              :src="setAttribute(clickedCard)"
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
              :src="setCardType(clickedCard)"
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
        class="flex flex-wrap justify-center gap-6 mx-auto w-[90%] max-w-3xl lg:w-[50vw]"
      >
        <div
          v-for="card in visibleCards"
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
              class="h-[200px] w-[140px]"
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
      <div>
        <Pagination v-if="!filtersExpanded" />
      </div>
    </div>
  </div>

  <div
    class="flex justify-center"
    v-if="fetchedCards.length === 0 && !filtersExpanded"
  >
    <p>Tymczasowy tekst ładowania kart</p>
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
