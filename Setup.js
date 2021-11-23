import * as React from "react";
import App from "./App";
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth"
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '830953867930-v0j0uhbc65cf46s290h7og8cgvjed6dq.apps.googleusercontent.com',
});

const firebaseConfig = {
    apiKey: "AIzaSyBStFpk60kXZwz4BsFUfD8D3vQhxKIkqf4",
    authDomain: "autantication.firebaseapp.com",
    projectId: "autantication",
    storageBucket: "autantication.appspot.com",
    messagingSenderId: "830953867930",
    appId: "1:830953867930:web:b9af8e73f86571abd22d23",
    measurementId: "G-45VVMYYTFV"
  };

  
  if(!firebase.app.length){
    firebase.initializeApp(firebaseConfig)
  }
  



export default ()=>{
  return{firebase, auth};
};