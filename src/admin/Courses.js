import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Firebase from 'firebase';

export default class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = { courses: [{name: 'Palestra 1', ministrant: 'Pessoa 1', applicants: [{name: 'Gabriel'}, {name: 'Jair'}]}, {name: 'Palestra 1', ministrant: 'Pessoa 1', applicants: [{name: 'Gabriel'}, {name: 'Jair'}]}] } 
    }

    componentDidMount = async () => {
        // await Firebase.database().ref('courses').on('child_added', (snapshot) => {
        //     this.setState({ courses: snapshot.val() });
        //     alert(JSON.stringify(snapshot.val()));
        // });

        // Firebase.database().ref('courses').once('value', (snapshot) => {
        //     snapshot.forEach((course) => {
        //         this.setState({ courses: [...this.state.courses, ...course] });
            
        //         alert(JSON.stringify(course.val().name));
        //     });
        // });
    }

    renderItem(item) {
        return (
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('CourseDetails') }>
                <View>
                    <Text>{ item.name }</Text>
                    <Text>{ item.ministrant }</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const emptyList = <View>
            <Text>Ainda não há cursos cadastrados.</Text>
        </View>

        return (
            <View style={ styles.container }>
                <ScrollView>           
                    <View>
                        <Button 
                            title='Adicionar curso' 
                            onPress={ () => {this.props.navigation.navigate('AddCourse')} } />
                    </View>

                    <FlatList 
                        data={ this.state.courses }
                        ListEmptyComponent={ emptyList }
                        renderItem={ ({item}) => this.renderItem(item) }
                        keyExtractor={ (item, index) => item.name + index } />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});