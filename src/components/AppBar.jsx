import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBarContainer from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function AppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBarContainer position="static">
                <Toolbar variant="dense">
                    <Typography variant="h4" color="inherit">
                        Conway's Game Of Life
                    </Typography>
                </Toolbar>
            </AppBarContainer>
        </div>
    );
}
