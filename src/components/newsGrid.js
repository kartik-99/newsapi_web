import React from "react";
import NewsCard from "./newsCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addBookmark, removeBookmark } from "../actions";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: "auto",
    },
}));

const Paginator = (props) => {
    const handleChange = (event, value) => {
        props.changePage(value);
    };
    return (
        <Pagination
            count={props.totalPages}
            defaultPage={props.page}
            boundaryCount={2}
            onChange={handleChange}
        />
    );
};

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

const checkBookmarks = (n, b) => {
    for (let i = 0; i < n.length; i++) {
        var flag = false;
        for (let j = 0; j < b.length; j++) {
            if (n[i].url === b[j].url) {
                flag = true;
                break;
            }
        }
        if (flag === true) {
            n[i]["isBookmark"] = true;
        } else {
            n[i]["isBookmark"] = false;
        }
    }
    return n;
};

const NewsGrid = (props) => {
    const classes = useStyles();
    var news = checkBookmarks(props.news, Object.values(props.bookmarks));

    var splitArticles = split(news);

    const manageBookmarks = (newsItem) => {
        if (newsItem.isBookmark) {
            props.removeBookmark(newsItem);
        } else {
            props.addBookmark(newsItem);
        }
    };

    let results = 0;
    switch (props.label) {
        case "FEED":
            results = props.apiData.data.feed.results;
            break;
        case "SEARCH":
            results = props.apiData.data.search_results.results;
            break;
        default:
            results = 0;
    }

    let totalPages = Math.ceil(results / props.resultsPerPage);
    let showPaginator = totalPages > 1 ? true : false;

    let pager = (
        <Grid item xs={12} align="center" className={classes.root}>
            <Paginator
                page={props.page}
                changePage={props.changePage}
                totalPages={totalPages}
            />
        </Grid>
    );

    return (
        <Grid container direction="column" className={classes.root}>
            {showPaginator && pager}
            <Grid container item direction="row" alignItems="flex-start">
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
                                    <NewsCard
                                        key={key}
                                        newsItem={articles[key]}
                                        manageBookmarks={manageBookmarks}
                                    />
                                );
                            })}
                        </Grid>
                    );
                })}
            </Grid>
            {showPaginator && pager}
        </Grid>
    );
};

function mapStateToProps(state) {
    return {
        bookmarks: state.bookmarks,
        apiData: state.data,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        { addBookmark: addBookmark, removeBookmark: removeBookmark },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(NewsGrid);
