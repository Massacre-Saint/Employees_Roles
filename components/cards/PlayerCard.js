import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { deleteSinglePlayer } from '../../api/playerData';
import { viewRankDeatils, viewTeamDetails } from '../../api/margedData';

export default function PlayerCard({ playerObj, onUpdate }) {
  const teamFirebaseKey = playerObj.teamId;
  const [teamDetails, setTeamDetails] = useState({});
  const [rankDetails, setRankDetails] = useState({});
  const { user } = useAuth();
  const showTeamName = () => {
    viewTeamDetails(teamFirebaseKey).then((objectArray) => {
      setTeamDetails(objectArray);
    });
  };
  const showRankDetails = () => {
    viewRankDeatils(playerObj.rank).then((objectArray) => {
      setRankDetails(objectArray);
    });
  };
  useEffect(() => {
    showTeamName();
    showRankDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          <h4 className="player-team">{teamDetails.name}</h4>
          {
            playerObj.uid !== user.uid
              ? (
                ''
              )
              : (
                <Button className="delete-button" onClick={deleteThisPlayer}>X</Button>
              )
          }
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
            <div className="player-rank-image" style={{ backgroundPosition: '393px -100px' }}>
              <Image className="player-rank-image" src={rankDetails.image} alt={rankDetails.name} />
            </div>
            <div>
              <div className="rank-title"> Highest Rank</div>
              <div className="rank-name">{rankDetails.name}</div>
            </div>
          </div>

        </div>
        {
            playerObj.uid !== user.uid
              ? (
                ''
              )
              : (
                <>
                  <div className="button-contaier">
                    <a className="button" href={`/players/edit/${playerObj.firebaseKey}`}>
                      <div className="outer-shadow" />
                      <div className="outer" />
                      <div className="inner-container">
                        <div className="container-shadow" />
                        <div className="container-background" />
                        <span className="button-content">
                          <span>Edit Player</span>
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="button-contaier">
                    <a className="button" href={`/teams/${playerObj.teamId}`}>
                      <div className="outer-shadow" />
                      <div className="outer" />
                      <div className="inner-container">
                        <div className="container-shadow" />
                        <div className="container-background" />
                        <span className="button-content">
                          <span>View Team</span>
                        </span>
                      </div>
                    </a>
                  </div>
                </>
              )
          }
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
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
