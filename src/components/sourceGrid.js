import React from "react";
import SourceCard from "./sourceCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { addSource, removeSource } from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const checkFavourites = (n, b) => {
    for (let i = 0; i < n.length; i++) {
        var flag = false;
        for (let j = 0; j < b.length; j++) {
            if (n[i].url === b[j].url) {
                flag = true;
                break;
            }
        }
        if (flag === true) {
            n[i]["isFav"] = true;
        } else {
            n[i]["isFav"] = false;
        }
    }
    return n;
};

const SourceGrid = (props) => {
    const classes = useStyles();
    const sources = checkFavourites(
        props.sources,
        Object.values(props.favourites)
    );
    const manageFavourites = (sourceItem) => {
        if (sourceItem.isFav) {
            props.removeSource(sourceItem);
        } else {
            props.addSource(sourceItem);
        }
    };

    return (
        <Grid
            container
            direction="row"
            className={classes.root}
            alignItems="stretch"
            spacing={2}
        >
            {sources.map((source) => {
                return (
                    <Grid key={source.id} item xs={12} sm={4}>
                        <div style={{ height: "100%" }}>
                            <SourceCard
                                sourceItem={source}
                                manageFavourites={manageFavourites}
                            />
                        </div>
                    </Grid>
                );
            })}
        </Grid>
    );
};

function mapStateToProps(state) {
    return {
        favourites: state.sources,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        { addSource: addSource, removeSource: removeSource },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(SourceGrid);
