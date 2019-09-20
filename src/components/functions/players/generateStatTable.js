import React from 'react';

import { Link } from 'react-router-dom';

import { StyledTableCell, StyledTableRow } from '../../UI/MaterialUI/custom';

import TableRow from '@material-ui/core/TableRow';

import {updateTeamID} from '../../../store/actions'

const GenerateStatTable = (data, exclusions, type, dispatch) => {

  let filterData = [];

  if (data) {
    data.map((d, i) => {
      if (!exclusions.includes(i)) {
        // only run if doing work for the head elements
        if (type === 'head') {
          if (d.includes('_PCT')) d = d.replace('_PCT', ' %');
          if (d === 'TEAM_ABBREVIATION') d = 'TEAM';
          if (d === 'SEASON_ID') d = 'SEASON';

          return (filterData = [
            ...filterData,
            <StyledTableCell key={`${i}${d[0]}`} align='right'>
              {d}
            </StyledTableCell>,
          ]);
        }
        // create a link to the teams
        if (i === 4 && data[4] !== 'TOT' && isNaN(data[4])) d = <Link to={'/teams'}>{d}</Link>;
        filterData = [
          ...filterData,
          //send the team id to the store when the team is selected
          <StyledTableCell key={`${i}${d[1]}`} onClick={i === 4 ? () => dispatch(updateTeamID(data[3])) : null} align='right'>
            {d}
          </StyledTableCell>,
        ];
      }
      return filterData;
    });
    return type === 'head' ? (
      <TableRow hover>{filterData}</TableRow>
    ) : (
      <StyledTableRow key={`${data[0]}${data[26]}`}>{filterData}</StyledTableRow>
    );
  }
};


export default GenerateStatTable;