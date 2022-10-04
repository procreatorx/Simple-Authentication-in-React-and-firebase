import React, { Component } from 'react';
import { Text } from 'react-native';

import { Button, Card, CardSection, Input, Spinner } from './common';

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }

};

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', loading: false };
      }

      onButtonPress() {
        const firebase = require('firebase');
      
const { email, password, } = this.state;

this.setState({ error: '', loading: true });

firebase.auth().signInWithEmailAndPassword(email, password)
.then(this.onLoginSuccess.bind(this))
.catch(() => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(this.onLoginFail.bind(this));
});
    }
    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }
    onLoginFail() {
        this.setState({
            error: 'Authentication Failed',
            loading: false,
        });
    }

      renderButton() {
          if (this.state.loading) {
              return <Spinner size="small" />;
          }
          return (
              <Button onPress={this.onButtonPress.bind(this)} >
              Login
              </Button>
          );
      }

    render() {
        return (
    <Card> 
            <CardSection >
            <Input
        
            placeholder='user@gmail.com'
            label={'Email'}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            />
            </CardSection>
           <CardSection>
           <Input
           secureTextEntry
           label={'Password'}
           placeholder="password"
           value={this.state.password}
           onChangeText={(password) => this.setState({ password })}
           />
           </CardSection>
         <Text style={styles.errorTextStyle}>
            {this.state.error}
        </Text>

        <CardSection>
           {this.renderButton()}
        </CardSection>
    </Card>
       );
    }
}


export default LoginForm;
