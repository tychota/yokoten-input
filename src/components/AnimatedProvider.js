import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import idx from 'idx';

class AnimatedProvider extends Component {
  state = {
    openProgress: new Animated.Value(
      idx(this, () => this.props.input.value) || idx(this, () => this.props.meta.active) ? 1 : 0
    ),
  };

  componentWillReceiveProps(nextProps) {
    const shouldOpen = !!idx(this, () => nextProps.input.value) || !!idx(this, () => nextProps.meta.active);
    if (idx(this, () => this.props.input.value) !== idx(nextProps, () => nextProps.input.value)) {
      Animated.timing(this.state.openProgress, { toValue: shouldOpen ? 1 : 0, duration: 100 }).start();
    }
    if (idx(this, () => this.props.meta.active) !== idx(nextProps, () => nextProps.meta.active)) {
      Animated.timing(this.state.openProgress, { toValue: shouldOpen ? 1 : 0, duration: 100 }).start();
    }
  }

  render() {
    const { children, ...rest } = this.props;
    return React.cloneElement(children, { openProgress: this.state.openProgress, ...rest });
  }
}

export default AnimatedProvider;
