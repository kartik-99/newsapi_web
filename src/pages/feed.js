import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import NewsGrid from "../components/newsGrid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeApiCall, setLoading, resetError, resetFeed } from "../actions";
import FeedSearchForm from "../components/feedSearchForm";

class Feed extends Component {
    constructor(props) {
        super(props);
        const apiObject = {
            url: "/top-headlines",
            label: "FEED",
            data: {
                pageSize: 20,
                page: 1,
            },
        };
        if (Object.values(this.props.sources).length > 0) {
            apiObject.data.sources = Object.values(this.props.sources)
                .map((source) => {
                    return source.id;
                })
                .join(",");
        } else {
            apiObject.data.sources = "google-news";
        }
        this.state = apiObject;
        // this.changePage = this.changePage.bind(this);
        // this.loadData = this.loadData.bind(this);
        // this.setSearchState = this.setSearchState.bind(this);
        // this.refreshFeed = this.refreshFeed.bind(this);
    }
    componentDidMount() {
        if (this.state.data.sources !== "") {
            console.log("calling from componentdidmount");
            this.loadData();
        }
    }

    loadData = () => {
        this.props.setLoading();
        this.props.makeApiCall(this.state);
    };

    changePage = (pageNo) => {
        this.props.resetError();
        this.setState(
            {
                ...this.state,
                data: {
                    ...this.state.data,
                    page: pageNo,
                },
            },
            () => {
                if (this.props.data.data.feed.articles[pageNo].length === 0) {
                    console.log("calling from changepage");
                    this.loadData();
                }
            }
        );
    };

    setSearchState = (apiObject) => {
        this.props.resetFeed();
        if (apiObject.data.sources === "all") {
            delete apiObject.data.sources;
            // apiObject.data.sources = originalSources;
        }
        this.setState(apiObject, () => {
            this.loadData();
        });
    };

    refreshFeed = () => {
        this.props.resetFeed();
        const apiObject = {
            url: "/top-headlines",
            label: "FEED",
            data: {
                pageSize: 20,
                page: 1,
            },
        };
        if (Object.values(this.props.sources).length > 0) {
            apiObject.data.sources = Object.values(this.props.sources)
                .map((source) => {
                    return source.id;
                })
                .join(",");
        } else {
            apiObject.data.sources = "google-news";
        }
        this.setState(apiObject, () => {
            this.loadData();
        });
    };

    render() {
        return (
            <div>
                <Grid container direction="row" style={{ paddingTop: "15%" }}>
                    <Grid item xs={false} sm={1} />
                    <Grid item xs={12} sm={10}>
                        <Grid container direction="column" item>
                            <Grid item>
                                <FeedSearchForm
                                    setSearchState={this.setSearchState}
                                    refreshFeed={this.refreshFeed}
                                />
                            </Grid>

                            <Grid item style={{ paddingTop: "5%" }}>
                                <NewsGrid
                                    totalPages={
                                        this.props.data.data.feed.results !== 0
                                            ? Math.ceil(
                                                  this.props.data.data.feed
                                                      .results /
                                                      this.state.data.pageSize
                                              )
                                            : 0
                                    }
                                    page={this.state.data.page}
                                    resultsPerPage={this.state.data.pageSize}
                                    label={this.state.label}
                                    changePage={this.changePage}
                                    error={this.props.data.data.error}
                                    news={
                                        Array.isArray(
                                            this.props.data.data.feed.articles
                                        ) |
                                        ((this.props.data.data.feed.articles
                                            .constructor ===
                                            Object) &
                                            (Object.keys(
                                                this.props.data.data.feed
                                                    .articles
                                            ).length ===
                                                0))
                                            ? []
                                            : this.props.data.data.feed
                                                  .articles[
                                                  this.state.data.page
                                              ]
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={false} sm={1} />
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data,
        sources: state.sources,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            makeApiCall: makeApiCall,
            setLoading: setLoading,
            resetError: resetError,
            resetFeed: resetFeed,
        },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(Feed);
