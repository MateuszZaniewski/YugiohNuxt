<script setup lang="ts">
let galleryActive = ref(true);
let filtersExpanded = ref(false);
let clickedCard = ref()

let fetchedCards = ref<Card[]>([]);

const makeCardDetails = (card:Object) => {
    clickedCard.value = card
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

let attr = ref(attributes.value);

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
        ),
          (filtersExpanded = false)
      "
      class="h-11 w-[20%] border-2 rounded-r-3xl rounded-br-3xl border-[#2D61AF] bg-[url('/glass.png')] bg-no-repeat bg-[#2D61AF] bg-center"
    ></button>
  </section>

  <div
    class="pt-5 w-[90%] mx-auto flex justify-between items-center max-w-[730px]"
  >
    <div
      class="flex justify-center w-fit border-2 rounded-3xl border-black py-1 px-5 gap-2"
    >
      <NuxtImg
        v-if="!filtersExpanded"
        src="/filter.png"
        height="20"
        width="20"
      />
      <span @click="filtersExpanded = !filtersExpanded">{{
        !filtersExpanded ? "Filers" : "Close"
      }}</span>

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

    <div v-if="!filtersExpanded">
      <div class="flex gap-5 items-center">
        <NuxtImg
          height="30"
          width="30"
          :src="galleryActive ? '/galleryActive.png' : '/galleryInactive.png'"
          @click="galleryActive = true"
        />
        <NuxtImg
          height="30"
          width="30"
          :src="galleryActive ? '/listInactive.png' : '/listActive.png'"
          @click="galleryActive = false"
        />
      </div>
    </div>
  </div>

  <Filters
    v-model="attr"
    :class="filtersExpanded ? 'flex' : 'hidden'"
    class="max-w-[730px]"
  />
  <div class="flex justify-center gap-5 pt-5">
    <div class="hidden lg:block lg:w-[30vw] border lg:ml-8" v-if="!filtersExpanded && clickedCard">
      <div class="flex flex-col w-[90%] mx-auto">
        <NuxtImg :src="clickedCard.card_images[0].image_url" class="max-w-[350px] max-h-[500px]" />
        <span>{{ clickedCard.name }}</span>
        <div v-if="clickedCard.attribute">
          <span>Attribute</span>
          <span>{{ clickedCard.attribute }}</span>
        </div>
        <div>
          <span>Card race</span>
          <span>{{ clickedCard.race }}</span>
        </div>
        <div>
          <span>Card Type</span>
          <span>{{ clickedCard.type }}</span>
        </div>
        <div v-if="clickedCard.level">
          <span>Level</span>
          <span>{{ clickedCard.level }}</span>
        </div>
        <div v-if="clickedCard.atk">
          <span>Attack</span>
          <span>{{ clickedCard.atk }}</span>
        </div>
        <div v-if="clickedCard.def">
          <span>Defence</span>
          <span>{{ clickedCard.def }}</span>
        </div>
        <div>
          {{ clickedCard.desc }}
        </div>
        
      </div>
    </div>
    <div
    v-if="fetchedCards.length > 0 && !filtersExpanded"
    class="flex flex-wrap gap-6 mx-auto w-[90%] max-w-3xl lg:w-[50vw]"
  >
    <div
      v-for="card in fetchedCards.slice(0, 12)"
      class="flex justify-center w-fit"
    >
      <NuxtImg
        :src="card.card_images[0].image_url"
        class="h-[200px] w-[140px]"
        @click="makeCardDetails(card)"
      />
    </div>
  </div>
  </div>
  

  <div v-if="fetchedCards.length === 0 && !filtersExpanded">
    <p>No card matching your query was found.</p>
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
