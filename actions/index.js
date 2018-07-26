import {
  FETCH_DECKS,
  CREATE_DECK
} from './types';

export const fetchDecks = () => {
  return (dispatch, getState, api) => {
    api.getDecks()
      .then(decks => dispatch(fetchDecksSuccess(decks)));
  }
}

const fetchDecksSuccess = (decks) => {
  return {
    type: FETCH_DECKS,
    decks,
  };
}

export const createDeck = (deckTitle) => {
  return (dispatch, getState, api) => {
    api.createDeck(deckTitle)
      .then(deck => dispatch(createDeckSuccess(deck)));
  }
}

const createDeckSuccess = (deck) => {
  return {
    type: CREATE_DECK,
    deck,
  };
}
