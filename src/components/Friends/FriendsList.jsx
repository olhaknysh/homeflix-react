import { useSelector ,useDispatch} from 'react-redux';
import { getUsersFriends } from '../../redux/auth/auth-selectors';
import styles from './FriendsList.module.scss'
import { TiDelete } from 'react-icons/ti'
import { IconContext } from "react-icons";
import { deleteFromFriends} from '../../redux/auth/auth-operations'

const FriendsList = () => {
    const dispatch = useDispatch()
    const friends = useSelector(getUsersFriends)
    const handleDelete = (e) => {
        const { uid } = e.currentTarget.dataset;
        dispatch(deleteFromFriends(uid))
    }
    return <ul className={styles.list}>
        <IconContext.Provider value={{ color: "white", size:'1.4rem',className: "global-class-name" }}>
            {friends.length > 0 && friends.map(({ name, uid }) => <li className={styles.item} key={uid}>{name}
                <button data-uid={uid} onClick={handleDelete} className={styles.delete} type="button">
                    <TiDelete />
                </button>
        </li>)}
        </IconContext.Provider>
  </ul>;
};

export default FriendsList;
