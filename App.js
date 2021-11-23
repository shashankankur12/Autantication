import React from 'react';

import {Text, View, Button} from 'react-native';
import firebaseSetUp from './Setup';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

const App = () => {
  const {auth} = firebaseSetUp();
  const [userEmail, setUpUserEmail] = React.useState('');
  const [userName, setUpUserName] = React.useState('');
  const [userId, setUpUserId] = React.useState('');

  function onAuthStateChanged(user) {
    if (user) {
      setUpUserName(user.displayName);
      setUpUserEmail(user.email);
      setUpUserId(user.uid);
    } else {
      setUpUserName('');
      setUpUserEmail('');
      setUpUserId('');
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function signOut() {
    await auth().signOut();
  }

  async function signinWithGoogel() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function signinWithFaceBook() {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'user cancel login process';
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'some thing went wrong';
    }

    const fbCred = auth.FacebookAuthProvider.credential(data.accessToken);

    return await auth().signInWithCredential(fbCred);
  }

  return (
    <View>
      <View style={{marginTop: 15, marginHorizontal:25}}>
      <Button title="Googel Login"  onPress={signinWithGoogel} />
      </View>

      <View style={{marginTop: 15, marginHorizontal:25}}>
      <Button title="Facebook Login" style={{marginTop: 5}} onPress={signinWithFaceBook} />
      </View>
      <View style={{marginHorizontal: 35, align: 'center',marginVertical:25}}>
        <Text style={{ marginTop:3, fontSize:15}}>User Name : {userName}</Text>
        <Text style={{ marginTop:3, fontSize:15}}>User Email : {userEmail}</Text>
        <Text style={{ marginTop:3, fontSize:15}}>User Id : {userId}</Text>
      </View>

      <View style={{marginTop: 5, marginHorizontal:25}}>
      <Button title="Signout" onPress={signOut} />
      </View>
    </View>
  );
};

export default App;
