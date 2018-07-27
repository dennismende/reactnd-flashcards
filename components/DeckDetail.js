import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { green, white } from '../utils/colors';
import { getDeckSelector } from '../selectors';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';

const AddCartBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Add Card</Text>
    </TouchableOpacity>
  )
}

const StartQuizBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Start Quiz</Text>
    </TouchableOpacity>
  )
}

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: deckTitle
    }
  }

  navigateToAddCardView = (deck) => {
    this.props.navigation.navigate('NewDeckCart', {deck});
  }

  navigateToStartQuizView = (deck) => {
    clearLocalNotification()
      .then(() => {
        setLocalNotification();
        this.props.navigation.navigate('DeckQuiz', {deck});
      });
  }

  render() {
    const { deck } = this.props;
    const amountOfQuestions = deck.questions.length;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{deck.title}</Text>
        <Text>{amountOfQuestions} Cards</Text>
        <AddCartBtn onPress={() => this.navigateToAddCardView(deck)} />
        {amountOfQuestions > 0 ? (
          <StartQuizBtn onPress={() => this.navigateToStartQuizView(deck)} />
        ) : (
          <Text style={styles.infoText}>This deck has no cards yet. Please create at least one before you can start a quiz.</Text>
        )}
      </View>
    );
  }
};

function mapStateToProps (state, ownProps) {
  const { deckTitle } = ownProps.navigation.state.params;

  return {
    deck: getDeckSelector(state, deckTitle),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20
  },
  header: {
    fontSize: 18,
    marginBottom: 10
  },
  iosSubmitBtn: {
    alignSelf: 'stretch',
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  },
  AndroidSubmitBtn: {
    alignSelf: 'stretch',
    backgroundColor: green,
    padding: 10,
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: 'center'
  },
  infoText: {
    marginTop: 10
  }
});

export default connect(mapStateToProps)(DeckDetail);
