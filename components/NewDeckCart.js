import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class NewDeckCart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NewDeckCart</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect()(NewDeckCart);
