import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { green, white } from '../utils/colors';
import { createDeck as createDeckAction } from '../actions';

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Create new deck</Text>
    </TouchableOpacity>
  )
}

class NewDeck extends Component {
  state = {
    newDeckTitle: ''
  }

  navigateToDeckDetailView = (newDeckTitle) => {
    this.props.navigation.navigate('DeckDetail', {deckTitle: newDeckTitle});
  }

  resetComponentState = () => {
    this.setState({newDeckTitle: ''});
  }

  submit = () => {
    const { createDeck } = this.props;
    const { newDeckTitle } = this.state;

    createDeck(newDeckTitle);

    this.resetComponentState();

    this.navigateToDeckDetailView(newDeckTitle);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new deck title"
          autoFocus={true}
          onChangeText={(text) => this.setState({newDeckTitle: text})}
          value={this.state.newDeckTitle}
        />
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
};

function mapDispatchToProps (dispatch) {
  return {
    createDeck: (newDeckTitle) => dispatch(createDeckAction(newDeckTitle)),
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
    width: '60%'
  },
  iosSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 20,
    marginRight: 20
  },
  AndroidSubmitBtn: {
    backgroundColor: green,
    padding: 10,
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
});

export default connect(null, mapDispatchToProps)(NewDeck);
