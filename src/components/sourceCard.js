import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ForwardIcon from "@material-ui/icons/Forward";
import FavoriteIcon from "@material-ui/icons/Favorite";

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
    const langMap = {
        ar: "Arabic",
        de: "German",
        en: "English",
        es: "Spanish",
        fr: "French",
        he: "Hebrew",
        it: "Italian",
        nl: "Dutch",
        no: "Norwegian",
        pt: "Portuguese",
        ru: "Russian",
        se: "Northern Sami",
        ud: "Urdu",
        zh: "Chinese",
    };
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
                    <Grid item className={classes.gridRoot}>
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
                    <Grid item>
                        <IconButton>
                            <ForwardIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography
                    variant="body2"
                    // color="textSecondary"
                    component="p"
                    style={{ height: "60%" }}
                    // className={classes.littlePadding}
                >
                    {props.sourceItem.description}
                </Typography>
                <Grid container direction="row">
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
