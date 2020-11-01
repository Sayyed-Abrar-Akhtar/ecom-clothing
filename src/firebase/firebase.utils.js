import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyB2iY5V535eMXqbIeONFe22B_Vkst0aevI',
  authDomain: 'ecom-clothing-907ea.firebaseapp.com',
  databaseURL: 'https://ecom-clothing-907ea.firebaseio.com',
  projectId: 'ecom-clothing-907ea',
  storageBucket: 'ecom-clothing-907ea.appspot.com',
  messagingSenderId: '1044881985605',
  appId: '1:1044881985605:web:f38bef38fa3d44a3ed532c',
  measurementId: 'G-HT7WWLKZJT',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, phoneNumber } = userAuth;
    const createdAt = Date.now();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        phoneNumber,
        ...additionalData,
      });
    } catch (error) {
      console.log(`Error creating user: ${error}`);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
