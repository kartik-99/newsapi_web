import {
    SET_LOADING,
    SET_LOADING_STOP,
    SET_FEED,
    SET_SEARCH_RESULTS,
    SET_SOURCES,
    RESET_FEED,
    RESET_SEARCH,
    SET_ERROR,
    RESET_ERROR,
} from "../actions";

const defaultState = {
    loading: false,
    error: "",
    data: {
        feed: {
            results: 0,
            articles: {},
        },
        search_results: {
            results: 0,
            articles: {},
        },
        sources: [],
    },
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_LOADING_STOP:
            return {
                ...state,
                loading: false,
            };
        case SET_FEED:
            if (Object.keys(state.data.feed.articles).length === 0) {
                let articlesObject = {
                    1: action.payload.response.data.articles,
                };
                let pages = Math.ceil(
                    action.payload.response.data.totalResults /
                        action.payload.response.data.articles.length
                );
                let otherPages = [...Array(pages + 1).keys()].splice(2);
                otherPages.map((p) => {
                    articlesObject[p] = [];
                    return null;
                });

                let a = {
                    ...state,
                    loading: false,
                    data: {
                        ...state.data,
                        feed: {
                            results: action.payload.response.data.totalResults,
                            articles: articlesObject,
                        },
                    },
                };

                return a;
            }
            let a = {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    feed: {
                        results: action.payload.response.data.totalResults,
                        articles: {
                            ...state.data.feed.articles,
                            [action.payload.page]:
                                action.payload.response.data.articles,
                        },
                    },
                },
            };

            return a;

        case SET_SEARCH_RESULTS:
            let b = {};
            if (Object.keys(state.data.search_results.articles).length === 0) {
                let articlesObject = {
                    1: action.payload.response.data.articles,
                };
                let pages = Math.ceil(
                    action.payload.response.data.totalResults /
                        action.payload.response.data.articles.length
                );
                let otherPages = [...Array(pages + 1).keys()].splice(2);
                otherPages.map((p) => {
                    articlesObject[p] = [];
                    return null;
                });

                b = {
                    ...state,
                    loading: false,
                    data: {
                        ...state.data,
                        search_results: {
                            results: action.payload.response.data.totalResults,
                            articles: articlesObject,
                        },
                    },
                };

                return b;
            }
            b = {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    search_results: {
                        results: action.payload.response.data.totalResults,
                        articles: {
                            ...state.data.search_results.articles,
                            [action.payload.page]:
                                action.payload.response.data.articles,
                        },
                    },
                },
            };

            return b;

        case SET_SOURCES:
            return {
                ...state,
                loading: false,
                sources: action.payload.response.data.sources,
            };

        case RESET_FEED:
            return {
                ...state,
                error: "",
                data: {
                    ...state.data,
                    feed: {
                        results: 0,
                        articles: [],
                    },
                },
            };

        case RESET_SEARCH:
            return {
                ...state,
                error: "",
                data: {
                    ...state.data,
                    search_results: {
                        results: 0,
                        articles: [],
                    },
                },
            };

        case SET_ERROR:
            let status = 0;
            let e1 =
                action.payload.message === undefined
                    ? action.payload.message
                    : " ";
            let error = "";
            if (action.payload.message === "Network Error") {
                status = 1;
            } else {
                status = action.payload.response.status;
            }
            switch (status) {
                case 1:
                    error = "Network Issue!";
                    break;
                case 200:
                    error = "OK. The request was executed successfully.";
                    break;
                case 400:
                    error =
                        "Bad Request. The request was unacceptable, often due to a missing or misconfigured parameter.";
                    break;
                case 401:
                    error =
                        "Unauthorized. Your API key was missing from the request, or wasn't correct.";
                    break;
                case 429:
                    error =
                        "Too Many Requests. You made too many requests within a window of time and have been rate limited. Back off for a while.";
                    break;
                case 500:
                    error = "Server Error. Something went wrong on our side.";
                    break;
                default:
                    error = "Unknown Error !";
            }

            return {
                ...state,
                loading: false,
                error: e1.concat(error),
            };
        case RESET_ERROR:
            return {
                ...state,
                error: "",
            };
        default:
            return state;
    }
}
