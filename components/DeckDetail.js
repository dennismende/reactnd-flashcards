import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class DeckDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DeckDetail</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect()(DeckDetail);
