import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../utils/context/authContext';
import { viewTeamDetails } from '../../api/margedData';

function TeamTable({ teamObj }) {
  const [playerCount, setPlayerCount] = useState(0);
  const [teamDetail, setTeamDetail] = useState({});
  const { user } = useAuth();
  const showPublicPlayers = () => {
    viewTeamDetails(teamObj.firebaseKey).then((arrayObjects) => {
      setTeamDetail(arrayObjects);
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
      <td className="table-row">
        {
          teamObj.uid !== user.uid
            ? (
              <span className="icons">
                <FontAwesomeIcon className="icon" icon={faGlobe} />
                <Button variant="light" href={`/teams/${teamDetail.firebaseKey}`}>Details</Button>
              </span>
            )
            : (
              <span className="icons">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <Button variant="light" href={`/teams/${teamDetail.firebaseKey}`}>Details</Button>
              </span>
            )
        }
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
