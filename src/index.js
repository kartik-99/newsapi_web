import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./navbar";
import MasterDrawer from "./drawer";
import Feed from "./pages/feed";
import Bookmarks from "./pages/bookmarks";
import SearchAll from "./pages/searchAll";
import SearchTop from "./pages/searchTop";
import Sources from "./pages/sources";

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: true,
        };
    }

    toggleDrawer() {
        this.setState({
            drawerOpen: !this.state.drawerOpen,
        });
    }
    closeDrawer() {
        this.setState({
            drawerOpen: false,
        });
    }
    render() {
        return (
            <Router>
                <Navbar onClick={() => this.toggleDrawer()} />
                <MasterDrawer
                    open={this.state.drawerOpen}
                    onClick={() => this.closeDrawer()}
                />
                <Switch>
                    <Route path="/feed">
                        <Feed />
                    </Route>
                    <Route path="/bookmarks">
                        <Bookmarks />
                    </Route>
                    <Route path="/search/top">
                        <SearchTop />
                    </Route>
                    <Route path="/search/all">
                        <SearchAll />
                    </Route>
                    <Route exact path="/sources/favourites">
                        <Sources />
                    </Route>
                    <Route exact path="/sources">
                        <Sources />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("root"));
