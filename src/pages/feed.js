import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import NewsGrid from "../components/newsGrid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeApiCall, setLoading } from "../actions";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "/top-headlines",
            label: "FEED",
            data: {
                sources: Object.values(this.props.sources)
                    .map((source) => {
                        return source.id;
                    })
                    .join(","),

                pageSize: 20,
                page: 1,
            },
        };
        this.changePage = this.changePage.bind(this);
        this.loadData = this.loadData.bind(this);
        console.log(this.state);
    }
    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.props.setLoading();
        this.props.makeApiCall(this.state);
    };

    changePage(pageNo) {
        this.setState(
            {
                ...this.state,
                data: {
                    ...this.state.data,
                    page: pageNo,
                },
            },
            () => this.loadData()
        );
    }

    render() {
        return (
            <div>
                {this.state.data.sources.length === 0 ? (
                    <Typography
                        variant="h4"
                        color="inherit"
                        style={{
                            align: "center",
                            textAlign: "center",
                            padding: "300px",
                        }}
                    >
                        Welcome! News from your favourite news sources comes up
                        here. Go ahead and add a few news sources to your
                        favourites!
                    </Typography>
                ) : (
                    <Grid
                        container
                        direction="row"
                        style={{ paddingTop: "15%" }}
                    >
                        <Grid item xs={false} sm={1} />

                        <Grid item xs={12} sm={10}>
                            <NewsGrid
                                page={this.state.data.page}
                                resultsPerPage={this.state.data.pageSize}
                                label={this.state.label}
                                changePage={this.changePage}
                                news={
                                    // sampleRequest.articles
                                    this.props.data.data.feed.articles[
                                        this.state.data.page
                                    ]
                                }
                            />
                        </Grid>
                        <Grid item xs={false} sm={1} />
                    </Grid>
                )}
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
        { makeApiCall: makeApiCall, setLoading: setLoading },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(Feed);
