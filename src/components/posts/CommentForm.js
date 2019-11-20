import React, { Component } from "react";
import Proptypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux

import {connect} from "react-redux"
import {submitComment} from "../../redux/actions/dataAction"
// MUI
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"

const styles = theme => ({
    ...theme.userProfile,
    button: {
        float: "right"
    }
})

export class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({errors: nextProps.UI.errors});
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({body: ""});
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitComment(this.props.screamId, {body: this.state.body})
    }
    render() {
        const {classes, authenticated} = this.props;
        const errors = this.state.errors;
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign: "center"}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                    name="body"
                    type="text"
                    label="Comment on Post"
                    error={errors.comment ? true : false}
                    helperText={errors.comment}
                    value={this.state.body}
                    onChange={this.handleChange}
                    fullWidth
                    multiline
                    className={classes.textField}
                    />
                    <Button type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{marginBottom: 20, marginTop: 10}}
                    >Submit</Button>
                </form>
                <hr className={classes.visibleSeperator}/>
            </Grid>
        ) : null
        return commentFormMarkup;
    }
}

CommentForm.propTypes ={
    submitComment: Proptypes.func.isRequired,
    UI: Proptypes.object.isRequired,
    classes: Proptypes.object.isRequired,
    screamId: Proptypes.string.isRequired,
    authenticated: Proptypes.bool.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm))
