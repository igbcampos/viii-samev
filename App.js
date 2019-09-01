import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Firebase from 'firebase';

import Util from './src/Util';

import Login from './src/Login';
import Home from './src/user/Home';

Firebase.initializeApp(Util);

const UserStackNavigator = createStackNavigator(
	{
		Home: { 
			screen: Home, 
			navigationOptions: {
				title: 'VIII SAMEV'
			}
		}
	}
)

const AdminBottomTabNavigator = createBottomTabNavigator({
	Home: { screen: Home }
})

class LoginOrHome extends Component {
	constructor(props) {
		super(props);

		this.state = { user: { name: 'Jair', email: 'fjair123@gmail.com', cpf: '12345678936', number: '202910' } }
	}

	async componentDidMount() {
		var user = await Firebase.auth().currentUser;

		if(user) {
			this.props.navigation.navigate('Home');
		}
		else {
			this.props.navigation.navigate('Login');
		}
	}

	render() {
		return (
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' />
			</View>
    	);
	}
}

const LoginOrHomeSwitchNavigator = createSwitchNavigator(
	{
		LoginOrHome: { screen: LoginOrHome },
		Login: { screen: Login },
		Home: { screen: UserStackNavigator }
	}
)

export default createAppContainer(LoginOrHomeSwitchNavigator);

// export default function App() {
// 	return (
// 		<View style={styles.container}>
// 			<Login />
// 		</View>
// 	);
// }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
