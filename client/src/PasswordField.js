import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useStyles } from "./welcomeStyles.js";

export const PasswordField = (props) => {
  const classes = useStyles();
  const { label } = props;

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const toCamelCase = (phrase) => {
    const words = phrase.split(" ");
    const camelCase = words
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        } else {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        }
      })
      .join("");

    return camelCase;
  };

  return (
    <TextField
      className={classes.textField}
      aria-label={toCamelCase(label)}
      label={label}
      type="password"
      InputProps={{
        minLength: 6,
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
        ),
      }}
      name="password"
      required
    />
  );
};
