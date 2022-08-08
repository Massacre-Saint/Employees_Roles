import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTrades = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trades.json?orderBy="fromUser"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createTrade = (tradeObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/trades.json`, tradeObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/trades/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateTrade = (tradeObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/trades/${tradeObj.firebaseKey}.json`, tradeObj)
    .then(() => getTrades(tradeObj.fromCoach_uid).then(resolve))
    .catch(reject);
});

const deleteSingleTrade = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/trades/${firebaseKey}.json`)
    .then(() => {
      getTrades(uid).then((tradeArray) => resolve(tradeArray));
    })
    .catch((error) => reject(error));
});

export {
  getTrades,
  createTrade,
  updateTrade,
  deleteSingleTrade,
};
