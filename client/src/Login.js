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
  InputAdornment,
  IconButton,
  Link
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { login } from "./store/utils/thunkCreators";
import { WelcomeSideBanner } from "./WelcomeSideBanner.js";
import "./Login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "center",
    height: "100%"
  },
  textField: {
    width: "30ch",
  },
  accountCreation: {
    marginRight: "20px",
    marginTop: "-30px",
    color: "#777777"
  },
  button: {
    background: "#FFFFFF",
    color: "#3A8DFF",
    padding: "10px 20px",
    fontFamily: "Montserrat, sans-serif"
  },
  link: {
    margin: "0px 10px 10px",
    fontSize: ".75em"
  },
  welcome: {
    marginLeft: "-110px",
    fontSize: "1.25em",
    fontWeight: "bold"
  },
  loginButton: {
    fontFamily: "Montserrat, sans-serif",
    marginTop: "10px"
  }
}));

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles();

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
        <WelcomeSideBanner style={{height: "100vh" }} />
      </Grid>
      <Grid container direction="column" justifyContent="space-around" sm={12} md={9} style={{height: "100vh"}}>
        <Grid container item alignItems="baseline" justifyContent="flex-end">
          <Typography className={classes.accountCreation}>Don't have an account?</Typography>
          <Button variant="contained" size="large" className={`${classes.accountCreation} ${classes.button}`} onClick={() => history.push("/register")}>Create account</Button>
        </Grid>
        <Grid container item justifyContent="space-around" >
          <Grid container item justifyContent="center" >
            <Typography className={classes.welcome} >Welcome back!</Typography>
          </Grid>
          <form onSubmit={handleLogin}>
            <Grid container direction="column" justifyContent="center" alignItems="center" >
              <FormControl margin="normal" required>
                <TextField
                  className={classes.textField}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
              <FormControl margin="normal" required>
                <TextField
                  className={classes.textField}
                  label="Password"
                  aria-label="password"
                  type={values.showPassword ? "password": "text"}
                  name="password"
                  onChange={handleChange('password')}
                  InputProps={{
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
                />
              </FormControl>
              <Grid container item className={classes.link} justifyContent="flex-end" >
                <Link >Forgot password?</Link>
              </Grid>
              <Grid>
                <Button type="submit" className={classes.loginButton} variant="contained" color="primary" size="large">
                  Login
                </Button>
              </Grid>
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
