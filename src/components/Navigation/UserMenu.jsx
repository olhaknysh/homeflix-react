import Button from '@material-ui/core/Button';

const UserMenu = () => {
    // const dispatch = useDispatch();

    // const name = useSelector(getUsername);
    // const email = useSelector(getUserEmail);

    const handleLogout = () => {
        console.log('logout')
        // dispatch(logout());
    };

    return (
        <div >
            <p>Hello, Olya!</p>
            <p>olya@gmail.com</p>
            <Button size="small" type="button" onClick={handleLogout}>
                Logout
      </Button>
        </div>
    );
};

export default UserMenu;