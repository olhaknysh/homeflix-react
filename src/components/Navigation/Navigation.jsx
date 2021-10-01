import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';

import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { MdFavoriteBorder } from 'react-icons/md';

import routes from '../../utils/routes';
import styles from './Navigation.module.scss';

const Navigation = () => (
  <div className={styles.container}>
    <IconContext.Provider value={{ color: 'white', size: '1.5rem' }}>
      <NavLink
        activeClassName={styles.selected}
        className={styles.item}
                to={routes.home}
                exact
      >
        <AiFillHome />
      </NavLink>
      <NavLink
        activeClassName={styles.selected}
        className={styles.item}
        exact
        to={routes.search}
      >
        <FiSearch />
      </NavLink>
      <NavLink
        activeClassName={styles.selected}
        className={styles.item}
        exact
        to={routes.favorites}
      >
        <MdFavoriteBorder />
      </NavLink>
      <NavLink
        activeClassName={styles.selected}
        className={styles.item}
        to={routes.account}
      >
        <AiOutlineUser />
      </NavLink>
    </IconContext.Provider>
  </div>
);

export default Navigation;
