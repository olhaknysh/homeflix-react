import { useState,useRef,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { googleLogin, login } from '../../redux/auth/auth-operations';
import { isLoading } from '../../redux/auth/auth-selectors';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import { ImGoogle } from 'react-icons/im';

import routes from '../../utils/routes';
import styles from './LoginPage.module.scss';


const initialValue = {
  email: '',
  password: '',
};


const LoginPage = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [state, setState] = useState(initialValue);
  const { email, password } = state;

  useEffect(() => {
      inputRef.current.focus();
    }, []);

   
  const loading = useSelector(isLoading);
    
  const handleGoogleLogin = () => dispatch(googleLogin());

  const handleInputChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
    setState(initialValue);
  };

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <IconContext.Provider
        value={{ color: 'white', className: 'global-class-name' }}
      >
        <h2>Login</h2>
        <p className={styles.text}>Log in with one of following options</p>
        <Button type='button' handleEvent={handleGoogleLogin}>
          <ImGoogle />
        </Button>
      </IconContext.Provider>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <div className={styles.field}>
          <label htmlFor='email'>Email</label>
          <input
            value={email}
            type='text'
            id='email'
            name='email'
            placeholder='Enter you email'
            onChange={handleInputChange}
            className={styles.input}
            ref={inputRef}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor='password'>Password</label>
          <input
            value={password}
            type='text'
            id='password'
            name='password'
            placeholder='Enter you password'
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <button className={styles.button} type='submit'>
          Log in
        </button>
      </form>

      <p>
        Don’t have an account?
        <Link className={styles.link} to={routes.register}>
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
