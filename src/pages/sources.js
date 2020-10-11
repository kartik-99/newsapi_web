import React, { Component } from "react";
import SourceGrid from "../components/sourceGrid";
import { sampleSourceRequest } from "../sampleData";
import Grid from "@material-ui/core/Grid";

class Sources extends Component {
    render() {
        return (
            <div>
                <Grid container direction="row" style={{ paddingTop: "15%" }}>
                    <Grid item xs={false} sm={1} />
                    <Grid item xs={12} sm={10}>
                        <SourceGrid sources={sampleSourceRequest.sources} />
                    </Grid>
                    <Grid item xs={false} sm={1} />
                </Grid>
            </div>
        );
    }
}

export default Sources;
