import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/posts/Scream";
import Profile from "../components/profile/Profile";
import PropTypes from "prop-types";
import ScreamSkeleton from "../util/ScreamSkeleton"
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataAction";

export class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton/>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile></Profile>
        </Grid>
      </Grid>
    );
  }
}

home.propType = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(home);
