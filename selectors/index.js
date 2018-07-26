import { createSelector } from 'reselect';

const getDecks = (state) => state['decks'] ? state['decks'] : {};

export const getDecksSelector = createSelector(
  getDecks,
  decks => Object.keys(decks).map(deckKey => {
    const deckObjectForKey = decks[deckKey];

    return {
      key: deckObjectForKey.title,
      amountOfQuestions: deckObjectForKey.questions.length
    }
  })
);

export default getDecksSelector;
