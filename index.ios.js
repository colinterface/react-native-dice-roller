/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  SegmentedControlIOS,
} from 'react-native';

StatusBar.setBarStyle('light-content', true);

const dice = [
  { name: 'D4', maxValue: 4 },
  { name: 'D6', maxValue: 6 },
  { name: 'D8', maxValue: 8 },
  { name: 'D10', maxValue: 10 },
  { name: 'D00', maxValue: 100 },
  { name: 'D12', maxValue: 12 },
  { name: 'D20', maxValue: 20 },
];

export default class RNExample extends Component {

  constructor() {
    super();
    this.state = {
      selectedDieIndex: 3,
      value: null,
    }
  }

  rollDie = () => {
    LayoutAnimation.spring();
    this.setState({ value: null });
    const maxValue = dice[this.state.selectedDieIndex].maxValue;
    const value = Math.ceil(Math.random() * maxValue);
    setTimeout(() => {
      LayoutAnimation.spring();
      this.setState({ value });
    }, 0);

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              {dice[this.state.selectedDieIndex].name}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              {this.state.value}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.rollDie}
          >
            <Text style={styles.buttonText}>{'roll'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <SegmentedControlIOS
            style={styles.diePicker}
            values={dice.map((die) => die.name)}
            selectedIndex={this.state.selectedDieIndex}
            onChange={({ nativeEvent }) => {
              const selectedDieIndex = nativeEvent.selectedSegmentIndex;
              LayoutAnimation.spring();
              this.setState({
                selectedDieIndex,
                value: null,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  row: {
    flexDirection: 'row',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: 'darkgoldenrod'
  },
  buttonContainer: {
    // backgroundColor: 'teal',
    // borderRadius: 35,
    // flex: 0,
    alignItems: 'center',
    margin: 30,
    // justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 80,
  },
  diePicker: {
    height: 50,
    flex: 1,
  }

});

AppRegistry.registerComponent('RNExample', () => RNExample);
