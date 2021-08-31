import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { register } from "./store/utils/thunkCreators";
import { WelcomeSideBanner } from "./WelcomeSideBanner.js";
import { useStyles } from "./welcomeStyles.js";

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles();

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3} sm={0}>
        <WelcomeSideBanner style={{ height: "100vh" }} />
      </Grid>
      <Grid container direction="column" justifyContent="space-around" sm={12} md={9} style={{height: "100vh"}}>
        <Grid container item className={classes.header}>
          <Typography className={classes.accountCreation}>Need to log in?</Typography>
          <Button variant="contained" size="large" className={`${classes.accountCreation} ${classes.button}`} onClick={() => history.push("/login")}>Login</Button>
        </Grid>
        <Grid container item justifyContent="space-around">
          <Grid container item justifyContent="center" >
            <Typography className={classes.welcome}>Please enter your information.</Typography>
          </Grid>
          <form onSubmit={handleRegister}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Grid>
                <FormControl margin="normal">
                <TextField
                  className={classes.textField}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
                </FormControl>
                </Grid>
              <Grid>
                <FormControl>
                <TextField
                  className={classes.textField}
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
                </FormControl>
                </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
              <TextField
                className={classes.textField}
                aria-label="password"
                label="Password"
                type="password"
                InputProps={{ minLength: 6,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                name="password"
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
              </FormControl>
              </Grid>
              <Grid>
                <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  className={classes.textField}
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  InputProps={{ minLength: 6,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  name="confirmPassword"
                  required
                />
                  <FormHelperText>
                  {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Button type="submit" className={classes.loginButton} variant="contained" color="primary" size="large">
                Create
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid>
          <Box>
          </Box>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
