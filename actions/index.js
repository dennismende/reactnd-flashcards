import {
  FETCH_DECKS
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
