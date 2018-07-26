import { createSelector } from 'reselect';

const getDecks = (state) => state['decks'] ? state['decks'] : {};
const getDeckKey = (state, props) => props;

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

export const getDeckSelector = createSelector(
  [getDecks, getDeckKey],
  (decks, deckKey) => decks[deckKey]
)
