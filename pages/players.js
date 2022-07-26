import React, { useEffect, useState } from 'react';
import { getPlayers } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/cards/PlayerCard';
import Search from '../components/Search';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();
  const getAllPlayers = () => {
    getPlayers(user.uid).then((playerArray) => {
      setPlayers(playerArray);
      setFilteredPlayers(playerArray);
    });
  };
  useEffect(() => {
    getAllPlayers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div>
      <div>
        <Search players={players} setFilteredPlayers={setFilteredPlayers} />
        <div className="player-cards-container">
          {/* TODO: map over books here using BookCard component */}
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
          ))}
        </div>
      </div>
    </div>
  );
}
