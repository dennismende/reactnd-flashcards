import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class NewDeckQuestion extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NewDeckQuestion</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect()(NewDeckQuestion);
