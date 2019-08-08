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

const PlayerGameLog = ({ id }) => {
  const [seasonNumbers, setSeasonNumbers] = useState();
  const [playoffNumbers, setPlayoffNumbers] = useState();
  const [headers, setHeaders] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const exlusions = [0, 1, 2, 26];

  const [season, setSeason] = useState();
  const [playoffs, setPlayoffs] = useState();

  useEffect(() => {
    getGameLogData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getGameLogData = () => {
    // get regular season game log for current season
    playergamelog.PlayerID = id;
    getGameLog(setSeasonNumbers, playergamelog, setHeaders);

    //get playoff stats
    setTimeout(() => {
      playergamelog.SeasonType = 'Playoffs';
      getGameLog(setPlayoffNumbers, playergamelog);
    }, 1);

    // preseason, all-star, years etc
    //playergamelog.Season = '2016-17'
  };
  

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
            <TableHead>{GenerateStatTable(headers, exlusions, 'head')}</TableHead>
            <TableBody>{season}</TableBody>
            <TableBody>{playoffs}</TableBody>
          </Table>
        </Paper>
      )}
    </div>
  );
};

export default PlayerGameLog;
