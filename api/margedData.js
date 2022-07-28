import { deleteSinglePlayer, getSinglePlayer } from './playerData';
import { getTeamPlayers, deleteSingleTeam, getSingleTeam } from './teamData';

const deleteTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  getTeamPlayers(teamId).then((playerArray) => {
    const deletePlayersPromises = playerArray.map((player) => deleteSinglePlayer(player.firebaseKey));
    Promise.all(deletePlayersPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamPlayers(teamFirebaseKey)])
    .then(([teamObject, teamPlayersArray]) => {
      resolve({ ...teamObject, players: teamPlayersArray });
    }).catch((error) => reject(error));
});
const getPlayerTeam = (firebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(firebaseKey).then((playerObject) => {
    getSingleTeam(playerObject.firebaseKey).then((teamObject) => {
      resolve({ teamObject, ...playerObject });
    }).catch((error) => reject(error));
  });
});
export {
  deleteTeamPlayers,
  viewTeamDetails,
  getPlayerTeam,
};
