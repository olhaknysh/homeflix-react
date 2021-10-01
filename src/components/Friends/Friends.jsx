import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { addNewFriend } from '../../redux/auth/auth-operations';
import { getUserUid, getUsersFriends } from '../../redux/auth/auth-selectors';

import FriendsList from './FriendsList';
import Select from 'react-select';

import styles from './Friends.module.scss';


const Friends = () => {
  const dispatch = useDispatch();
    
  const [person, setPerson] = useState({});
  const [people, setPeople] = useState([]);
    
  const userUid = useSelector(getUserUid);
  const friends = useSelector(getUsersFriends);

  useEffect(() => {
    getPeople(friends);
  }, [friends]);

  const getPeople = async (newFriends) => {
    const db = getFirestore();
    const userSnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    const friendsUid = newFriends.map((friend) => friend.uid);
    userSnapshot.forEach((doc) => {
      if (userUid !== doc.data().uid && !friendsUid.includes(doc.data().uid)) {
        const user = { value: doc.data().uid, label: doc.data().name };
        users.push(user);
      }
    });
    setPeople(users);
  };

  const handleChange = (person) => {
    setPerson(person);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(addNewFriend(person));
  };

  return (
    <div className={styles.container}>
      <h3>Friends</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Select
          className={styles.select}
          placeholder='All users'
          onChange={handleChange}
          options={people}
          theme={(theme) => ({
            ...theme,
            borderRadius: 10,
            colors: {
              ...theme.colors,
              primary25: '#d2bdff',
              primary: 'black',
              neutral0: 'black',
              neutral80: 'white',
            },
          })}
        />
        <button type='submit' className={styles.button}>
          Add new friend
        </button>
      </form>
      <FriendsList />
    </div>
  );
};

export default Friends;
