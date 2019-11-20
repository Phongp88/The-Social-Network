import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom/";
import Proptypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// Redux
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataAction";

const styles = {
    deleteButton: {
        position: "absolute",
        left: '90%',
        top: "10%",
        color: "black"
    },
    deleteText: {
      color: "black"
    }
};

export class DeleteScream extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete Post"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
            <DialogTitle>
                Are you sure you want to delete this post?
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.deleteScream} className={classes.deleteText}>
                        Delete
                    </Button>
                </DialogActions>
            </DialogTitle>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: Proptypes.func.isRequired,
  classes: Proptypes.object.isRequired,
  screamId: Proptypes.string.isRequired
};

export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);
