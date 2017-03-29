// Import react and react native stuff
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Animated } from 'react-native';
import BaseInput from './BaseInput';

Animated.Input = Animated.createAnimatedComponent(TextInput);

class AnimatedInput extends BaseInput {
  render() {
    const { input, ...otherProps } = this.props;
    const opacity = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    });
    const borderWidth = this.state.progress.interpolate({
      inputRange: [0, 0.49, 0.51, 1],
      outputRange: [0, 0, 1, 1],
    });
    const height = this.state.progress.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [15, 25, 30],
    });

    return (
      <Animated.View
        style={{
          opacity,
          borderWidth,
          height,
          borderColor: '#143054',
        }}
      >
        <Animated.Input
          ref="input"
          style={[styles.input, { height }]}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          {...otherProps}
          value={input.value}
        />
      </Animated.View>
    );
  }
}

// a bit of style :)
const styles = StyleSheet.create({
  input: {
    width: 300,
    backgroundColor: 'white',
  },
});

export default AnimatedInput;
