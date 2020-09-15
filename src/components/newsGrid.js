import React from "react";
import NewsCard from "./newsCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addBookmark, removeBookmark } from "../actions";
import Pagination from "@material-ui/lab/Pagination";
import { Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    loaderRoot: {
        flexGrow: 1,
        margin: "auto",
    },
    root: {
        flexGrow: 1,
        margin: "auto",
        paddingBottom: "10%",
    },
}));

const Paginator = (props) => {
    const handleChange = (event, value) => {
        props.changePage(value);
    };
    return (
        <Pagination
            count={props.totalPages}
            page={props.page}
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
    let toShow = [];
    let results = 0;
    switch (props.label) {
        case "FEED":
            results = props.apiData.data.feed.results;
            toShow = props.apiData.data.feed.articles;
            break;
        case "SEARCH":
            results = props.apiData.data.search_results.results;
            toShow = props.apiData.data.search_results.articles;
            break;
        default:
            results = 0;
            toShow = [];
    }

    if (
        (results === 0) |
        (toShow === undefined) |
        (toShow[props.page] === undefined)
    ) {
        return (
            <Box flexGrow={1} alignItems="center">
                {props.apiData.loading && (
                    <Box margin="auto" flexGrow={1} align="center">
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        );
    }

    var news = checkBookmarks(
        toShow[props.page],
        Object.values(props.bookmarks)
    );

    var splitArticles = split(news);

    const manageBookmarks = (newsItem) => {
        if (newsItem.isBookmark) {
            props.removeBookmark(newsItem);
        } else {
            props.addBookmark(newsItem);
        }
    };

    let totalPages = Math.ceil(results / props.resultsPerPage);
    let showPaginator = totalPages > 1 ? true : false;

    let pager = (
        <Grid item xs={12} align="center" className={classes.loaderRoot}>
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
            {props.apiData.loading | (toShow[props.page] === undefined) ? (
                <Box margin="auto" paddingTop="10%" paddingBottom="10%">
                    <CircularProgress />
                </Box>
            ) : (
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
            )}
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
