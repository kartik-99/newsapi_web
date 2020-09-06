import React from "react";
import NewsCard from "./newsCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const split = (articles) => {
    let one = [];
    let two = [];
    let three = [];
    let i = 0;
    for (let item of articles) {
        i = i + 1;
        if (i % 3 === 1) {
            one[i] = item;
        } else if (i % 3 === 2) {
            two[i] = item;
        } else {
            three[i] = item;
        }
    }
    return { 1: one, 2: two, 3: three };
};

const NewsGrid = (props) => {
    const classes = useStyles();
    const splitArticles = split(props.news);
    return (
        // <div>
        <Grid
            container
            direction="row"
            className={classes.root}
            // spacing={2}
            alignItems="flex-start"
        >
            {Object.keys(splitArticles).map((key, index) => {
                const articles = splitArticles[key];
                return (
                    <Grid
                        key={key}
                        container
                        item
                        xs={12}
                        sm={4}
                        direction="column"
                        justify="space-around"
                        alignItems="center"
                    >
                        {Object.keys(articles).map((key, index) => {
                            return (
                                <NewsCard key={key} newsItem={articles[key]} />
                            );
                        })}
                    </Grid>
                );
            })}
        </Grid>
        // </div>
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
