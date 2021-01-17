import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { connect } from 'react-redux';
import { BaseReducer, Type } from '../store/reducers';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            maxWidth: 345,
            cursor: 'pointer',
            transition: 'all 200ms ease-out',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'
            }
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        avatar: { backgroundColor: red[500], },
        title_div: { minHeight: "88px" },
        title: { display: "block" },
        cardContent: { paddingTop: '4px', paddingBottom: '1px', textAlign: 'center' },
        errorIcon: {
            color: 'red',
        },
    }),
);

function ViewCard(props) {
    const classes = useStyles();
    const {
     
        poster_path, release_date, title, id
    } = props.movie;
    const { base, base: { user }, updateUser, movie } = props;
    const onFavClick = (e) => {
        e.stopPropagation();
        let isInclude = user?.favorites?.find(mv => id == mv.id);
        let fav = [...user.favorites];
        if (isInclude) {
            fav = user.favorites.filter(mv => id !== mv.id);
        } else {
            fav.push(movie);
        }
        updateUser({ ...user, favorites: fav });
    }
    return (
        <Card className={classes.root} onClick={() => { props.history.push(`/movie/${id}`) }}>
            <CardMedia
                className={classes.media}
                image={`https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}`}
                title="Paella dish"
            />
            <CardContent className={classes.cardContent}>
                <div className={classes.title_div}>
                    <strong className={classes.title}>{title}</strong>
                    <div>{release_date} <span>
                        {user?.name?.trim() && <IconButton aria-label="add to favorites" onClick={onFavClick}>
                            <FavoriteIcon className={user?.favorites?.find(mv => id == mv.id) ? classes.errorIcon : ''} />
                        </IconButton>}
                    </span>
                    </div>
                </div>
            </CardContent>
        </Card>
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
export const MovieCard = connect(BaseReducer, mapDispatchToProps)(ViewCard);