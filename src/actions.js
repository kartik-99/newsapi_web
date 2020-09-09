export const addBookmark = (newsItem) => {
    return {
        type: "BOOKMARK_ADDED",
        payload: newsItem,
    };
};

export const removeBookmark = (newsItem) => {
    return {
        type: "BOOKMARK_REMOVED",
        payload: newsItem,
    };
};

export const addSource = (sourceItem) => {
    return {
        type: "SOURCE_ADDED",
        payload: sourceItem,
    };
};

export const removeSource = (sourceItem) => {
    return {
        type: "SOURCE_REMOVED",
        payload: sourceItem,
    };
};
