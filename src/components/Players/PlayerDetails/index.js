import React from 'react';
import './index.module.scss';
import GenerateStatTable from '../../functions/players/generateStatTable';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

const st = {
  overflowX: 'scroll',
  borderRadius: 0,
}

export const PlayerDetails = (props, dispatch) => {

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
        return GenerateStatTable(data, exlusions, 'row', dispatch);
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