import { AsyncStorage } from 'react-native';
import { setupAppWithDeckResults, DECKS_STORAGE_KEY } from './flashcard-dummy-data';

export const getDecks = () => {
  // AsyncStorage.clear();
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(setupAppWithDeckResults);
}

export const getDeck = () => {

}

export const createDeck = (deckTitle) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(decks => {
      const parsedDecks = JSON.parse(decks);
      parsedDecks[deckTitle] = { title: deckTitle, questions: [] };
      return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(parsedDecks))
        .then(() => {
          return parsedDecks[deckTitle];
        });
    });
}

export const addCardToDeck = (card, deck) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(decks => {
      const parsedDecks = JSON.parse(decks);
      parsedDecks[deck.title].questions = [...parsedDecks[deck.title].questions, card]
      return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(parsedDecks))
        .then(() => {
          return parsedDecks[deck.title];
        });
    });
}
