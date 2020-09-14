import {
    SET_LOADING,
    SET_LOADING_STOP,
    SET_FEED,
    SET_SEARCH_RESULTS,
    SET_SOURCES,
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
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    search_results: {
                        results: action.payload.response.data.totalResults,
                        articles: {
                            ...state.search_results.articles,
                            [action.payload.page]:
                                action.payload.response.data.articles,
                        },
                    },
                },
            };

        case SET_SOURCES:
            return {
                ...state,
                loading: false,
                sources: action.payload.response.data.sources,
            };
        default:
            return state;
    }
}
