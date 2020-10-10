import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "left",
        margin: "3%",
    },
    media: {
        height: 0,
        // paddingTop: "10%", //(iprops) => iprops.ratio.toString() + "%",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    gridRoot: {
        flexGrow: 1,
    },
    bold: {
        fontWeight: "bold",
    },
    author: {
        fontSize: "10",
        fontStyle: "italic",
    },
    dateText: {
        fontWeight: "fontWeightLight",
        textAlign: "right",
        fontFamily: "Monospace",
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    littlePadding: {
        paddingTop: "5%",
    },
    red: {
        color: "red",
    },
}));

const showContentOrNot = (news) => {
    if (news.description === null) {
        return true;
    }
    let a = news.description.split(",")[0];
    if (news.content === null) {
        return false;
    }
    let b = news.content.split(".")[0];
    if (a === b) {
        return false;
    }
    return true;
};

const NewsCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const showContent = showContentOrNot(props.newsItem);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const d = Date.parse(props.newsItem.publishedAt);
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    const date = `${da} ${mo}, ${ye}`;

    const correctAuthor = false;
    // /[a-zA-Z]+$/.test(props.newsItem.author) |
    // (props.newsItem.author !== props.newsItem.source.name);

    return (
        <Card className={classes.root}>
            <img
                src={props.newsItem.urlToImage}
                alt=""
                backgroundimage={"../../public/no_image.jpg"}
                width="100%"
            />
            <CardContent>
                <Typography variant="h6" className={classes.bold}>
                    {props.newsItem.title}
                </Typography>
                <Grid container className={classes.gridRoot}>
                    <Grid item xs={6}>
                        {correctAuthor ? (
                            <Typography
                                variant="caption"
                                className={classes.author}
                            >
                                {props.newsItem.author}
                                {", "}
                                {props.newsItem.source.name}
                            </Typography>
                        ) : (
                            <Typography
                                variant="caption"
                                className={classes.author}
                            >
                                {props.newsItem.source.name}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.dateText}>
                            {date}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.littlePadding}
                >
                    {props.newsItem.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to bookmarks"
                    onClick={() => {
                        props.manageBookmarks(props.newsItem);
                    }}
                >
                    {props.newsItem.isBookmark ? (
                        <BookmarkIcon className={classes.red} />
                    ) : (
                        <BookmarkIcon />
                    )}
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                {showContent && (
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                )}
            </CardActions>
            {showContent && (
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {props.newsItem.content}
                        </Typography>
                    </CardContent>
                </Collapse>
            )}
        </Card>
    );
};

export default NewsCard;
