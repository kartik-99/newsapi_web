export const addBookmark = (newsItem) => {
    return {
        type: "BOOKMARK_ADDED",
        payload: newsItem,
    };
};

export const removeBookmark = (newsItemUrl) => {
    return {
        type: "BOOKMARK_REMOVED",
        payload: newsItemUrl,
    };
};
