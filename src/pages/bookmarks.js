import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import NewsGrid from "../components/newsGrid";

class Bookmarks extends Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.bookmarks).length === 0 ? (
                    <Typography
                        variant="h4"
                        color="inherit"
                        style={{
                            align: "center",
                            textAlign: "center",
                            padding: "300px",
                        }}
                    >
                        Go ahead and bookmark the news articles you like!. No
                        bookmarks as of now
                    </Typography>
                ) : (
                    <Grid
                        container
                        direction="row"
                        style={{ paddingTop: "15%" }}
                    >
                        <Grid item xs={false} sm={1} />
                        <Grid item xs={12} sm={10}>
                            <NewsGrid
                                news={Object.values(this.props.bookmarks)}
                            />
                        </Grid>
                        <Grid item xs={false} sm={1} />
                    </Grid>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        bookmarks: state.bookmarks,
    };
}

export default connect(mapStateToProps)(Bookmarks);
