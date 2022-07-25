import React, { useEffect, useState } from 'react';
import { getPlayers } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/cards/PlayerCard';

function Home() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();
  const getAllPlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };
  useEffect(() => {
    getAllPlayers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {players.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>

    </div>
  );
}

export default Home;
