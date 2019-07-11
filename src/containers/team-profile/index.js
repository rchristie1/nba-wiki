import React, { Component } from 'react';
import TeamSummary from '../../components/TeamSummary';
import Loader from '../../widgets/loader';

import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { commonteamroster, teaminfocommon, teamgamelog, API2 } from '../../config';

class TeamProfile extends Component {
  state = {
    teamDetails: null,
    teamGameLog: null,
    teamRoster: null,
    seasonRankings: null,
    showGamelog: false,
  };

  componentDidMount() {
    this.props.getTeamID();
    this.props.updatePlayerID();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) { 
    const TID = !prevProps.TID ? this.props.TID : prevProps.TID;

    teaminfocommon.TeamID = TID;
    commonteamroster.TeamID = TID;
    teamgamelog.TeamID = TID;

      axios
      .post('/teaminfocommon', teaminfocommon)
      // .get(`${API2}/teaminfocommon`)
      .then(res => {
        this.setState({
          teamDetails: res.data.resultSets[0].rowSet[0],
          seasonRankings: res.data.resultSets[1].rowSet[0],
        });
      })
      .catch(err => console.log(err));

    axios
      .post('/commonteamroster', commonteamroster)
      // .get(`${API2}/commonteamroster`)
      .then(res => {
        this.setState({
          teamRoster: [res.data.resultSets[0].rowSet, res.data.resultSets[1].rowSet],
        });
      })
      .catch(err => console.log(err));

    axios
      .post('/teamgamelog', teamgamelog)
      // .get(`${API2}/teamgamelog`)
      .then(res => {
        // this.setState({ teamGameLog: res.data });
        this.setState({ teamGameLog: res.data.resultSets[0] });
      })
      .catch(err => console.log(err))
    }
  }

  showGamelog = value => {
    this.setState({ showGamelog: value });
  };

  render() {
    let loaded = this.state.seasonRankings && this.state.teamGameLog ? true : false;

    return loaded > 0 ? (
      <TeamSummary
        data={this.state}
        updatePlayer={this.props.updatePlayerID}
        showComponent={value => this.showGamelog(value)}
      />
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = state => {
  return {
    TID: state.teams.teamID,
    PID: state.players.playerID,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTeamID: () => dispatch(actions.getTeamID()),
    updatePlayerID: (id) => dispatch(actions.updatePlayerID(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamProfile);
