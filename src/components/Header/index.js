import React, { Component } from 'react';
import styles from './index.module.scss';
import PersistentDrawerLeft from '../UI/MaterialUI/sideDrawer/sideDrawer';

import { Link } from 'react-router-dom';

import debounce from 'lodash.debounce';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Header extends Component {
  state = {
    searchType: 'player',
    searchResults: [],
  };

  componentDidMount() {
    this.props.getAllPlayers();
    this.props.getAllTeams();
  }

  /* Add debounce so it doesnt perform the update on every key stroke.
   This is a synthetic event the text must be passed in 
   directly or it will produce an error */
  handleChange = debounce(text => {
    // create a condition that handles the type of search selected
    const searchType = this.state.searchType;
    const searchCategory = searchType === 'player' ? this.props.playerData.rowSet : this.props.teamData;
    let searchResults = [];

    // map through the dataset to find the searched item
    searchCategory.map(d => {
      //if search type is player
      if (searchType === 'player') {
        if (d[2].toLowerCase().includes(text.toLowerCase())) {
          searchResults = [...searchResults, d];
        }
        return d;
      }
      // if search type is team
      if (d.teamName.toLowerCase().includes(text.toLowerCase())) {
        searchResults = [...searchResults, d];
      }
      return d;
    });

    if (!text) searchResults = [];

    this.setState({ searchResults });
  }, 500);

  searchOptionChanged = event =>
    this.setState({ searchType: event.target.value.toLowerCase() === 'team' ? 'team' : 'player' });

  showSearchedItemList = () => {
    const searchType = this.state.searchType;
    const searchResults = this.state.searchResults;

    return searchResults.map(
      (d, i) =>
        i < 6 && (
          <div onClick={() => this.searchItemSelected(searchType, d.teamID, d[0])} key={i}>
            <Link className={styles.ResultLink} to={searchType === 'team' ? '/teams' : '/'}>
              {searchType === 'team' ? d.teamName : d[2]}
            </Link>
          </div>
        )
    );
  };

  openPlayerTeamProfile = UID => {
    //update the team or player based on the type of search
    this.state.searchType === 'player' ? this.props.updatePlayerID(UID) : this.props.updateTeamID(UID);
  };

  // hides the result list when a player is selected
  searchItemSelected = (searchType, TID, PID) => {
    this.setState({ searchResults: [] });

    this.openPlayerTeamProfile(searchType === 'team' ? TID : PID);
  };

  // repopulates the results when selected input selected
  updateResults = val => {
    this.handleChange(val);
  };

  render() {
    const category = this.state.searchType;
    const routeActive = this.props.match.url === '/';

    return (
      <div className={styles.container}>
        <PersistentDrawerLeft
          data={{
            category,
            routeActive,
            searchOptionChanged:(val) => this.searchOptionChanged(val),
            handleChange:(val) => this.handleChange(val),
            updateResults:(val) => this.updateResults(val),
            showSearchedItemList: (val) => this.showSearchedItemList(val),
            searchResults: this.state.searchResults
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerData: state.players.playerList,
    teamData: state.teams.teamList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPlayers: () => dispatch(actions.getAllPlayers()),
    getAllTeams: () => dispatch(actions.getAllTeams()),
    updatePlayerID: UID => dispatch(actions.updatePlayerID(UID)),
    updateTeamID: UID => dispatch(actions.updateTeamID(UID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
