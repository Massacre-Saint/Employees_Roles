import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteSinglePlayer, getPlayers } from '../../api/playerData';
import { getTeams } from '../../api/teamData';
import { useAuth } from '../../utils/context/authContext';
// import { viewPlayerTeam } from '../../api/margedData';

export default function PlayerCard({ playerObj, onUpdate }) {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    getPlayers(user.uid).then(setPlayers);
  }, [playerObj]);
 
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.gamertag}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <section className="player-card">
      <div>
        <span>
          <h3 className="player-title">{playerObj.gamertag}</h3>
          <h4 className="player-team">{playerObj.teamId}</h4>
          <Button className="delete-button" onClick={deleteThisPlayer}>X</Button>
        </span>
        <div className="image-container">
          <div className="image-ratio">
            <div className="player-image">
              <Image className="player-image" src={playerObj.image} alt={playerObj.gamertag} />
            </div>
          </div>
        </div>
        <div className="player-content">
          <div className="player-rank-container">
            <div className="player-rank-image" style={{ backgroundPosition: '393px -100px' }} />
          </div>
          <div className="rank-title"> Highest Rank</div>
          <div className="rank-name">{playerObj.rank}</div>
        </div>
        <Link className="button" href={`/players/edit/${playerObj.firebaseKey}`} passHref>
          <button type="button">View Player</button>
        </Link>
      </div>
    </section>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    gamertag: PropTypes.string,
    image: PropTypes.string,
    rank: PropTypes.string,
    teamId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
