import authActions from './auth-actions';
import app from '../../firebase';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  FacebookAuthProvider,
} from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getFirestore, getDoc, FieldValue } from 'firebase/firestore';
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import axios from 'axios';
// import { auth } from 'firebaseui';

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(authActions.loginRequest());

    try {
      const {
        user: { _delegate },
      } = await app.auth().signInWithEmailAndPassword(email, password);
      const { email: mail, uid, displayName, photoURL } = _delegate;
      localStorage.setItem('uid', uid);

      const db = getFirestore();
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      let favorites = [];
      let friends = [];

      if (docSnap.exists()) {
        favorites = docSnap.data().favorites;
        friends = docSnap.data().friends;
      } else {
        console.log('No such document!');
      }
      dispatch(
        authActions.loginSuccess({
          mail,
          uid,
          displayName,
          photoURL,
          favorites,
          friends,
        })
      );
    } catch (error) {
      dispatch(authActions.loginError(error.message));
    }
  };

export const register =
  ({ email, password, userName }) =>
  async (dispatch) => {
    dispatch(authActions.registerRequest());

    try {
      const db = getFirestore();
      const {
        user: { _delegate },
      } = await app.auth().createUserWithEmailAndPassword(email, password);
      let { email: mail, uid, displayName, photoURL } = _delegate;

      const user = app.auth().currentUser;
      user.updateProfile({
        displayName: userName,
      });

      await setDoc(doc(db, 'users', `${uid}`), {
        email,
        name: userName,
        uid,
        favorites: [],
        friends: [],
        photoURL,
      });

      if (!displayName) {
        displayName = userName;
      }

      dispatch(
        authActions.registerSuccess({
          mail,
          uid,
          displayName,
          photoURL,
          favorites: [],
          friends: [],
        })
      );
    } catch (error) {
      dispatch(authActions.registerError(error.message));
    }
  };

export const logout = () => async (dispatch) => {
  dispatch(authActions.logoutRequest());

  try {
    await app.auth().signOut();
    localStorage.removeItem('uid');
    dispatch(authActions.logoutSuccess());
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
  }
};

export const getCurrentUser = () => async (dispatch, getState) => {
  const state = getState();
  const { uid } = state.auth;

  if (!uid) {
    return;
  }

  dispatch(authActions.getCurrentUserRequest());
  try {
    // app.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     const {
    //       currentUser: { _delegate },
    //     } = app.auth();
    //     const { email: mail, uid, photoURL, displayName } = _delegate;

    const db = getFirestore();
    const usersSnapshot = await getDocs(collection(db, 'users'));

    usersSnapshot.forEach((doc) => {
      if (uid === doc.data().uid) {
        const {
          email: mail,
          uid,
          photoURL,
          name: displayName,
          favorites,
          friends,
        } = doc.data();
        dispatch(
          authActions.getCurrentUserSuccess({
            mail,
            uid,
            photoURL,
            displayName,
            favorites,
            friends,
          })
        );
      }
    });
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

export const googleLogin = () => async (dispatch) => {
  dispatch(authActions.loginRequest());
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const { displayName, photoURL, email: mail, uid } = user;
      const db = getFirestore();
      setDoc(doc(db, 'users', `${uid}`), {
        email: mail,
        name: displayName,
        uid,
        photoURL,
        favorites: [],
        friends: [],
      });

      dispatch(
        authActions.loginSuccess({
          displayName,
          photoURL,
          mail,
          uid,
          favorites: [],
          friends: [],
        })
      );
    })
    .catch((error) => {
      dispatch(authActions.loginError(error.message));
    });
};

// export const facebookLogin = () => async (dispatch) => {
//   const provider = new FacebookAuthProvider();
//   const auth = getAuth();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const user = result.user;
//       console.log(user);

//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       const credential = FacebookAuthProvider.credentialFromResult(result);
//       const accessToken = credential.accessToken;

//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.email;
//       // The AuthCredential type that was used.
//       const credential = FacebookAuthProvider.credentialFromError(error);

//       // ...
//     });
// };

export const getFavoriteShows = (ids) => async (dispatch) => {
  dispatch(authActions.favoriteShowsRequest());

  try {
    const result = await Promise.all(
      ids.map(async (id) => {
        const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        return data;
      })
    );
    dispatch(authActions.favoriteShowsSuccess(result));
  } catch (error) {
    dispatch(authActions.favoriteShowsError(error.message));
  }
};

export const addIdToFavorite = (id, uid) => async (dispatch) => {
  dispatch(authActions.favoriteShowsIdRequest());
  console.log('add');

  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      favorites: arrayUnion(id),
    });

    dispatch(authActions.favoriteShowsIdSuccess(id));
  } catch (error) {
    dispatch(authActions.favoriteShowsIdError(error.message));
  }
};

export const deleteIdFromFavorite = (id, uid) => async (dispatch) => {
  dispatch(authActions.favoriteShowsIdDeleteRequest());

  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      favorites: arrayRemove(id),
    });

    dispatch(authActions.favoriteShowsIdDeleteSuccess(id));
  } catch (error) {
    dispatch(authActions.favoriteShowsIdDeleteError(error.message));
  }
};

export const addNewFriend =
  ({ value, label }) =>
  async (dispatch, getState) => {
    dispatch(authActions.addFriendRequest());

    const state = getState();
    const { uid, displayName } = state.auth;

    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', uid);
      const friendsRef = doc(db, 'users', value);

      await updateDoc(userRef, {
        friends: arrayUnion({ name: label, uid: value }),
      });
      await updateDoc(friendsRef, {
        friends: arrayUnion({ name: displayName, uid: uid }),
      });
      dispatch(authActions.addFriendSuccess({ name: label, uid: value }));
    } catch (error) {
      dispatch(authActions.addFriendError(error.message));
    }
  };

export const deleteFromFriends = (friendUid) => async (dispatch, getState) => {
  dispatch(authActions.deleteFriendRequest());

  const state = getState();
  const { uid } = state.auth;

  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    const friendsRef = doc(db, 'users', friendUid);
    const friendSnap = await getDoc(friendsRef);

    await updateDoc(userRef, {
      friends: userSnap
        .data()
        .friends.filter((friend) => friend.uid !== friendUid),
    });
    await updateDoc(friendsRef, {
      friends: friendSnap.data().friends.filter((friend) => friend.uid !== uid),
    });
    dispatch(authActions.deleteFriendSuccess(friendUid));
  } catch (error) {
    dispatch(authActions.deleteFriendError(error.message));
  }
};
