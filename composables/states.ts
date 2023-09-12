export const useCounter = () => useState<number>("counter", () => 0);
export const useColor = () => useState<string>('color', () => 'red')

export const useYugioh = () => useState<string>('yugioh', () => 'Yu-Gi-OH!')


export const useAttributes = () => useState<Array<String>>('arrtibutes', () => [])
export const useCardTypes = () => useState<Array<String>>('cardTypes', () => [])
export const useMonsterTypes = () => useState<Array<String>>('monsterTypes', () => [])
export const useCardRaces = () => useState<Array<String>>('cardRaces', () => [])
export const useCardLevels = () => useState<Array<String>>('levels', () => [])
export const useSpellTypes = () => useState<Array<String>>('spells', () => [])
export const useTrapTypes = () => useState<Array<String>>('traps', () => [])