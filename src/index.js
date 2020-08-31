import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./navbar";
import MasterDrawer from "./drawer";

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
            </Router>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("root"));
