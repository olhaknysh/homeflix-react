import { NavLink } from 'react-router-dom';

import routes from '../../utils/routes';

const AuthNav = () => {
    return (
        <>
            <NavLink to={routes.register}>Register</NavLink>
            <NavLink to={routes.login}>Sign in</NavLink>
        </>
    );
};

export default AuthNav;