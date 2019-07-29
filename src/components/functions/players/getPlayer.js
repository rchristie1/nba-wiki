import axios from 'axios';
import noImage from '../../../assets/images/noImage.jpg';
import {PlayerDetails} from '../../../components/Players/PlayerDetails';
import {commonplayerinfo, playercareerstats, HeadShotsNBA} from '../../../config';

export const getPlayer = (id, [setPlayerData, setPlayerAverages, setCareerStats, setTotals, setPlayerImage, dispatch]) => {
    const PID = id;
    //Apply the current PlayerID to the config options
    commonplayerinfo.PlayerID = PID;
    playercareerstats.PlayerID = PID;

    axios
      .post('/commonplayerinfo', commonplayerinfo)
      // .get(`${API2}/commonplayerinfo`)
      .then(res => {
        setPlayerData(res.data.resultSets[0].rowSet[0]);
        setPlayerAverages(res.data.resultSets[1].rowSet[0]);

        axios
          .post('/playercareerstats', playercareerstats)
          // .get(`${API2}/playercareerstats`)
          .then(resp => {
            setCareerStats(resp.data.resultSets);
            setTotals(PlayerDetails(resp.data.resultSets, dispatch));
          })
          .catch(err => console.log(err));

          axios
          .get(`${HeadShotsNBA}/${PID}.png`)
          .then(() => {
            setPlayerImage(`${HeadShotsNBA}/${PID}.png`);
          })
          .catch(setPlayerImage(noImage))
      })
      .catch(err => console.log(err));
  };