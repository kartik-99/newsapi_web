import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "left",
    },
    media: {
        height: 0,
        paddingTop: "100%", //"56.25%", // 16:9
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
}));

const NewsCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const d = Date.parse(props.newsItem.publishedAt);
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    const date = `${da}-${mo}-${ye}`;

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.newsItem.urlToImage}
            />
            <CardContent>
                <Typography variant="h6">{props.newsItem.title}</Typography>
                <div className={classes.gridRoot}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="caption">
                                <Box fontSize="10" fontStyle="italic">
                                    {props.newsItem.author},{" "}
                                    {props.newsItem.source.name}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <Box
                                    fontWeight="fontWeightLight"
                                    textAlign="right"
                                    fontFamily="Monospace"
                                >
                                    {date}
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <Typography variant="body2" color="textSecondary" component="p">
                    <Box paddingTop="5%">{props.newsItem.description}</Box>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to bookmarks">
                    <BookmarkIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
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
            </CardActions>
            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
                className={classes.media}
            >
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.newsItem.content}
                </Typography>
            </Collapse>
        </Card>
    );
};

export default NewsCard;
