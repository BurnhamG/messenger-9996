import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Link,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { WelcomeSideBanner } from "./WelcomeSideBanner.js";
import { PasswordField } from "./PasswordField.js";
import "./Login.css";
import { useStyles } from "./welcomeStyles.js";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3} sm={0}>
        <WelcomeSideBanner style={{ height: "100vh" }} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        sm={12}
        md={9}
        style={{ height: "100vh" }}
      >
        <Grid container item className={classes.header}>
          <Typography className={classes.accountCreation}>
            Don't have an account?
          </Typography>
          <Button
            variant="contained"
            size="large"
            className={`${classes.accountCreation} ${classes.button}`}
            onClick={() => history.push("/register")}
          >
            Create account
          </Button>
        </Grid>
        <Grid container item justifyContent="space-around">
          <Grid container item justifyContent="center">
            <Typography className={classes.welcome}>Welcome back!</Typography>
          </Grid>
          <form onSubmit={handleLogin}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <FormControl margin="normal" required>
                <TextField
                  className={classes.textField}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
              <FormControl margin="normal" required>
                <PasswordField label={"Password"} />
              </FormControl>
              <Grid
                container
                item
                className={classes.link}
                justifyContent="flex-end"
              >
                <Link>Forgot password?</Link>
              </Grid>
              <Grid>
                <Button
                  type="submit"
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid>
          <Box></Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
