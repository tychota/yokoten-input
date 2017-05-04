import reactNative, { View, Animated } from 'react-native';
import React, { Component } from 'react';
import { createSink } from 'recompose';
import AnimatedProvider from '../AnimatedProvider';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

let spy = jest.fn();
let Child = createSink(spy);
beforeEach(() => {
  spy = jest.fn();
  Child = createSink(spy);
});

jest.mock('Animated', () => {
  const ActualAnimated = require.requireActual('Animated');
  return {
    ...ActualAnimated,
    timing: (value, config) => {
      return {
        start: callback => {
          value.setValue(config.toValue);
          callback && callback();
        }
      };
    }
  };
});

test('It render component closed when without value and unfocused', () => {
  renderer.create(<AnimatedProvider><Child /></AnimatedProvider>);
  expect(spy).toHaveBeenLastCalledWith({ openProgress: new Animated.Value(0) });
});

test('It render component open when with value but unfocused', () => {
  renderer.create(<AnimatedProvider input={{ value: 'test' }} meta={{ active: false }}><Child /></AnimatedProvider>);
  expect(spy).toHaveBeenLastCalledWith({
    input: { value: 'test' },
    meta: { active: false },
    openProgress: new Animated.Value(1)
  });
});

test('It render component open when focused but without value', () => {
  renderer.create(<AnimatedProvider input={{}} meta={{ active: true }}><Child /></AnimatedProvider>);
  expect(spy).toHaveBeenLastCalledWith({
    input: {},
    meta: { active: true },
    openProgress: new Animated.Value(1)
  });
});

test('It render component closed then animate to open on prefill', () => {
  jest.useFakeTimers();
  const component = shallow(<AnimatedProvider input={{}} meta={{}}><Child /></AnimatedProvider>, {
    lifecycleExperimental: true
  });
  renderer.create(component.node).toJSON();
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenLastCalledWith({ input: {}, meta: {}, openProgress: new Animated.Value(0) });
  component.setProps({ input: { value: 'test' } });
  renderer.create(component.node).toJSON();
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenLastCalledWith({ input: { value: 'test' }, meta: {}, openProgress: new Animated.Value(1) });
});

test('It render component closed then animate to open on focus', () => {
  jest.useFakeTimers();
  const component = shallow(<AnimatedProvider input={{}} meta={{}}><Child /></AnimatedProvider>, {
    lifecycleExperimental: true
  });
  renderer.create(component.node).toJSON();
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenLastCalledWith({ input: {}, meta: {}, openProgress: new Animated.Value(0) });
  component.setProps({ meta: { active: true } });
  renderer.create(component.node).toJSON();
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenLastCalledWith({ input: {}, meta: { active: true }, openProgress: new Animated.Value(1) });
});

test('It render component open then animate to close on focus drop', () => {
  jest.useFakeTimers();
  const component = shallow(<AnimatedProvider input={{}} meta={{ active: true }}><Child /></AnimatedProvider>, {
    lifecycleExperimental: true
  });
  renderer.create(component.node).toJSON();
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenLastCalledWith({ input: {}, meta: { active: true }, openProgress: new Animated.Value(1) });
  component.setProps({ meta: { active: false } });
  renderer.create(component.node).toJSON();
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenLastCalledWith({ input: {}, meta: { active: false }, openProgress: new Animated.Value(0) });
});

test('It render component open then animate to close on value reset', () => {
  jest.useFakeTimers();
  const component = shallow(<AnimatedProvider input={{ value: 'test' }} meta={{}}><Child /></AnimatedProvider>, {
    lifecycleExperimental: true
  });
  renderer.create(component.node).toJSON();
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenLastCalledWith({ input: { value: 'test' }, meta: {}, openProgress: new Animated.Value(1) });
  component.setProps({ input: { value: null } });
  renderer.create(component.node).toJSON();
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenLastCalledWith({ input: { value: null }, meta: {}, openProgress: new Animated.Value(0) });
});
