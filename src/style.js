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
        position: "relative",
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
}));

export default useStyles;
