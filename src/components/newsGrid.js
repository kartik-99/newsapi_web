import React from "react";
import NewsCard from "./newsCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: "200px",
        paddingLeft: "100px",
        paddingRight: "100px",
    },
}));

const NewsGrid = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={3} className={classes.root}>
                {props.news.map((newsItem) => {
                    return (
                        <Grid item xs={4}>
                            <NewsCard newsItem={newsItem} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
        // <div>
        //     <Grid container spacing={3}>
        //         {props.news.map((newsItem) => {
        //             return(<Grid item xs={4}><NewsCard newsItem={newsItem} /><Grid>);
        //         })}
        //     </Grid>
        // </div>
    );
};

export default NewsGrid;
