import { ref, Ref, onMounted } from "vue";

interface Card {
  id: string;
  name: string;
  card_images: {
    image_url: string;
  }[];
}

export interface CardSearchOptions {
  name: Ref<string>;
  attributes: Array<String>;
  levels: Array<String>;
  races: Array<String>;
  types: Array<String>;
  sort: Ref<string>;
}

export function useCardSearch(options: CardSearchOptions) {
  const fetchedCards = ref<Card[]>([]);

  async function searchForCards() {
    try {
      const apiFetch = await connectToYugiohApi(
        options.name.value,
        options.attributes,
        options.levels,
        options.races,
        options.types,
        options.sort.value,
      );
      fetchedCards.value = apiFetch;
    } catch (error) {
      console.log(error);
    }
  }

  onMounted(() => {
    searchForCards();
  });

  return {
    fetchedCards,
    searchForCards,
  };
}
