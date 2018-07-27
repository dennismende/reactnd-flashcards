import {
  FETCH_DECKS,
  CREATE_DECK,
  ADD_CART_TO_DECK,
} from './types';

export const fetchDecks = () => {
  return (dispatch, getState, api) => {
    return api.getDecks()
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
    return api.createDeck(deckTitle)
      .then(deck => dispatch(createDeckSuccess(deck)));
  }
}

const createDeckSuccess = (deck) => {
  return {
    type: CREATE_DECK,
    deck,
  };
}

export const addCartToDeck = (card, deck) => {
  return (dispatch, getState, api) => {
    return api.addCardToDeck(card, deck)
      .then((deck) => dispatch(addCartToDeckSuccess(deck)));
  }
}

const addCartToDeckSuccess = (deck) => {
  return {
    type: ADD_CART_TO_DECK,
    deck
  }
}
