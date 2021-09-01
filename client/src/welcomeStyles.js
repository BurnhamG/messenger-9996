import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignContent: "center",
    height: "100%",
  },
  textField: {
    width: "30ch",
  },
  accountCreation: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(-3),
    color: theme.palette.info.main,
  },
  button: {
    background: "#FFFFFF",
    color: theme.palette.primary.main,
    padding: theme.spacing(1, 2),
  },
  link: {
    margin: theme.spacing(0, 1, 0),
    fontSize: ".75em",
  },
  formHeader: {
    fontSize: "1.25em",
    fontWeight: "bold",
    textAlign: "left",
  },
  loginButton: {
    marginTop: theme.spacing(2),
  },
  header: {
    alignItems: "baseline",
    justifyContent: "flex-end",
  },
}));

export { useStyles };
