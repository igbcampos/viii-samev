import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login'
import Home from './src/Home'
import Firebase from 'firebase';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

var firebaseConfig = {
  apiKey: "AIzaSyAJ_KIRryOv6_0A79saT6DjXH00OEwLP68",
  authDomain: "samev-6ac08.firebaseapp.com",
  databaseURL: "https://samev-6ac08.firebaseio.com",
  projectId: "samev-6ac08",
  storageBucket: "",
  messagingSenderId: "613611223565",
  appId: "1:613611223565:web:2f290c259bd98e67"
};

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  }
})

const AppNavigator_login_to_home = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: AppNavigator
  }
})

export default class login_to_home extends Component {
  constructor(props) {
    super(props);

    this.state = { user: { name: "Jair", email: "fjair123@gmail.com", cpf: "12345678936", number: "202910" } }
  }

  componentDidMount() {
    Firebase.auth().currentUser.then(user => { console.log(user) })
  }

  cadastrarMinucurso() {
    alert("CAMERA")
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* criação do card */}
        <View>
          <Text>{this.state.user.name}</Text>
          <Text>{this.state.user.email}</Text>
          <Text>{this.state.user.cpf}</Text>
          <Text>{this.state.user.number}</Text>
        </View>

        <Button title="Cadastrar Minicurso" onPress={this.cadastrarMinucurso} />
      </ScrollView>
    );
  }
}


Firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
