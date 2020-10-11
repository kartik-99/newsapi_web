import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    CardContent,
    Typography,
    Chip,
    Grid,
    IconButton,
    Card,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { langMap } from "../sampleData";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "left",
        margin: "3%",
        paddingTop: "2%",
        background: (p) => p.color,
        height: "100%",
    },
    media: {
        height: 0,
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    gridRoot: {
        flexGrow: 1,
    },
    bold: {
        fontWeight: "bold",
    },
    author: {
        fontSize: "10",
        fontStyle: "italic",
    },
    dateText: {
        fontWeight: "fontWeightLight",
        textAlign: "right",
        fontFamily: "Monospace",
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    littlePadding: {
        paddingTop: "5%",
    },
    white: {
        background: "white",
    },
    red: {
        color: "red",
    },
}));

const SourceCard = (props) => {
    const countryMap = {
        ar: "Argentina",
        au: "Australia",
        br: "Brazil",
        ca: "Canada",
        de: "Germany",
        es: "Spain",
        fr: "France",
        gb: "Great Britain",
        ie: "Ireland",
        in: "India",
        is: "Iceland",
        it: "Italy",
        nl: "Netherlands",
        no: "Norway",
        pk: "Pakistan",
        ru: "The Russian Federation",
        sa: "Saudi Arabia",
        se: "Sweden",
        us: "United States",
        za: "South Africa",
        zh: "(Unknown country)",
    };

    const categoryMap = {
        business: "#9400D3", //violet
        entertainment: "#4B0082", //indigo
        general: "#0000FF", //blue
        health: "#00FF00", //green
        science: "#FFFF00", //yellow
        sports: "#FF7F00", //orange
        technology: "#FF0000", //red
    };

    const gradient = categoryMap[props.sourceItem.category]; //"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)";
    const p = {
        color: gradient,
    };
    const classes = useStyles(p);

    return (
        <Card className={classes.root}>
            <CardContent
                className={`${classes.white} ${classes.gridRoot}`}
                style={{ height: "100%" }}
            >
                <Grid container direction="row" className={classes.gridRoot}>
                    <Grid
                        item
                        className={classes.gridRoot}
                        onClick={() => {
                            window.open(props.sourceItem.url, "_blank").focus();
                        }}
                    >
                        <Typography variant="h6" className={classes.bold}>
                            {props.sourceItem.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label="add to favourites"
                            onClick={() => {
                                props.manageFavourites(props.sourceItem);
                            }}
                        >
                            {props.sourceItem.isFav ? (
                                <FavoriteIcon className={classes.red} />
                            ) : (
                                <FavoriteIcon />
                            )}
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography
                    variant="body2"
                    component="p"
                    style={{ height: "60%" }}
                    onClick={() => {
                        window.open(props.sourceItem.url, "_blank").focus();
                    }}
                >
                    {props.sourceItem.description}
                </Typography>
                <Grid
                    container
                    direction="row"
                    onClick={() => {
                        window.open(props.sourceItem.url, "_blank").focus();
                    }}
                >
                    <Grid item>
                        <Chip
                            color="primary"
                            label={langMap[props.sourceItem.language]}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Chip
                            color="secondary"
                            label={countryMap[props.sourceItem.country]}
                        />
                    </Grid>
                    <Grid item xs={6}></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SourceCard;
