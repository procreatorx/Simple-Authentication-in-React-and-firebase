import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner, CardSection, } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
        constructor(props) {
            super(props);
           this.state = { loggedIn: null };         
        }
   
     componentWillMount() {
     this.initializeFirebase(); 
    }

    initializeFirebase() {
        const firebase = require('firebase');
      
     const config = {
            your Apikey // will get from firebase website have to paste it here.
          };
          if (!firebase.apps.length) {
            firebase.initializeApp(config);
         }
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
}
      renderContent() {
        const firebase = require('firebase');

        switch (this.state.loggedIn) {
            case true:
            return (
                <CardSection>
                 <Button onPress={() => firebase.auth().signOut()}>
                 Log Out
                </Button> 
                </CardSection>
            );
            case false:
            return <LoginForm />;
            default:
            return (
                <CardSection>
                <Spinner size='large' />
                </CardSection>
        );
        } 
}

    render() {
        return (
            <View>
            <Header headerText={'Auth'} />
             {this.renderContent()}
            </View>
        );
    }
}

export default App;
