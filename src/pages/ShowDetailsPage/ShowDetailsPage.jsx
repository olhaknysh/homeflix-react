import React, { Component, Suspense, lazy } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import routes from '../../utils/routes';
import axios from 'axios';
import { FaQuestionCircle } from 'react-icons/fa';
import styles from './ShowDetailsPage.module.scss';
import ReactHtmlParser from 'react-html-parser';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { MdFavoriteBorder } from 'react-icons/md';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { connect } from 'react-redux';
import { AiFillHeart } from 'react-icons/ai';
import todayShowsSelectors from '../../redux/todayShows/todayShows-selectors';
import {
  addIdToFavorite,
    deleteIdFromFavorite, addFilmToWatchList
} from '../../redux/auth/auth-operations';
import { FiSend } from 'react-icons/fi';
import NoPoster from '../../utils/images/no-poster.jpeg'
import { BiCameraMovie } from 'react-icons/bi'

class ShowDetailsPage extends Component {
  state = {
    id: null,
    name: null,
    genres: [],
    image: '',
    officialSite: null,
    premiered: null,
    status: null,
    summary: null,
      language: null,
    showFriendsList:false,

    error: '',
    isLoading: false,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const { showId } = this.props.match.params;
      const {
        data: {
          id,
          name,
          genres,
          image,
          officialSite,
          premiered,
          status,
          summary,
          language,
        },
      } = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
        if (!image) {
            this.setState({image:NoPoster})
        } else {
            this.setState({ image })
        }
      this.setState({
        id,
        name,
        genres,
        officialSite,
        premiered,
        status,
        summary,
        language,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  handleGoBack = () => {
    const { location, history } = this.props;

    history.push({
      pathname: location?.state?.from.pathname || routes.home,
    });
  };

  checkFavoritesInclude = () => {
    return this.props.favorites.some((item) => item === this.state.id);
  };
    
    checkWatchListInclude = () => {
        return this.props.watchlist.some((item) => item.id === this.state.id);
    };

  handleAddIdToFavorite = () => {
    this.props.onAddIdToFavorite(this.state.id, this.props.uid);
  };

  handleDeleteFromFavorite = () => {
    this.props.onDeleteFromFavorite(this.state.id, this.props.uid);
  };
    
    handleAddToWatchList = () => {
        const show = {
            id: this.state.id,
            uid: this.props.uid,
            name:this.state.name
        }
        this.props.onAddShowToWatchList(show)
    }
    
    showFriends = () => {
        this.setState((state) => {
            return { showFriendsList: !state.showFriendsList }
        })
    }

    handleSendToFriend = async (e) => {
        const { uid } = e.target.dataset;
        
        const db = getFirestore();
        const friendsRef = doc(db, 'users', uid);
        await updateDoc(friendsRef, {
            preferences: arrayUnion({ from: this.props.name, showId:this.state.id, showName:this.state.name }),
        });

        this.setState((state) => {
            return { showFriendsList: !state.showFriendsList }
        })
    }

  render() {
    const {
      id,
      name,
      genres,
      image,
      officialSite,
      premiered,
      status,
      summary,
      language,
      error,
        isLoading,
        showFriendsList
    } = this.state;
      const { friends } = this.props;
    return (
      <IconContext.Provider
        value={{
          color: 'white',
          className: 'global-class-name',
          size: '1.7rem',
        }}
      >
        <div className={styles.container}>
          <IoChevronBackCircleOutline
            onClick={this.handleGoBack}
            className={styles.arrow}
                />
          {!this.checkWatchListInclude() && <BiCameraMovie onClick={this.handleAddToWatchList} className={styles.watchlist} /> }
          {this.checkFavoritesInclude() ? (
            <AiFillHeart
              onClick={this.handleDeleteFromFavorite}
              className={styles.favorite}
            />
          ) : (
            <MdFavoriteBorder
              onClick={this.handleAddIdToFavorite}
              className={styles.favorite}
            />
                    )}
                
                <FiSend className={styles.send} onClick={this.showFriends} />
                {showFriendsList && friends.length > 0 && 
                    <ul className={styles.friendsList}>
                    {friends.map(({uid,name}) => 
                        <li onClick={this.handleSendToFriend} data-uid={uid} className={styles.friend} key={uid}>{name}</li>)}
                    </ul>
                }

                {image ? <img className={styles.image} src={image.original} alt='poster' /> : <div className={styles.preloader}>Loading picture...</div> }
          <div className={styles.info}>
            <p className={styles.name}>{name}</p>
            {genres.length > 0 ? (
              <div className={styles.genres}>
                {genres.map((genre) => (
                  <p className={styles.genre} key={genre}>
                    {genre}
                  </p>
                ))}
              </div>
            ) : (
              <p className={styles.nogenre}>
                <FaQuestionCircle /> genres
              </p>
            )}
            <a href={officialSite}>Official site</a>
            <p>Language: {language}</p>
            <p>Premiere: {premiered}</p>
            <p>Status: {status}</p>

            {ReactHtmlParser(summary)}
          </div>
        </div>
      </IconContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
    favorites: state.auth.favoriteShowsId,
    friends: state.auth.friends,
    name: state.auth.displayName,
    watchlist: state.auth.watchlist,
});

const mapDispatchToProps = (dispatch) => ({
  onAddIdToFavorite: (id, uid) => dispatch(addIdToFavorite(id, uid)),
    onDeleteFromFavorite: (id, uid) => dispatch(deleteIdFromFavorite(id, uid)),
    onAddShowToWatchList: (id, uid, name) => dispatch(addFilmToWatchList(id,uid,name))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowDetailsPage);
