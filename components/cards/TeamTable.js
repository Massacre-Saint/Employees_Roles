import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import { useAuth } from '../../utils/context/authContext';
import { viewTeamDetails } from '../../api/margedData';

function TeamTable({ teamObj }) {
  // const [publicPlayers, setPublicPlayers] = useState({});
  const [playerCount, setPlayerCount] = useState(0);
  // const { user } = useAuth();
  const showPublicPlayers = () => {
    viewTeamDetails(teamObj.firebaseKey).then((arrayObjects) => {
      // setPublicPlayers(arrayObjects);
      setPlayerCount(arrayObjects.players.length);
    });
  };
  useEffect(() => {
    showPublicPlayers(teamObj.firebaseKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <tr>
      <td>{teamObj.name}</td>
      <td>{playerCount}</td>
      <td>{teamObj.uid}
        {/* {
          teamObj.uid === user.uid
            ? `${user.displayName}`
            : 'different'
        } */}
      </td>
    </tr>
  );
}

export default TeamTable;

TeamTable.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    players: PropTypes.arrayOf(PropTypes.shape({
      firebaseKey: PropTypes.string,
      gamertag: PropTypes.string,
      rank: PropTypes.string,
      teamId: PropTypes.string,
      uid: PropTypes.string,
    })),
    public: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
};
