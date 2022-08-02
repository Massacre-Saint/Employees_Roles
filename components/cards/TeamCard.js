import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import team from '../../public/team.png';
import { useAuth } from '../../utils/context/authContext';
import { viewTeamDetails, deleteTeamPlayers } from '../../api/margedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const [playerCount, setPlayerCount] = useState(0);
  const showPublicPlayers = () => {
    viewTeamDetails(teamObj.firebaseKey).then((arrayObjects) => {
      setPlayerCount(arrayObjects.players.length);
    });
  };
  const { user } = useAuth();
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteTeamPlayers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };
  useEffect(() => {
    showPublicPlayers(teamObj.firebaseKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="player-card">
      <div>
        <span>
          <h3 className="player-title">{teamObj.name}</h3>
          <h4 className="player-team">Total Spartans: {playerCount}</h4>
          <Button className="delete-button" onClick={deleteThisTeam}>X</Button>

        </span>
        <div className="image-container">
          <div className="team-image-ratio">
            <div className="team-image">
              <Image className="team-image" src={team} alt={teamObj.name} />
            </div>
          </div>
        </div>
        {
            teamObj.uid !== user.uid
              ? (
                ''
              )
              : (
                <>
                  <div className="button-contaier">
                    <a className="button" href={`/teams/edit/${teamObj.firebaseKey}`}>
                      <div className="outer-shadow" />
                      <div className="outer" />
                      <div className="inner-container">
                        <div className="container-shadow" />
                        <div className="container-background" />
                        <span className="button-content">
                          <span>Edit Team</span>
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="button-contaier">
                    <a className="button" href={`/teams/${teamObj.firebaseKey}`}>
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
    // <Card style={{ width: '18rem', margin: '10px' }}>
    //   <Card.Body>
    //     <Card.Title>FIRETEAM: {teamObj.name}</Card.Title>
    //     <Link href={`/teams/${teamObj.firebaseKey}`} passHref>
    //       <Button variant="primary" className="m-2">VIEW</Button>
    //     </Link>
    //     <Link href={`/teams/edit/${teamObj.firebaseKey}`} passHref>
    //       <Button variant="info">EDIT</Button>
    //     </Link>
    //     <Button variant="danger" onClick={deleteThisTeam} className="m-2">
    //       DELETE
    //     </Button>
    //   </Card.Body>
    // </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    public: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
