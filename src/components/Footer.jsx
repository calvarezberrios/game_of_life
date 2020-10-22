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
        top: "auto",
        bottom: 0,
    },
}));

export default function FooterBar() {
    const classes = useStyles();

    return (
        <AppBarContainer position="fixed" className={classes.root}>
            <Toolbar variant="dense">
                <Typography variant="h7" color="inherit">
                    &copy; Carlos "Mannie" Alvarez-Berrios, Lambda School - Game Of Life Project, 2020
                </Typography>
            </Toolbar>
        </AppBarContainer>
    );
}
