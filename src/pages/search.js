import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import SearchForm from "../components/searchForm";
import NewsGrid from "../components/newsGrid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeApiCall, setLoading, resetError, resetSearch } from "../actions";

class Search extends Component {
    constructor(props) {
        super(props);
        this.setState({
            url: "/everything",
        });
    }

    onSubmit = (apiObject) => {
        this.props.resetSearch();
        this.setState(apiObject, () => {
            this.loadData();
        });
    };

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
                if (
                    this.props.data.data.search_results.articles[pageNo]
                        .length === 0
                ) {
                    console.log("calling from changepage");
                    this.loadData();
                }
            }
        );
    };

    render() {
        return (
            <div>
                <Grid container direction="row" style={{ paddingTop: "15%" }}>
                    <Grid item xs={false} sm={1} />
                    <Grid item xs={12} sm={10}>
                        <Grid container direction="column" item>
                            <Grid item>
                                <SearchForm
                                    setSearchState={this.setSearchState}
                                    refreshFeed={this.refreshFeed}
                                    onSubmit={this.onSubmit}
                                />
                            </Grid>

                            <Grid item style={{ paddingTop: "5%" }}>
                                {this.props.data.data.search_results.results >
                                    0 && (
                                    <NewsGrid
                                        totalPages={
                                            this.props.data.data.search_results
                                                .results !== 0
                                                ? Math.ceil(
                                                      this.props.data.data
                                                          .search_results
                                                          .results /
                                                          this.state.data
                                                              .pageSize
                                                  )
                                                : 0
                                        }
                                        page={this.state.data.page}
                                        resultsPerPage={
                                            this.state.data.pageSize
                                        }
                                        label={this.state.label}
                                        changePage={this.changePage}
                                        error={this.props.data.data.error}
                                        news={
                                            Array.isArray(
                                                this.props.data.data
                                                    .search_results.articles
                                            ) |
                                            ((this.props.data.data
                                                .search_results.articles
                                                .constructor ===
                                                Object) &
                                                (Object.keys(
                                                    this.props.data.data
                                                        .search_results.articles
                                                ).length ===
                                                    0))
                                                ? []
                                                : this.props.data.data
                                                      .search_results.articles[
                                                      this.state.data.page
                                                  ]
                                        }
                                    />
                                )}
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
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            makeApiCall: makeApiCall,
            setLoading: setLoading,
            resetError: resetError,
            resetSearch: resetSearch,
        },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);
