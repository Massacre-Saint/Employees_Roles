// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { deleteSinglePlayer } from '../../api/playerData';

export default function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.gamertag}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <section className="player-card">
      <div>
        <span>
          <h3 className="player-title ">{playerObj.gamertag}</h3>
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
        <div className="button-contaier">
          <a className="button" href={`/players/edit/${playerObj.firebaseKey}`} passHref>
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
      </div>
    </section>
  // <Card style={{ width: '18rem', margin: '10px' }}>
  //   <Card.Img variant="top" src={playerObj.image} alt={playerObj.gamertag} style={{ height: '400px' }} />
  //   <Card.Body>
  //     <Card.Title>{playerObj.gamertag}</Card.Title>
  //     <p className="card-text bold"><span>Rank</span><br /> {playerObj.rank}</p>
  //     <Link href={`/players/${playerObj.firebaseKey}`} passHref>
  //       <Button variant="primary" className="m-2">VIEW</Button>
  //     </Link>
  //     <Link href={`/players/edit/${playerObj.firebaseKey}`} passHref>
  //       <Button variant="info">EDIT</Button>
  //     </Link>
  //     <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
  //       DELETE
  //     </Button>
  //   </Card.Body>
  // </Card>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    gamertag: PropTypes.string,
    image: PropTypes.string,
    rank: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
