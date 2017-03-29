// Import react and react native stuff
import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
/** Import the redux form stuff:
 *
 * - reduxForm is an Higher Order Component, that connect the form to 
 * redux and manage all the logic for us (focus, validation, )
 * 
 * - Field define a new field in the form, and accept a component wich will be
 * instanciated with an input props. The input props contains the field value
 * and callbacks like onChange, onFocus
 */
import { reduxForm, Field } from 'redux-form';
import AnimatedInput from './components/AnimatedInput';

// declare a dummy form page
class App extends Component {
  render() {
    return (
      <View style={styles.page}>
        {/* center the input in the page */}
        <View>
          {/** create an input field in the form that render a react native text input */}
          {/** destructure the input props so the property value, onChange text are pass to the textInput */}
          <Field name="input" component={AnimatedInput} />
        </View>
      </View>
    );
  }
}

// a bit of style :)
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#8B98BA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 30,
    backgroundColor: 'white',
  },
});

// create a redux form name "home", and connect the dummy component to create a container
const AppContainer = reduxForm({ form: 'home' })(App);

export default AppContainer;
