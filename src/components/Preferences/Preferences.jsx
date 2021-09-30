import styles from './Preferences.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUserPreferences, getUserUid, favoriteShowsId } from '../../redux/auth/auth-selectors'
import { IconContext } from "react-icons";
import { MdFavoriteBorder } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti'
import { BiCameraMovie } from 'react-icons/bi'
import { Link, withRouter } from 'react-router-dom';
import { addIdToFavorite, deleteFromPreferences, addFilmToWatchList } from '../../redux/auth/auth-operations'
import { AiFillHeart } from 'react-icons/ai';

const Preferences = ({location}) => {
    const preferences = useSelector(getUserPreferences);
    const userUid = useSelector(getUserUid);
    const favorites = useSelector(favoriteShowsId)
    const dispatch = useDispatch()

    const handleAddToFavorite = async (e) => {
        const { id } = e.target.dataset;
        await dispatch(addIdToFavorite(id, userUid))
        await dispatch(deleteFromPreferences(id,userUid))
    }

    const handleAddToWatchList = (e) => {
        const { id, name } = e.target.dataset;
        const show = {
            id,
            uid: userUid,
            name
        }
        dispatch(addFilmToWatchList(show))
    }

    const handleDelete = async (e) => {
        const { id } = e.target.dataset;
        await dispatch(deleteFromPreferences(id, userUid))
    } 

    return (
        <div className={styles.container}>
            <h3>Preferences</h3>
            <IconContext.Provider value={{ color: "white", size: '1.4rem', className: "global-class-name" }}>
                {preferences.length > 0 ?
                    <ul className={styles.list}>
                        {preferences.map(({ from, showName, showId }) =>
                            <li className={styles.item} key={`${showId}+${from}`}>
                                <p>{from} recommends you to watch
                        <Link
                                        className={styles.link}
                                        to={{
                                            pathname: `show/${showId}`,
                                            state: { from: location },
                                        }}
                                    >{showName}</Link></p>
                                <div className={styles.buttons}>
                                    {favorites.includes(showId) ? <AiFillHeart /> :
                                        <MdFavoriteBorder className={styles.button} data-id={showId} onClick={handleAddToFavorite} />}
                                    <BiCameraMovie data-name={showName} data-id={showId} onClick={handleAddToWatchList} className={styles.button} />
                                    <TiDelete className={styles.button} data-id={showId} onClick={handleDelete} />
                                </div>
                            </li>
                        )}
                 </ul> :
                        <p>You haven`t got any recommendations to watch yet</p>}
               
            </IconContext.Provider>
            
    </div>)
}

export default withRouter(Preferences);