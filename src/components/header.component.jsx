import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Modal, TextField, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { BaseReducer, Type } from '../store/reducers';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap",
        },
        loginButton: {
            flexShrink: 1,
        },
        title: {
            flexGrow: 1,
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        links: { color: 'white', textDecoration: 'none' }
    }),
);
function getModalStyle() {
    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
function ButtonAppBar({ base, updateUser, ...props }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [formState, setFormState] = React.useState({});
    const [userData, setUserData] = [base.user, updateUser];
    const handleOpen = (type = false) => {
        setOpen(type);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Login Here</h2>
            <div id="simple-modal-description">
                <form action="#" >
                    <TextField id="Enter-Name" label="Enter Your Name" color="secondary" onChange={(e) => {
                        setFormState({ ...formState, name: e.target.value });
                    }} />
                    <TextField id="Enter-Name" label="Enter Mail Id" color="secondary" onChange={(e) => {
                        setFormState({ ...formState, mail: e.target.value })
                    }} />

                    <button type="submit" style={{ margin: 20 }} onClick={(e) => {
                        e.preventDefault();
                        const { name, mail } = formState;
                        if (name?.trim() && mail?.trim()) {
                            let isValEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail);
                            if (!isValEmail) {
                                toast.warn('Please Enter A Valid Mail');
                                return '';
                            }
                            setUserData({ ...formState, favorites: [] });
                            setFormState({});
                            handleOpen(false);
                            toast.success(`Wow ${name} !! You Logged In Successfully !!`);
                        } else {
                            toast.warn('Please Check Some Field Missing !!');
                        }
                    }}>Login</button>
                </form>
            </div>
        </div>
    );
    useEffect(() => {
        let user = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            setUserData({ ...user });
        }
    }, []);
    return (
        <div className={classes.root} >
            <AppBar position="static">
                <Toolbar>
                    <Typography > <Link to="/" className={classes.links}>Home</Link>  &nbsp; &nbsp;</Typography>
                    {userData?.name && <Typography > <Link to="/fav" className={classes.links}>My Favorites</Link></Typography>}
                    <Typography variant="h6" className={classes.title}></Typography>
                    {userData?.name && <Typography variant="h6" > Hello {userData?.name} &nbsp;</Typography>}
                    {!userData?.name ? <Button color="inherit" className={classes.loginButton}
                        onClick={() => handleOpen(true)}>Login</Button> :
                        <Button color="inherit" className={classes.loginButton}
                            onClick={() => {
                                setUserData({});
                                localStorage.removeItem('user');
                            }}><Link to="/" className={classes.links}>Logout</Link></Button>}
                </Toolbar>
            </AppBar>
            <Modal
                open={open}
                onClose={() => handleOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (payload) => {
            localStorage.setItem('user', JSON.stringify(payload));
            dispatch({ type: Type.SET_USER, payload: payload });
        }
    }
}
export const Header = connect(BaseReducer, mapDispatchToProps)(ButtonAppBar);
