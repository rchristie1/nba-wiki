import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

//#region Material UI
const st = {
  overflowX: 'scroll',
  borderRadius: 0,
}

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  root: {
    width: 100,
    padding: 8,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
//#endregion

export const PlayerDetails = props => {
  let parent = null;
  let totals = [];

  //loop only the first 4 sections inside the results set
  for (let i = 0; i < 4; i++) {
    let exlusions = i === 0 || i === 2 ? [0, 2, 3, 5] : [0, 1, 2];

    //create the table head for teh categories
    const tableHead = GenerateStatTable(props[i].headers, exlusions, 'head');

    //next generate all the child elements
    const childElements = props[i].rowSet.map(data => {
      for (let j = 0; j < data.length; j++) {
        return GenerateStatTable(data, exlusions, 'row');
      }
      return data;
    });

    // construct the table to
    parent = (
      <Paper style={st}>
        <Table>
          <TableHead>{tableHead}</TableHead>
          <TableBody>{childElements}</TableBody>
        </Table>
      </Paper>
    );
    totals = [...totals, parent];
  }
  return totals;
};

const GenerateStatTable = (data, exclusions, type) => {
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
            <StyledTableCell align='right' key={i}>
              {d}
            </StyledTableCell>
          ]);
        }
        filterData = [
          ...filterData,
          <StyledTableCell align='right' key={i}>
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

GenerateStatTable.propTypes = {
  data: PropTypes.array.isRequired,
  exclusions: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};
