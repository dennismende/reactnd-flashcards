import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class DeckQuiz extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DeckQuiz</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect()(DeckQuiz);
