import { AsyncStorage } from 'react-native';
import { setupAppWithDeckResults, FLASHCARDS_STORAGE_KEY } from './flashcard-dummy-data';

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(setupAppWithDeckResults);
}

export function getDeck() {

}

export function saveDeckTitle() {

}

export function addCardToDeck() {

}
