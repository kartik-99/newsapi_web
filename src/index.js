import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import MasterDrawer from "./components/drawer";
import Feed from "./pages/feed";
import Bookmarks from "./pages/bookmarks";
import Search from "./pages/search";
import Sources from "./pages/sources";
import Favourites from "./pages/favourites";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import allData from "./reducers/index";
import apiMiddleware from "./apiMiddleware";

const store = createStore(allData, applyMiddleware(apiMiddleware));

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
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
                <Provider store={store}>
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
                        <Route path="/search">
                            <Search />
                        </Route>
                        <Route exact path="/favourites">
                            <Favourites />
                        </Route>
                        <Route exact path="/sources">
                            <Sources />
                        </Route>
                        <Route path="/">
                            <Feed />
                        </Route>
                    </Switch>
                </Provider>
            </Router>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("root"));
