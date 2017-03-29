// Import react and react native stuff
import React, { Component } from 'react';
import { Animated } from 'react-native';

class BaseInput extends Component {
  state = {
    value: this.props.input.value,
    progress: new Animated.Value(this.props.meta.focused || this.props.input.value ? 1 : 0),
  };

  _onChange = event => {
    this.setState({
      value: event.nativeEvent.text,
    });

    const onChange = this.props.input.onChange;
    if (onChange) {
      onChange(event);
    }
  };

  _onBlur = event => {
    if (!this.state.value) {
      this._toggle(false);
    }

    const onBlur = this.props.input.onBlur;
    if (onBlur) {
      onBlur(event);
    }
  };

  _onFocus = event => {
    this._toggle(true);

    const onFocus = this.props.input.onFocus;
    if (onFocus) {
      onFocus(event);
    }
  };

  _toggle = isActive => {
    this.isActive = isActive;
    Animated.timing(this.state.progress, {
      toValue: isActive ? 1 : 0,
      duration: 600,
    }).start();
  };

  inputRef() {
    return this.refs.input;
  }

  focus = () => {
    this.inputRef().focus();
  };
}

export default BaseInput;
