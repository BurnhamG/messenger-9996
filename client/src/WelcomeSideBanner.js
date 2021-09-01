import React from "react";
import { Hidden, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as Bubble } from "./assets/bubble.svg";

import backgroundImage from "./assets/bg-img.png";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(0deg, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url(${backgroundImage})`,
    height: "100vh",
    backgroundRepeat: "no-repeat",
    width: "425px",
  },
  text: {
    color: "#FFFFFF",
    fontSize: "1.75em",
    textAlign: "center",
    margin: "50px",
  },
  icon: {
    fontSize: "5rem"
  },
}));

export const WelcomeSideBanner = () => {
  const classes = useStyles();
  return (
    <Hidden smDown>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.root}
      >
        <SvgIcon className={classes.icon} viewBox="0 0 67 67">
          <Bubble />
        </SvgIcon>
        <Typography className={classes.text}>
          Converse with anyone with any language
        </Typography>
      </Grid>
    </Hidden>
  );
};
