import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { getDeckSelector } from '../selectors';
import FlipCard from 'react-native-flip-card';
import { green, white, red, brown } from '../utils/colors';

const IncrementScoreBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, styles.correct] : [styles.AndroidSubmitBtn, styles.correct]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Correct</Text>
    </TouchableOpacity>
  )
}

const DecrementScoreBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, styles.incorrect] : [styles.AndroidSubmitBtn, styles.incorrect]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Incorrect</Text>
    </TouchableOpacity>
  )
}

const ShowAnswerBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={[styles.submitBtnText, styles.info]}>Show Answer</Text>
    </TouchableOpacity>
  )
}

const ShowQuestionBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={[styles.submitBtnText, styles.info]}>Show Question</Text>
    </TouchableOpacity>
  )
}

const RestartQuizButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, styles.correct] : [styles.AndroidSubmitBtn, styles.correct]}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Restart Quiz</Text>
    </TouchableOpacity>
  )
}

class DeckQuiz extends Component {
  state = {
    quizScoreCorrect: 0,
    quizScoreIncorrect: 0,
    cardPosition: 0,
    isAnswerOfSelectedCardVisible: false,
    areResultsVisible: false,
  }

  resetComponentState = () => {
    this.setState(() => ({
      quizScoreCorrect: 0,
      quizScoreIncorrect: 0,
      cardPosition: 0,
      isAnswerOfSelectedCardVisible: false,
      areResultsVisible: false,
    }));
  }

  componentWillUnmount() {
    this.resetComponentState();
  }

  updateCardPosition = () => {
    const { cardPosition } = this.state;
    const { deck } = this.props;
    const newCardPosition = (cardPosition < deck.questions.length) ? cardPosition + 1 : cardPosition;

    this.setState((state) => ({
      ...state,
      cardPosition: newCardPosition,
      areResultsVisible: cardPosition === (deck.questions.length - 1),
    }));
  }

  incrementScore = () => {
    const { quizScoreCorrect } = this.state;

    this.setState((state) => ({
      ...state,
      quizScoreCorrect: quizScoreCorrect + 1,
    }));

    this.updateCardPosition();
  }

  decrementScore = () => {
    const { quizScoreIncorrect } = this.state;

    this.setState((state) => ({
      ...state,
      quizScoreIncorrect: quizScoreIncorrect + 1,
    }));

    this.updateCardPosition();
  }

  restartQuiz = () => {
    this.resetComponentState();
  }

  flipCard = () => {
    const { isAnswerOfSelectedCardVisible } = this.state;

    this.setState((state) => ({
      ...state,
      isAnswerOfSelectedCardVisible: isAnswerOfSelectedCardVisible ? false : true
    }));
  }

  getCurrentCardOfDeck = (deck) => {
    const { cardPosition } = this.state;

    return deck.questions[cardPosition];
  }

  render() {
    const { deck } = this.props;
    const { areResultsVisible, quizScoreCorrect, cardPosition, isAnswerOfSelectedCardVisible } = this.state;
    const currentCard = this.getCurrentCardOfDeck(deck);
    const finalQuizScore = Math.ceil((quizScoreCorrect * 100) / deck.questions.length);

    return (
      <View style={styles.container}>
        {!areResultsVisible &&
          <Text>Card: {cardPosition + 1} / {deck.questions.length}</Text>
        }
        {areResultsVisible ? (
          <View>
            <Text style={styles.infoText}>Your Score</Text>
            <Text style={finalQuizScore > 50 ? [styles.score, styles.goodScore] : [styles.score, styles.badScore]}>{finalQuizScore}% correct</Text>
            <RestartQuizButton onPress={this.restartQuiz} />
          </View>
        ) : (
          <View style={styles.container}>
            <FlipCard
              style={styles.flipcard}
              friction={6}
              perspective={1000}
              flipHorizontal={true}
              flipVertical={false}
              flip={isAnswerOfSelectedCardVisible}
              clickable={false}
            >
              {/* Face Side */}
              <View style={styles.flipcardItem}>
                <Text style={styles.infoText}>Question</Text>
                <Text style={styles.infoText}>{currentCard.question}</Text>
              </View>
              {/* Back Side */}
              <View style={styles.flipcardItem}>
                <Text style={styles.infoText}>Answer</Text>
                <Text style={styles.infoText}>{currentCard.answer}</Text>
              </View>
            </FlipCard>
            {isAnswerOfSelectedCardVisible ? (
              <ShowQuestionBtn onPress={this.flipCard} />
            ) : (
              <ShowAnswerBtn onPress={this.flipCard} />
            )}
            <IncrementScoreBtn onPress={this.incrementScore} />
            <DecrementScoreBtn onPress={this.decrementScore} />
          </View>
        )}
      </View>
    );
  }
};

function mapStateToProps (state, ownProps) {
  const { deck } = ownProps.navigation.state.params;

  return {
    deck: getDeckSelector(state, deck.title),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  flipcard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderColor: white,
  },
  flipcardItem: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: white,
  },
  header: {
    fontSize: 18,
    marginBottom: 10
  },
  score: {
    color: green,
    fontSize: 26,
    alignSelf: 'center',
  },
  iosSubmitBtn: {
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  },
  AndroidSubmitBtn: {
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2
  },
  correct: {
    backgroundColor: green,
  },
  incorrect: {
    backgroundColor: red,
  },
  goodScore: {
    color: green
  },
  badScore: {
    color: red,
  },
  info: {
    color: brown,
    fontWeight: 'bold',
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  },
  infoText: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  }
});

export default connect(mapStateToProps)(DeckQuiz);
