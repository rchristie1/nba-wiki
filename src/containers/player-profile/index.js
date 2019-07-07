import React, { Component } from 'react';
import Loader from '../../widgets/loader';
import PlayerSummary from '../../components/PlayerSummary';
import { PlayerDetails } from '../../components/PlayerDetails';

import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { playercareerstats, commonplayerinfo, API2 } from '../../config';

class PlayerProfile extends Component {
  state = {
    playerData: null,
    playerAverages: null,
    careerStats: null,
    loading: true,
    totals: [],
    statToggle: true,
    showSeason: true,
    btn1Text: 'Season Stats',
    btn2Text: 'Career Totals',
  };

  componentDidMount() {
    this.props.getPlayerID();
  }

  componentWillReceiveProps(nextProps) {
    const PID = nextProps.PID;

    //Apply the current PlayerID to the config options
    commonplayerinfo.PlayerID = PID;
    playercareerstats.PlayerID = PID;

    // post to the url with the Query params
    axios
      // .post('/commonplayerinfo', commonplayerinfo)
      .get(`${API2}/commonplayerinfo`)
      .then(res => {
        this.setState({
          playerData: res.data.resultSets[0].rowSet[0],
          playerAverages: res.data.resultSets[1].rowSet[0],
        });

        axios
          // .post('/playercareerstats', playercareerstats)
          .get(`${API2}/playercareerstats`)
          .then(resp => {
            this.setState({ careerStats: resp.data.resultSets });
            this.setState({ totals: PlayerDetails(resp.data.resultSets) });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  toggleStats = () => {
    let toggle = this.state.statToggle;

    toggle = !toggle;

    const btn1Text = toggle ? 'Season Stats' : 'Career Stats';

    this.setState({ statToggle: toggle, btn1Text });
  };

  toggleStatType = () => {
    let showSeason = this.state.showSeason;

    showSeason = !showSeason;

    const btn2Text = showSeason ? 'Career Totals' : 'Season Totals';

    this.setState({ showSeason, btn2Text });
  };

  render() {
    //if loaded then log the player data
    let loaded = this.state.careerStats && this.state.totals.length > 0 ? true : false;
    let DOB = '';
    let showSeasonStats = '';
    let showCareerStats = '';

    if (loaded) {
      DOB = new Date(this.state.playerData[6]);
      DOB.toLocaleDateString();
      showSeasonStats = this.state.statToggle ? this.state.totals[0] : this.state.totals[2];
      showCareerStats = this.state.statToggle ? this.state.totals[1] : this.state.totals[3];

      // axios.get(`${HeadShots}/${pd[2]}/${pd[1]}`).then(res => {
      //   if (res.headers['content-type'] === 'image/png') {
      //     showDefaultImage = false;
      //   } else {
      //     showDefaultImage = true;
      //   }
      // });
    }

    return loaded ? (
      <PlayerSummary
        data={this.state}
        DOB={DOB}
        stats={[showSeasonStats, showCareerStats]}
        clickToggle1={() => this.toggleStats()}
        clickToggle2={() => this.toggleStatType()}
      />
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = state => {
  return {
    PID: state.players.playerID,
    // TID: state.team.playerList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPlayerID: () => dispatch(actions.getPlayerID()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerProfile);
