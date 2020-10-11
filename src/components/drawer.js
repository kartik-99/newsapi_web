import React from "react";
import {
    Drawer,
    CssBaseline,
    Toolbar,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@material-ui/core";
import useStyles from "../style";

import ClearAllIcon from "@material-ui/icons/ClearAll"; // feed
import BookmarksIcon from "@material-ui/icons/Bookmarks"; // bookmarks
import RssFeedIcon from "@material-ui/icons/RssFeed"; // sources
import FindInPageIcon from "@material-ui/icons/FindInPage"; // search top headlines
import StarsIcon from "@material-ui/icons/Stars"; // fav sources
import { NavLink } from "react-router-dom";

export default function MasterDrawer(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />

            <Drawer
                className={classes.drawer}
                variant="temporary"
                onEscapeKeyDown={props.onClick}
                onBackdropClick={props.onClick}
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListSubheader>News</ListSubheader>
                        <ListItem
                            component={NavLink}
                            to="/feed"
                            color="black"
                            activeClassName="Mui-selected"
                            onClick={props.onClick}
                        >
                            <ListItemIcon>
                                <ClearAllIcon />
                            </ListItemIcon>
                            <ListItemText primary="Feed" />
                        </ListItem>
                        <ListItem
                            component={NavLink}
                            to="/bookmarks"
                            activeClassName="Mui-selected"
                            onClick={props.onClick}
                        >
                            <ListItemIcon>
                                <BookmarksIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bookmarks" />
                        </ListItem>
                        <ListItem
                            component={NavLink}
                            to="/search"
                            activeClassName="Mui-selected"
                            onClick={props.onClick}
                        >
                            <ListItemIcon>
                                <FindInPageIcon />
                            </ListItemIcon>
                            <ListItemText primary="Search" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListSubheader>News Channels</ListSubheader>
                        <ListItem
                            component={NavLink}
                            to="/sources"
                            activeClassName="Mui-selected"
                            onClick={props.onClick}
                        >
                            <ListItemIcon>
                                <RssFeedIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Sources" />
                        </ListItem>
                        <ListItem
                            component={NavLink}
                            to="/favourites"
                            activeClassName="Mui-selected"
                            onClick={props.onClick}
                        >
                            <ListItemIcon>
                                <StarsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Favourite Channels" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}
