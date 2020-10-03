export const BOOKMARK_ADDED = "BOOKMARK_ADDED";
export const BOOKMARK_REMOVED = "BOOKMARK_REMOVED";
export const SOURCE_ADDED = "SOURCE_ADDED";
export const SOURCE_REMOVED = "SOURCE_REMOVED";
export const API = "API";
export const DATA_FETCHED = "DATA_FETCHED";
export const SET_LOADING = "SET_LOADING";
export const SET_FEED = "SET_FEED";
export const SET_SOURCES = "SET_SOURCES";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const SET_LOADING_STOP = "SET_LOADING_STOP";
export const RESET_FEED = "RESET_FEED";
export const RESET_SEARCH = "RESET_SEARCH";
export const SET_ERROR = "SET_ERROR";
export const RESET_ERROR = "RESET_ERROR";

export const addBookmark = (newsItem) => {
    return {
        type: BOOKMARK_ADDED,
        payload: newsItem,
    };
};

export const removeBookmark = (newsItem) => {
    return {
        type: BOOKMARK_REMOVED,
        payload: newsItem,
    };
};

export const addSource = (sourceItem) => {
    return {
        type: SOURCE_ADDED,
        payload: sourceItem,
    };
};

export const removeSource = (sourceItem) => {
    return {
        type: SOURCE_REMOVED,
        payload: sourceItem,
    };
};

export const makeApiCall = (payload) => {
    return {
        type: API,
        payload: payload,
    };
};

export const setLoading = () => {
    return {
        type: SET_LOADING,
    };
};

export const feedNews = (response, page) => {
    return {
        type: SET_FEED,
        payload: { page: page, response: response },
    };
};

export const feedSearchResults = (response, page) => {
    return {
        type: SET_SEARCH_RESULTS,
        payload: { page: page, response: response },
    };
};

export const feedSources = (response) => {
    return {
        type: SET_SOURCES,
        payload: { response: response },
    };
};

export const resetFeed = () => {
    return {
        type: RESET_FEED,
    };
};

export const resetSearch = () => {
    return {
        type: RESET_SEARCH,
    };
};

export const feedError = (error) => {
    return {
        type: SET_ERROR,
        payload: error,
    };
};

export const resetError = () => {
    return {
        type: RESET_ERROR,
    };
};
