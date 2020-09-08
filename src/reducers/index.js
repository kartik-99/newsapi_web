import bookmarks from "./bookmarksReducer";
import { combineReducers } from "redux";

const allData = combineReducers({
    bookmarks: bookmarks,
});
export default allData;
