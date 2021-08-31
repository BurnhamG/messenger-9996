import { makeStyles } from "@material-ui/core/styles";

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
    // marginLeft: "-110px",
    fontSize: "1.25em",
    fontWeight: "bold",
    textAlign: "center"
  },
  loginButton: {
    fontFamily: "Montserrat, sans-serif",
    marginTop: "10px"
  },
  header: {
    alignItems: "baseline",
    justifyContent: "flex-end"
  }
}));

export { useStyles };
