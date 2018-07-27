import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { green, white } from '../utils/colors';
import { addCartToDeck as addCartToDeckAction } from '../actions';
import { getDeckSelector } from '../selectors';

const AddCartToDeckBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Add Card</Text>
    </TouchableOpacity>
  )
}

class NewDeckCart extends Component {
  state = {
    question: '',
    answer: ''
  }

  resetComponentState = () => {
    this.setState({
      question: '',
      answer: ''
    });
  }

  navigateToDeckDetailView = (deck) => {
    this.props.navigation.navigate('DeckDetail', {deckTitle: deck.title});
  }

  submit = () => {
    const { addCartToDeck, deck } = this.props;
    const card = this.state;

    addCartToDeck(card, deck).then(() => {
      this.resetComponentState();
      this.navigateToDeckDetailView(deck);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behaviour="padding" enabled>
        <Text style={styles.header}>Question</Text>
        <TextInput
          style={styles.input}
          placeholder="Add question here"
          autoFocus={true}
          onChangeText={(text) => this.setState({...this.state, question: text })}
          value={this.state.question}
        />
        <Text style={styles.header}>Answer</Text>
        <TextInput
          style={styles.input}
          placeholder="Add answer here"
          autoFocus={false}
          onChangeText={(text) => this.setState({...this.state, answer: text })}
          value={this.state.answer}
        />
        <AddCartToDeckBtn onPress={this.submit}/>
      </KeyboardAvoidingView>
    );
  }
};

function mapStateToProps (state, ownProps) {
  const { deck } = ownProps.navigation.state.params;

  return {
    deck: getDeckSelector(state, deck.title),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addCartToDeck: (card, deck) => dispatch(addCartToDeckAction(card, deck)),
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
  input: {
    height: 70,
    fontSize: 18,
    marginBottom: 10,
    padding: 20,
    alignSelf: 'stretch',
    textAlign: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckCart);
