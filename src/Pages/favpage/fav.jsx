import Axios from 'axios';
import React from 'react';
import { BaseReducer, Type } from '../../store/reducers';
import { connect } from 'react-redux';
import { MovieCard } from '../../components/moviecard.component';
import { Box } from '@material-ui/core';
class Favorite extends React.Component {


    render() {
        let { popularData, user: { favorites } } = this.props.base;
        return (<div>
            {favorites?.length ? <div>
                <h1 style={{
                    textAlign: 'center',
                    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
                    margin: '4px'
                }}>My Favorite Movies</h1>
                <FlexBox>
                    {favorites?.length && favorites.map((movie, index) => (
                        <Box p={1} key={`movie${index}`} width={247}>
                            <MovieCard movie={movie} history={this.props.history}></MovieCard>
                        </Box>))}
                </FlexBox>
            </div> : <h3>No Data Found !!</h3>}
        </div>)
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        is_loading: (payload) => { dispatch({ type: Type.IS_LOADING, payload: payload }) },
        updatePopularList: (payload) => { dispatch({ type: Type.POPULAR_MOVIES, payload }) }
    }
}

export const FavoritePage = connect(BaseReducer, mapDispatchToProps)(Favorite);

const FlexBox = ({ children }) => {
    return (<Box
        display="flex" flexWrap="wrap" width="100%"
        // alignContent="flex-start"
        justifyContent="center" m={1} p={1}>
        {children}
    </Box>);
}