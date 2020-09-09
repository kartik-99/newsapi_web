import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import SourceGrid from "../components/sourceGrid";
import Grid from "@material-ui/core/Grid";

class Favourites extends Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.sources).length === 0 ? (
                    <Typography
                        variant="h4"
                        color="inherit"
                        style={{
                            align: "center",
                            textAlign: "center",
                            padding: "300px",
                        }}
                    >
                        Go ahead and add the news channels you like!. No
                        favourites channels as of now
                    </Typography>
                ) : (
                    <Grid
                        container
                        direction="row"
                        style={{ paddingTop: "15%" }}
                    >
                        <Grid item xs={false} sm={1} />
                        <Grid item xs={12} sm={10}>
                            <SourceGrid
                                sources={Object.values(this.props.sources)}
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
        sources: state.sources,
    };
}

export default connect(mapStateToProps)(Favourites);
