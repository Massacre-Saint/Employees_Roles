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
      <div className="header-container">
        <div className="hero-header">{user.displayName}&apos;s</div>
        <div className="search-bar">
          <Search players={players} setFilteredPlayers={setFilteredPlayers} />
        </div>
      </div>
      <h1 className="text-lg">SPARTANS</h1>
      <div className="divider-line-lg" />
      <div className="button-contaier">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="button-middle" href="/players/new">
          <div className="outer-shadow" />
          <div className="outer" />
          <div className="inner-container">
            <div className="container-shadow" />
            <div className="container-background" />
            <span className="button-content">
              <span>Add Spartan</span>
            </span>
          </div>
        </a>
      </div>
      <div className="player-cards-container">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>
    </div>
  );
}
