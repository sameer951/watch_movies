import Axios from 'axios';
import React from 'react';
import { SearchInput } from '../../components/search.component';
import { BASE_URL, URL_API_KEY } from '../../App';
import { BaseReducer, Type } from './../../store/reducers';
import { connect } from 'react-redux';
import { MovieCard } from '../../components/moviecard.component';
import { Box } from '@material-ui/core';
class Home extends React.Component {

    state = { searchResults: [], searchQuery: '' };

    searchMovie(input) {
        let search_url = `${BASE_URL}/search/movie`;
        let config = {
            params: {
                api_key: URL_API_KEY,
                query: input
            }
        }
        this.props.is_loading(true);
        Axios.get(search_url, config).then((res) => {
            this.setState((prevState) => { return { ...prevState, searchResults: res.data.results, searchQuery: input } });
        }).catch(err => { console.log(err); })
            .finally(() => { this.props.is_loading(false); })
    }
    getPopularMovies() {
        let url = `${BASE_URL}/movie/popular`;
        let config = { params: { api_key: URL_API_KEY } };
        let { popularData } = this.props.base;
        if (!popularData) {
            this.props.is_loading(true);
            Axios.get(url, config).then((res) => {
                if (res.data) {
                    this.props.updatePopularList(res.data.results)
                }
            }).catch(err => { console.log(err); })
                .finally(() => { this.props.is_loading(false); })
        }

    }

    componentDidMount() {
        this.getPopularMovies();
    }
    render() {
        let { popularData, user } = this.props.base;
        let { searchResults, searchQuery } = this.state;
        return (<div>
            <SearchInput placeholder={'Search for a movie, tv show ......'} triggerSearch={this.searchMovie.bind(this)}
                triggerClear={() => { this.setState({ ...this.state, searchQuery: '' }) }}></SearchInput>
            {!searchQuery ? <div>
                <h1 style={{
                    textAlign: 'center',
                    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
                    margin: '4px'
                }}>Popular Movies</h1>
                <FlexBox>
                    {popularData?.length && popularData.map((movie, index) => (
                        <Box p={1} key={`movie${index}`} width={247}>
                            <MovieCard movie={movie} history={this.props.history}></MovieCard>
                        </Box>))}
                </FlexBox>
            </div> :
                <div>
                    <h1 style={{
                        textAlign: 'center',
                        "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
                        margin: '4px'
                    }}>: Searched Result :</h1>
                    <FlexBox>
                        {searchResults?.length ? searchResults.map((movie, index) => (
                            <Box p={1} key={`movie${index}`} width={247}>
                                <MovieCard movie={movie} history={this.props.history}></MovieCard>
                            </Box>)) : <h3>No Data Found !!</h3>}
                    </FlexBox>
                </div>}
        </div>)
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        is_loading: (payload) => { dispatch({ type: Type.IS_LOADING, payload: payload }) },
        updatePopularList: (payload) => { dispatch({ type: Type.POPULAR_MOVIES, payload }) }
    }
}

export const HomePage = connect(BaseReducer, mapDispatchToProps)(Home);

const FlexBox = ({ children }) => {
    return (<Box
        display="flex" flexWrap="wrap" width="100%"
        // alignContent="flex-start"
        justifyContent="center" m={1} p={1}>
        {children}
    </Box>);
}