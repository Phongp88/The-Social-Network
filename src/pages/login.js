import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.PNG";
import {Link} from 'react-router-dom'
// MUI ITEMS
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from "@material-ui/core/Grid";
import Typepography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"

// Redux
import {clearErrors} from "../redux/actions/dataAction"
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userAction'

const styles = (theme) => ({
  ...theme.frontPage
})

export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount(){
    this.props.clearErrors()
  }
  // Updates the errors state that fetches from UI.errors
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({errors: nextProps.UI.errors})
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
        email: this.state.email,
        password: this.state.password
    }
    this.props.loginUser(userData, this.props.history)
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes, UI: {loading} } = this.props;
    const {errors} = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="Corgi" className={classes.image} />
          <Typepography variant="h3" className={classes.pageTitle}>
            Login
          </Typepography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors.email}
              error={errors.email ? true: false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors.password}
              error={errors.password ? true: false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            {errors.general && (
              <Typepography variant="body2" className={classes.customError}>
                {errors.general}
              </Typepography>
            )}
            <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading}
            className={classes.button}>
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <br/>
            <small>Don't have an account? sign up <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser,
  clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
