import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchDecks as fetchDecksAction } from '../actions';
import { getDecksSelector } from '../selectors';
import { green, white } from '../utils/colors';

class DeckOverview extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log('entryId', navigation.state.params);

    return {
      title: 'test'
    }
  }

  _renderItem = ({item}) => (
    <View style={styles.tile}>
      <Text style={styles.tileText}>{item.key}</Text>
      <Text>{item.amountOfQuestions} Cards</Text>
    </View>
  )

  componentDidMount() {
    const { fetchDecks } = this.props;

    fetchDecks();
  }

  render() {
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
};

function mapStateToProps (state) {
  return {
    decks: getDecksSelector(state),
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchDecks: () => dispatch(fetchDecksAction()),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  tile: {
    flexDirection: 'column',
    height: 100,
    margin: 10,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tileText: {
    color: green,
    fontSize: 22
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckOverview);
