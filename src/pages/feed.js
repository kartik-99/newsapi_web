import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import NewsGrid from "../components/newsGrid";
import { sampleRequest } from "../sampleData";
class Feed extends Component {
    render() {
        return (
            <div>
                <Grid container direction="row" style={{ paddingTop: "15%" }}>
                    <Grid item xs={false} sm={1} />
                    <Grid item xs={12} sm={10}>
                        <NewsGrid news={sampleRequest.articles} />
                    </Grid>
                    <Grid item xs={false} sm={1} />
                </Grid>
            </div>
        );
    }
}

export default Feed;
