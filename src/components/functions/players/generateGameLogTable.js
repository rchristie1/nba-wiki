import React from 'react';

import { StyledTableCell, StyledTableRow } from '../../UI/MaterialUI/custom';
import TableRow from '@material-ui/core/TableRow';

const GenerateStatTable = (data, exclusions, type, sort) => {
  let filterData = [];

  if (data) {
    data.map((d, i) => {
      if (!exclusions.includes(i)) {
        // only run if doing work for the head elements
        if (type === 'head') {
          if (d.includes('_PCT')) d = d.replace('_PCT', ' %');
          if (d === 'PLUS_MINUS') d = '+/-';
          if (d === 'GAME_DATE') d = 'DATE';

          return (filterData = [
            ...filterData,
            <StyledTableCell onClick={() => sort(i)} align='right' key={i}>
              {d}
            </StyledTableCell>,
          ]);
        }

        let winLoss;

        if(d === 'W') {
            winLoss = {color: 'green'}
        } else if (d === 'L') {
            winLoss = {color: 'red'}
        }

        filterData = [
          ...filterData,
          <StyledTableCell align='right' style={winLoss ? winLoss : null} key={i}>
            {d}
          </StyledTableCell>,
        ];
      }
      return filterData;
    });
    return type === 'head' ? (
      <TableRow hover>{filterData}</TableRow>
    ) : (
      <StyledTableRow key={`${data[1]}${data[2]}`}>{filterData}</StyledTableRow>
    );
  }
};

export default GenerateStatTable;
