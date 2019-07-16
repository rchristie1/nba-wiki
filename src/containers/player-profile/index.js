import React, { Component } from 'react';
import Loader from '../../widgets/loader';
import PlayerSummary from '../../components/Players/PlayerSummary';
import { PlayerDetails } from '../../components/Players/PlayerDetails';
import noImage from '../../assets/images/noImage.jpg';

import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { playercareerstats, commonplayerinfo, HeadShotsNBA, API2 } from '../../config';

class PlayerProfile extends Component {
  state = {
    playerData: null,
    playerAverages: null,
    careerStats: null,
    loading: true,
    totals: [],
    statToggle: true,
    showSeason: true,
    playerImage: null,
  };

  componentDidMount() {
    /* If there is no ID in the store then set the default ID to LBJ
    and update the store to reflect the change */
    if (!this.props.PID) {
      this.props.updatePlayerID(2544);
      this.getPlayer(2544);
    } else {
      this.getPlayer(this.props.PID);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.getPlayer(this.props.PID);
    }
  }

  getPlayer = (id) => {
    // const PID = 2544;
    const PID = id;
    //Apply the current PlayerID to the config options
    commonplayerinfo.PlayerID = PID;
    playercareerstats.PlayerID = PID;

    // post to the url with the Query params
    axios
      .post('/commonplayerinfo', commonplayerinfo)
      // .get(`${API2}/commonplayerinfo`)
      .then(res => {
        this.setState({
          playerData: res.data.resultSets[0].rowSet[0],
          playerAverages: res.data.resultSets[1].rowSet[0],
        });

        axios
          .post('/playercareerstats', playercareerstats)
          // .get(`${API2}/playercareerstats`)
          .then(resp => {
            this.setState({ careerStats: resp.data.resultSets });
            this.setState({ totals: PlayerDetails(resp.data.resultSets, this.props.updateTeamID) });
          })
          .catch(err => console.log(err));

        axios
          .get(`${HeadShotsNBA}/${this.state.playerData[0]}.png`)
          .then(() => {
            this.setState({ playerImage: `${HeadShotsNBA}/${this.state.playerData[0]}.png` });
          })
          .catch(() => this.setState({ playerImage: noImage }));
        // this.setState({ playerImage: noImage })
      })
      .catch(err => console.log(err));
  };

  toggleStats = (type) => {
    let toggle = this.state.statToggle;

    type === 'Season' ? toggle = true : toggle = false;

    this.setState({ statToggle: toggle });
  };

  toggleStatType = (type) => {
    let toggle = this.state.showSeason;

    type === 'Season' ? toggle = true : toggle = false;

    this.setState({ showSeason: toggle });
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
    }

    return loaded ? (
      <PlayerSummary
        data={this.state}
        DOB={DOB}
        stats={[showSeasonStats, showCareerStats]}
        openTeamInfo={this.props.updateTeamID}
        clickToggle1={this.toggleStats}
        clickToggle2={this.toggleStatType}
      />
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = state => {
  return {
    PID: state.players.playerID,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePlayerID: PID => dispatch(actions.updatePlayerID(PID)),
    updateTeamID: TID => dispatch(actions.updateTeamID(TID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerProfile);
