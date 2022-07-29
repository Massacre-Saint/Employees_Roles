import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createTeam = (teamObj, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload)
        .then(() => {
          getTeams(uid).then(resolve);
        });
    }).catch(reject);
});

const updateTeam = (teamObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/teams/${teamObj.firebaseKey}.json`, teamObj)
    .then(() => getTeams(uid).then(resolve))
    .catch(reject);
});
const deleteSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teams/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getTeamPlayers = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="teamId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getPublicTeams = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="public"&equalTo=true`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});


export {
  getTeams,
  getSingleTeam,
  createTeam,
  updateTeam,
  deleteSingleTeam,
  getTeamPlayers,
  getPublicTeams,
};
