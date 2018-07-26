import {
  FETCH_DECKS,
} from '../actions/types';

const decks = (state = {}, action) => {

  const { decks } = action;

  switch (action.type) {
    case FETCH_DECKS:
      return {
        ...state,
        decks,
      }

    default:
      return state
  }
}

export default decks;
