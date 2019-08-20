import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login'
import Firebase from 'firebase';
import {  } from 'react-navigation';

var firebaseConfig = {
  apiKey: "AIzaSyAJ_KIRryOv6_0A79saT6DjXH00OEwLP68",
  authDomain: "samev-6ac08.firebaseapp.com",
  databaseURL: "https://samev-6ac08.firebaseio.com",
  projectId: "samev-6ac08",
  storageBucket: "",
  messagingSenderId: "613611223565",
  appId: "1:613611223565:web:2f290c259bd98e67"
};

Firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <Login/>
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
