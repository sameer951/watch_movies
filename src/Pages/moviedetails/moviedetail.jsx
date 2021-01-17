import { createStyles, makeStyles } from '@material-ui/core';
import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { BASE_URL, URL_API_KEY } from '../../App';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            height: "100vh",
            position: "fixed",
            // position: 'absolute',
            top: 0, left: 0,
            width: "100vw",
            opacity: 0.3,
            // transform: "translate(-10vw,-20vh)",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
        },
        left_view: {
            position: "absolute",
            left: "10vw"
        },
        right_view: {
            position: "absolute",
            right: "10vw"
        },
        flex_container: {
            display: "flex",
            flexWrap: "wrap",
            fontSize: "30px",
            textAlign: 'center',
            position: "absolute",
            left: "10vw",
            top: "10vh",
            // overflow: "scroll"
        },
        flex_item_left: {
            padding: "10px",
            flex: "50 %",
        },

        flex_item_right: {
            padding: "10px",
            flex: "50 %",
            maxWidth: "70%",
            color: "black",
            textShadow: '2px 1px #ffffff',
            textAlign: 'center'
        }
    }),
);

const Detail = (props) => {
    const classes = useStyles();
    const { match: { params } } = props;
    const [details, setDetails] = useState({});

    useEffect(() => {
        let url = `${BASE_URL}/movie/${params.id}`;
        let config = { params: { api_key: URL_API_KEY } };
        Axios.get(url, config).then((res) => {
            // console.log("res==>", res);
            setDetails(res.data);
        }).catch(err => { console.log(err); });
    }, []);
    const {
        // adult, original_title, popularity,
        overview, id, backdrop_path,
        poster_path, release_date, title,
        // vote_average, vote_count, 
    } = details;
    let backUrl = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path}`;
    let poster_pic = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`;
    return (
        <Fragment>
            {id ? <Fragment>
                <div style={{ backgroundImage: `url(${backUrl})` }} className={classes.root}></div>
                <div className={classes.flex_container}>
                    <div className={classes.flex_item_left}>
                        <img src={poster_pic} alt={title} />
                    </div>
                    <div className={classes.flex_item_right}>
                        <h2 style={{ padding: "16px", marginBottom: 0 }}>{title}</h2>
                        <div style={{ display: "inline-block" }}> {release_date}</div>
                        <h4>Overview</h4>
                        <div style={{ display: "inline-block", fontSize: '20px' }}> {overview} </div>
                    </div>
                </div>
            </Fragment> : <h3>Data Fetching ...</h3>}


        </Fragment>)
}
export const MovieDetails = Detail;