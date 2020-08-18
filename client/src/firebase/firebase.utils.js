import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyAOyzVQBcGseZ3oj5Fy8r5TKCguTwCprpo",
    authDomain: "clothing-app-db-f47e0.firebaseapp.com",
    databaseURL: "https://clothing-app-db-f47e0.firebaseio.com",
    projectId: "clothing-app-db-f47e0",
    storageBucket: "clothing-app-db-f47e0.appspot.com",
    messagingSenderId: "323071374619",
    appId: "1:323071374619:web:9fdcabb372d6d907b4cfbe",
    measurementId: "G-4YG4MWK19V"
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

// const unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth){
    //     const userRef = await createUserProfileDocument(userAuth, {}); 
    //     console.log(userRef);
    //     userRef.onSnapshot(snapShot => {
    //       this.props.setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //       });
    //     });
    //   }

    //   this.props.setCurrentUser(userAuth);
    // });

export const addCollectionAndDocument = async (collecionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collecionKey);
  console.log(collectionRef);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map(doc => {
      const {title, items} = doc.data();

      return{
        routeName: encodeURI(title.toLowerCase()),
        title,
        items,
        id: doc.id
      }
    }
  );

  return transformedCollections.reduce(
    (accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, 
    {});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getAuthenticatedUserAsync = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        console.log("userAuth" + JSON.stringify(userAuth));
        resolve(userAuth);
      }, reject);  
  });
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account "} );

export default firebase;