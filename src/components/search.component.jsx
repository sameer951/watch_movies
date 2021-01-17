import { IconButton, InputBase, Paper } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useRef } from "react";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            padding: '2px 40px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            borderRadius: "20px"
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);
const useDebouncer = () => {
    var timer = setTimeout(() => { }, 0);
    return (fn, delay = 500) => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    }
}
const debounce = useDebouncer();

const SearchPannel = (props) => {
    const classes = useStyles();
    const { placeholder, triggerSearch, triggerClear } = props;
    let searchInpt = useRef();
    return (
        <React.Fragment>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder={placeholder}
                    inputProps={{ 'aria-label': placeholder, 'ref': searchInpt }}
                    onChange={() => {
                        debounce(() => {
                            triggerSearch(searchInpt.current?.value);
                        })
                    }}
                />
                {searchInpt.current?.value && <IconButton onClick={(e) => {
                    e.preventDefault();
                    triggerClear();
                    searchInpt.current.value = ''
                }}>
                    <ClearIcon />
                </IconButton>}
                <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={(e) => {
                    e.preventDefault();
                    triggerSearch(searchInpt.current?.value);
                }}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </React.Fragment>
    )

}
export const SearchInput = SearchPannel;