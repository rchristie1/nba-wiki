import React, { useEffect, useState } from 'react';
import { playergamelog } from '../../../config';
import { getGameLog } from '../../../components/functions/players/getPlayerGameLog';
import GenerateStatTable from '../../../components/functions/players/generateGameLogTable';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

const st = {
  overflowX: 'scroll',
  borderRadius: 0,
};

const PlayerGameLog = ({ id, year }) => {
  const [seasonNumbers, setSeasonNumbers] = useState();
  const [playoffNumbers, setPlayoffNumbers] = useState();
  const [headers, setHeaders] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const exlusions = [0, 1, 2, 26];

  const [season, setSeason] = useState();
  const [playoffs, setPlayoffs] = useState();

  const [asc, setAsc] = useState(false);

  useEffect(() => {
    getGameLogData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(year){
      playergamelog.Season = year;

      getGameLogData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year])

  const getGameLogData = () => {
    // get regular season game log for current season
    playergamelog.PlayerID = id;
    getGameLog(setSeasonNumbers, playergamelog, setHeaders);

    //get playoff stats
    setTimeout(() => {
      // playergamelog.SeasonType = 'Regular Season';
      getGameLog(setPlayoffNumbers, playergamelog);
    }, 1);
  };

  const sort = (colNum) => {
    console.log(asc);
    let x = asc;

    x = !x;
    console.log(x);
    
    setSeasonNumbers([...seasonNumbers].sort((a,b) => a[colNum] > b[colNum] ? x ? -1 : 1 : x ? 1 : -1));
    setAsc(x);
  }

  useEffect(() => {
    if (seasonNumbers && playoffNumbers) {
      setSeason(
          seasonNumbers.map(data => {
              for(let i = 0; i < seasonNumbers.length; i++){
                  return GenerateStatTable(data, exlusions, 'row')
              }
              return data;
          })
      );

      setPlayoffs(
        playoffNumbers.map(data => {
            for(let i = 0; i < playoffNumbers.length; i++){
                return GenerateStatTable(data, exlusions, 'row')
            }
            return data;
        })
    )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasonNumbers, playoffNumbers,]);

  useEffect(() => {
      if(season && playoffs) {
        setIsLoaded(true);
      }
  }, [season, playoffs])

  return (
    <div>
      {isLoaded && (
        <Paper style={st}>
          <Table>
            <TableHead>{GenerateStatTable(headers, exlusions, 'head', sort)}</TableHead>
            <TableBody>{season}</TableBody>
            {/* <TableBody>{playoffs}</TableBody> */}
          </Table>
        </Paper>
      )}
    </div>
  );
};

export default PlayerGameLog;
