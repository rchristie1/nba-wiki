import axios from 'axios';

export const getGameLog = (setData, playergamelog, setHeaders) => {
  axios
    .post('/playergamelog', playergamelog)
    .then(res => {
      setHeaders && setHeaders(res.data.resultSets[0].headers);
      setData(res.data.resultSets[0].rowSet);
    })
    .catch(err => console.log(err));
};
