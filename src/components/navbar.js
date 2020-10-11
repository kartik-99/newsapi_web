import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    useScrollTrigger,
} from "@material-ui/core";
import useStyles from "../style";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

function Navbar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* <ElevationScroll {...props}> */}
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={props.onClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* </ElevationScroll> */}
        </div>
    );
}

export default Navbar;
