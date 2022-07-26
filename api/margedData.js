import { deleteSinglePlayer } from './playerData';
import { getTeamPlayers, deleteSingleTeam } from './teamData';

const deleteTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  getTeamPlayers(teamId).then((playerArray) => {
    const deletePlayersPromises = playerArray.map((player) => deleteSinglePlayer(player.firebaseKey));
    Promise.all(deletePlayersPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export default deleteTeamPlayers;
