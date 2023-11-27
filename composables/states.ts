export const useAttributes = () =>
  useState<Array<String>>("arrtibutes", () => []);
export const useCardTypes = () =>
  useState<Array<String>>("cardTypes", () => []);
export const useMonsterTypes = () =>
  useState<Array<String>>("monsterTypes", () => []);
export const useCardRaces = () =>
  useState<Array<String>>("cardRaces", () => []);
export const useCardLevels = () => useState<Array<String>>("levels", () => []);
export const useSpellTypes = () => useState<Array<String>>("spells", () => []);
export const useTrapTypes = () => useState<Array<String>>("traps", () => []);
export const useFnameParam = () => useState<String>("fname", () => "");
export const useSort = () => useState<String>("sort", () => "Name");
export const useSortMethod = () =>
  useState<String>("sortMethod", () => "Ascending");

export const usePagesLength = () => useState<number>("maxlength", () => 1056);
export const useCurrentPage = () => useState<number>("currentPage", () => 1);
export const useFiltersOpen = () =>
  useState<boolean>("filtersOpen", () => false);

export const useFavs = () => useState<Boolean>("favourites", () => false);
export const logedIn = () => useState<Boolean>('logedin', () => false)
