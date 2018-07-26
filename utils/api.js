import { AsyncStorage } from 'react-native';
import { setupAppWithDeckResults, DECKS_STORAGE_KEY } from './flashcard-dummy-data';

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(setupAppWithDeckResults);
}

export const getDeck = () => {

}

export const createNewDeck = () => {

}

export const addCardToDeck = () => {

}
