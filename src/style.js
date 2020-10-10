import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
        margin: 0,
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        position: "fixed",
        zIndex: 1400,
        margin: 0,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    nested: {
        paddingLeft: theme.spacing(8),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    box: {
        border: "1px",
        borderStyle: "solid",
        borderRadius: "5px",
        borderColor: "#000",
        padding: "1px",
        backgroundColor: "#fff",
    },
    expand: {
        height: "100%",
        width: "100%",
    },
    dateExpand: {
        display: "flex",
        flexGrow: 1,
        height: "100%",
        position: "relative",
        width: "100%",
    },
    error: {
        color: "red",
    },
}));

export default useStyles;
