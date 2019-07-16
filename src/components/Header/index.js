import React, { Component } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/nba_logo.png';

import debounce from 'lodash.debounce';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

class Header extends Component {
  state = {
    searchType: 'player',
    searchResults: [],
  };

  componentDidMount() {
    this.props.getAllPlayers();
    this.props.getAllTeams();
  }

  useStyles = makeStyles(theme => ({
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

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
      if (searchType === 'player') {
        if (d[2].toLowerCase().includes(text.toLowerCase())) {
          searchResults = [...searchResults, d];
        }
        return d;
      }
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
    const st = this.state.searchType;
    const searchResults = this.state.searchResults;

    return searchResults.map(
      (d, i) =>
        i < 6 && (
          <div onClick={() => this.searchItemSelected(st, d.teamID, d[0])} key={i}>
            {st === 'team' ? d.teamName : d[2]}
          </div>
        )
    );
  };
  
  openPlayerTeamProfile = UID => {
    //update the team or player based on the type of search 
    this.state.searchType === 'player' ? this.props.updatePlayerID(UID) : this.props.updateTeamID(UID);
  };

  // hides the result list when a plater is selected
  searchItemSelected = (searchType, TID, PID) => {
    this.setState({searchResults: []});

    this.openPlayerTeamProfile(searchType === 'team' ? TID : PID);
  }

  // repopulates the results when selected input selected
  updateResults = val => {
    this.handleChange(val);
  }

  render() {
    const category = this.state.searchType;
    const routeActive = this.props.match.url === '/';

    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to='/'>
            <img src={logo} alt='nba official logo' /> &nbsp; <span className={styles.headTitle}>Wiki</span>
          </Link>
        </div>

        <div className={styles.seachSection}>
          <div className={styles.links}>
            <Link className={routeActive ? styles.active : null} to='/'>
              Players
            </Link>
            <Link className={!routeActive ? styles.active : null} to='/teams'>
              Teams
            </Link>
          </div>
          <span>
            <SearchIcon />
            <select onChange={event => this.searchOptionChanged(event)}>
              <option id='1'>Player</option>
              <option id='2'>Team</option>
            </select>

            <input
              type='text'
              placeholder={`${category === 'team' ? 'Raptors' : 'Lebron James'}...`}
              onChange={e => this.handleChange(e.target.value)}
              onFocus={e => this.updateResults(e.target.value)}
            />
          </span>
          <div className={styles.searchResults}>
            {this.state.searchResults.length > 0 && this.showSearchedItemList()}
          </div>
        </div>
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
