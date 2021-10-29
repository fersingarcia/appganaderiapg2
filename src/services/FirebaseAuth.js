import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
    webClientId: '671713713382-hslprkoijp06vvcttj6j7emkhh6bjqce.apps.googleusercontent.com',
});

//Search User Logged

export const userLoginSearch = async (uid) => {
    const users = await firestore().collection('users').doc(uid).get();
    return users;

}

//Create User in Firestore
export const createUserInFirestore = (data, dataRegister) => {
    firestore()
        .collection('users')
        .doc(data.user.uid)
        .set(dataRegister)
        .then(() => {
        });
}

//Login with Email and Password Method
export const signInEmailPassword = (email, password) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
        })
        .catch(error => {
            console.error(error);
        });
}

//Login and Register with Google Method
export const onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
}

//SingOut General Method
export const onSingOut = () => {
    auth()
        .signOut()
        .then(() => { });
}

