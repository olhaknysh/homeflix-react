import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { FaQuestionCircle } from 'react-icons/fa';
import Loader from '../../components/Loader';

import routes from '../../utils/routes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoPoster from '../../utils/images/no-poster.png';
import styles from './ShowDetailsPage.module.scss';
import ShowDetailsButtons from './ShowDetailsButtons'

class ShowDetailsPage extends Component {
    state = {
      id:null,
    name: null,
    genres: [],
    image: '',
    officialSite: null,
    premiered: null,
    status: null,
    summary: null,
      language: null,
    showFriendsList:false,

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
            this.setState({ image:image.original})
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
        toast.configure();
        toast.error(error.message)
      this.setState({ error: error.message });
    }
  }

  handleGoBack = () => {
    const { location, history } = this.props;
    history.push({
      pathname: location?.state?.from.pathname || routes.home,
    });
  };

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
        isLoading,
    } = this.state;
    return (
      <IconContext.Provider
        value={{
          color: 'white',
          className: 'global-class-name',
          size: '1.7rem',
        }}
      >
        <div className={styles.container}>
          {isLoading && <Loader />}
          {this.props.loading && <Loader />}
                
          {this.props.isAuthenticated && <ShowDetailsButtons id={id} showName={name} />}
          
          <IoChevronBackCircleOutline
            onClick={this.handleGoBack}
            className={styles.arrow}
          />

          {image ? (
            <img className={styles.image} src={image} alt='poster' />
          ) : (
            <div className={styles.preloader}>Loading picture...</div>
            )}
                
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
  loading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps)(ShowDetailsPage);
