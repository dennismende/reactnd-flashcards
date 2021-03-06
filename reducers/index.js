import {
  FETCH_DECKS,
  CREATE_DECK,
  ADD_CART_TO_DECK,
} from '../actions/types';

const decks = (state = {}, action) => {

  const { decks, deck } = action;

  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...state,
        decks,
      }

    case CREATE_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck.title]: deck
        }
      }

    case ADD_CART_TO_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [deck.title]: deck
        }
      }

    default:
      return state
  }
}

export default decks;
