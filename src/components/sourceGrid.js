import React from "react";
import SourceCard from "./sourceCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const SourceGrid = (props) => {
    const classes = useStyles();
    return (
        <Grid
            container
            direction="row"
            className={classes.root}
            alignItems="stretch"
            spacing={2}
        >
            {props.sources.map((source) => {
                return (
                    <Grid key={source.id} item xs={12} sm={4}>
                        <div style={{ height: "100%" }}>
                            <SourceCard sourceItem={source} />
                        </div>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default SourceGrid;
