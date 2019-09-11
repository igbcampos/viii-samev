import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Firebase from 'firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import Util from './src/Util';

import Login from './src/Login';
import Home from './src/user/Home';
import Scanner from './src/user/Scanner';
import Courses from './src/admin/Courses';
import AddCourse from './src/admin/AddCourse';
import CoursesDetails from './src/admin/CourseDetails';
import AddApplicant from './src/admin/AddApplicant';
import Notify from './src/admin/Notify';
import Profile from './src/admin/Profile';

Firebase.initializeApp(Util);

const UserStackNavigator = createStackNavigator(
	{
		Home: { 
			screen: Home, 
			navigationOptions: {
				title: 'VIII SAMEV'
			},
		},
		Scanner: {
			screen: Scanner, 
			navigationOptions: {
				title: 'Ler código'
			}
		}
	}
);

const CoursesStackNavigator = createStackNavigator(
	{
		Courses: { 
			screen: Courses, 
			navigationOptions: {
				title: 'Cursos'
			}
		},
		AddCourse: {
			screen: AddCourse, 
			navigationOptions: {
				title: 'Adicionar curso'
			}
		},
		CourseDetails: { 
			screen: CoursesDetails, 
			navigationOptions: {
				title: 'Detalhes do curso'
			}
		},
		AddApplicant: { 
			screen: AddApplicant, 
			navigationOptions: {
				title: 'Adiconar participantes'
			}
		}
	}
);

const NotifyStackNavigator = createStackNavigator(
	{
		Notify: { 
			screen: Notify, 
			navigationOptions: {
				title: 'Notificar'
			}
		}
	}
);

const ProfileStackNavigator = createStackNavigator(
	{
		Profile: { 
			screen: Profile, 
			navigationOptions: {
				title: 'Perfil'
			}
		}
	}
);

const AdminBottomTabNavigator = createBottomTabNavigator(
	{
		Courses: { 
			screen: CoursesStackNavigator, 
			navigationOptions: ({ navigation }) => ({
				title: "Cursos",
				tabBarIcon: ({ tintColor }) => <MaterialIcons name='book' size={ 26 } color={ tintColor }/>
			}) 
		},
		Notify: { 
			screen: NotifyStackNavigator, 
			navigationOptions: ({ navigation }) => ({
				title: "Notificar",
				tabBarIcon: ({ tintColor }) => <MaterialIcons name='notifications' size={ 26 } color={ tintColor }/>
			}) 
		},
		Profile: { 
			screen: ProfileStackNavigator, 
			navigationOptions: ({ navigation }) => ({
				title: "Perfil",
				tabBarIcon: ({ tintColor }) => <MaterialIcons name='person' size={ 26 } color={ tintColor }/>
			}) 
		}
	},
	{
	  tabBarOptions: {
		activeTintColor: '#5DAE63',
	  }
	}
);

class LoginOrHome extends Component {
	constructor(props) {
		super(props);

		this.state = { user: { name: 'Jair', email: 'fjair123@gmail.com', cpf: '12345678936', number: '202910' } }
	}

	async componentDidMount() {
		var user = await Firebase.auth().currentUser;

		if(user) {
            if(user.user.photoURL == 'user') {
                this.props.navigation.navigate('UserHome');
            }
            else if(user.user.photoURL == 'admin') {
                this.props.navigation.navigate('AdminHome');
            }
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
		UserHome: { screen: UserStackNavigator },
		AdminHome: { screen: AdminBottomTabNavigator }
	}
)

const AppContainer = createAppContainer(LoginOrHomeSwitchNavigator);

export default class App extends Component {
	async componentDidMount() {
		await this.registerForPushNotificationsAsync();
	}

	async registerForPushNotificationsAsync() {
		const { status: existingStatus } = await Permissions.getAsync(
		  	Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;
		
		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
	  
		if (finalStatus !== 'granted') {
		  	return;
		}
	  
		try {
			let token = await Notifications.getExpoPushTokenAsync();
			console.log(token);
			var dados = { token: token };
			await Firebase.database().ref('tokens').child(token.split('[')[1].split(']')[0]).set(dados);
		}
		catch(error) {
		  	console.log(error);
		}
	}

	render() {
		return (
			<AppContainer />
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
