import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Firebase from 'firebase';
import { NavigationEvents } from 'react-navigation';


export default class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = { courses: [], refreshing: false } 
    }

    componentDidMount = async () => {
        this.getCourses();
    }

    async getCourses() {
        var data = []

        Firebase.database().ref('courses').on('child_added', snapshot => {
            var course = snapshot.val();
            course.key = snapshot.key;
            data.push(course);
        });
        
        this.setState({ courses: data });
    }

    renderItem(item) {
        return (
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('CourseDetails', { course: item }) }>
                <View style={ styles.item }>
                    <Text style={[ styles.itemText, styles.title ]}>{ item.name }</Text>
                    <Text style={ styles.itemText }>{ item.ministrant }</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        <NavigationEvents
            onWillFocus={() => {
                this.getCourses();
            }}
        />

        const emptyList = <View>
            <Text>Ainda não há cursos cadastrados.</Text>
        </View>

        return (
            <View>
                <ScrollView>  
                    <View style={ styles.container }>        
                        <View style={ styles.button }>
                            <Button 
                                title='Adicionar curso' 
                                color='#5DAE63'
                                onPress={ () => {this.props.navigation.navigate('AddCourse')} } />
                        </View>

                        <Text style={ styles.title }>Lista de cursos</Text>

                        <FlatList 
                            data={ this.state.courses }
                            ListEmptyComponent={ emptyList }
                            renderItem={ ({item}) => this.renderItem(item) }
                            keyExtractor={ (item, index) => item.name + index }
                            refreshing={ this.state.refreshing }
                            onRefresh={ () => this.getCourses() } />
                    </View> 
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 16
    },
    card: {
        borderRadius: 4,
        padding: 16,
        elevation: 1
    },
    button: {
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
    },
    item: {
        backgroundColor: '#5DAE63',
        padding: 16,
        marginTop: 8,
        borderRadius: 4
    },
    itemText: {
        color: '#ffffff'
    }
});