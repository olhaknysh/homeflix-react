import { useDispatch, useSelector } from 'react-redux';
import { getUserWatchList, getUserUid } from '../../redux/auth/auth-selectors'
import { Link, withRouter } from 'react-router-dom';
import styles from './WatchList.module.scss'
import { TiDelete } from 'react-icons/ti'
import { IconContext } from "react-icons";
import { deleteFilmFromWatchList} from '../../redux/auth/auth-operations'

const WatchList = ({location}) => {
    const userUid = useSelector(getUserUid);
    const watchList = useSelector(getUserWatchList)
    const dispatch = useDispatch()

    const handleDelete = (e) => {
        const { id } = e.target.dataset;
        console.dir(e.target)
        const show = {
            id,
            uid:userUid
        }
        console.log(show)
        dispatch(deleteFilmFromWatchList(show))
    }

    return (
        <div className={styles.container}>
        <h3>Not forget to watch</h3>
            <IconContext.Provider value={{ color: "white", size: '1.4rem', className: "global-class-name" }}>
                {watchList.length > 0 ?
                    <ul className={styles.list}>
                    {watchList.map((show) =>
                        <li className={styles.item} key={show.id}>
                            <Link
                                className={styles.link}
                                to={{
                                    pathname: `show/${show.id}`,
                                    state: { from: location },
                                }}
                            >{show.name}</Link>
                            <TiDelete onClick={handleDelete} data-id={show.id} className={styles.button}/>
                        </li>)} 
                    </ul>:
                <p>Please add shows you would like to watch</p>}
        </IconContext.Provider>
    </div>)
}

export default withRouter(WatchList);