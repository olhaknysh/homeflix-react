import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, getDoc } from 'firebase/firestore';
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authActions from './auth-actions';
import app from '../../firebase';

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
      let preferences = [];
      let watchList = [];

      if (docSnap.exists()) {
        favorites = docSnap.data().favorites;
        friends = docSnap.data().friends;
        preferences = docSnap.data().preferences;
        watchList = docSnap.data().watchList;
      } else {
        console.log('No such document!');
      }

      toast.configure();
      toast.success(`Welcome back, ${displayName}!`);

      dispatch(
        authActions.loginSuccess({
          mail,
          uid,
          displayName,
          photoURL,
          favorites,
          friends,
          preferences,
          watchList,
        })
      );
    } catch (error) {
      toast.configure();
      toast.error(error.message);
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
        preferences: [],
        watchList: [],
      });

      if (!displayName) {
        displayName = userName;
      }

      toast.configure();
      toast.success(`Welcome to Homeflix, ${displayName}!`);

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
      toast.configure();
      toast.error(error.message);
      dispatch(authActions.registerError(error.message));
    }
  };

export const logout = () => async (dispatch) => {
  dispatch(authActions.logoutRequest());

  try {
    await app.auth().signOut();
    localStorage.removeItem('uid');

    toast.configure();
    toast.success('Bye-bye!');
    dispatch(authActions.logoutSuccess());
  } catch (error) {
    toast.configure();
    toast.error(error.message);
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
          preferences,
          watchList,
        } = doc.data();
        dispatch(
          authActions.getCurrentUserSuccess({
            mail,
            uid,
            photoURL,
            displayName,
            favorites,
            friends,
            preferences,
            watchList,
          })
        );
      }
    });
  } catch (error) {
    toast.configure();
    toast.error(error.message);
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

export const googleLogin = () => async (dispatch) => {
  dispatch(authActions.loginRequest());
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const { displayName, photoURL, email: mail, uid } = user;
    const db = getFirestore();
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    let favorites = [];
    let friends = [];
    let preferences = [];
    let watchList = [];

    if (docSnap.exists()) {
      favorites = docSnap.data().favorites;
      friends = docSnap.data().friends;
      preferences = docSnap.data().preferences;
      watchList = docSnap.data().watchList;
    } else {
      setDoc(doc(db, 'users', `${uid}`), {
        email: mail,
        name: displayName,
        uid,
        photoURL,
        favorites: [],
        friends: [],
        preferences: [],
        watchList: [],
      });
    }

    toast.configure();
    toast.success(`Welcome to Homeflix, ${displayName}!`);

    dispatch(
      authActions.loginSuccess({
        displayName,
        photoURL,
        mail,
        uid,
        favorites,
        friends,
        preferences,
        watchList,
      })
    );
  } catch (error) {
    toast.configure();
    toast.error(error.message);
    dispatch(authActions.loginError(error.message));
  }
};

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
    toast.configure();
    toast.error(error.message);
    dispatch(authActions.favoriteShowsError(error.message));
  }
};

export const addIdToFavorite = (id, uid) => async (dispatch) => {
  dispatch(authActions.favoriteShowsIdRequest());

  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      favorites: arrayUnion(id),
    });

    toast.configure();
    toast.success('You have added this show to favorites!');

    dispatch(authActions.favoriteShowsIdSuccess(id));
  } catch (error) {
    toast.configure();
    toast.error(error.message);
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

    toast.configure();
    toast.warn('You have removed this show from favorites!');

    dispatch(authActions.favoriteShowsIdDeleteSuccess(id));
  } catch (error) {
    toast.configure();
    toast.error(error.message);
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

      toast.configure();
      toast.success(`New friend: ${label}!`);
      dispatch(authActions.addFriendSuccess({ name: label, uid: value }));
    } catch (error) {
      toast.configure();
      toast.error(error.message);
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
    toast.configure();
    toast.error(error.message);
    dispatch(authActions.deleteFriendError(error.message));
  }
};

export const deleteFromPreferences = (id, uid) => async (dispatch) => {
  dispatch(authActions.deleteFromPreferencesRequest());

  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    await updateDoc(userRef, {
      preferences: userSnap
        .data()
        .preferences.filter((show) => Number(show.showId) !== Number(id)),
    });
    dispatch(authActions.deleteFromPreferencesSuccess(id));
  } catch (error) {
    toast.configure();
    toast.error(error.message);
    dispatch(authActions.deleteFromPreferencesError(error.message));
  }
};

export const addFilmToWatchList =
  ({ id, uid, name }) =>
  async (dispatch) => {
    dispatch(authActions.addShowToWatchListRequest());

    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', uid);

      await updateDoc(userRef, {
        watchList: arrayUnion({ name, id: Number(id) }),
      });

      toast.configure();
      toast.success(`Not forget to watch ${name}!`);
      dispatch(authActions.addShowToWatchListSuccess({ id, name }));
    } catch (error) {
      toast.configure();
      toast.error(error.message);
      dispatch(authActions.addShowToWatchListError(error.message));
    }
  };

export const deleteFilmFromWatchList =
  ({ id, uid }) =>
  async (dispatch) => {
    dispatch(authActions.deleteShowToWatchListRequest());

    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      await updateDoc(userRef, {
        watchList: userSnap
          .data()
          .watchList.filter((show) => Number(show.id) !== Number(id)),
      });

      dispatch(authActions.deleteShowToWatchListSuccess(id));
    } catch (error) {
      toast.configure();
      toast.error(error.message);
      dispatch(authActions.deleteShowToWatchListError(error.message));
    }
  };
