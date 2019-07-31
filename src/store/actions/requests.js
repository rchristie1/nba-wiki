import axios from 'axios'
import * as config from '../../config'

export const getLeaders = (dispatch, action, category) => {
    config.leagueleaders.StatCategory = category;
    axios.post('/leagueleaders', config.leagueleaders)
    .then(res => dispatch(action(res.data.resultSet.rowSet)))
    .catch(err => console.log(err));
}

export const getPlayers = (dispatch, action) => {
    axios.post('/commonallplayers', config.commonallplayers)
    .then(res => dispatch(action(res.data.resultSets[0])))
    .catch(err => console.log(err));
}