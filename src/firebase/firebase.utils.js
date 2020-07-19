import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionData
      });
    }
    catch(error){
      console.log("cannot add user to database");
    }
  }

  return userRef;
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account "} );
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;