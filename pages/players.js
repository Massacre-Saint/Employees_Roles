import React, { useEffect, useState } from 'react';
import { getPlayers } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/cards/PlayerCard';
import Search from '../components/Search';
import { getTeams } from '../api/teamData';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();
  const getAllPlayers = () => {
    getPlayers(user.uid).then((playerArray) => {
      setPlayers(playerArray);
      setFilteredPlayers(playerArray);
    });
  };
  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };
  useEffect(() => {
    getAllPlayers();
    getAllTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div>
      <div className="header-container">
        <div className="hero-header">{user.displayName}&apos;s</div>
        <div className="search-bar">
          {
            !players.length
              ? (
                ''
              )
              : (
                <Search players={players} setFilteredPlayers={setFilteredPlayers} />
              )
          }
        </div>
      </div>
      <h1 className="text-lg">SPARTANS</h1>
      <div className="divider-line-lg" />
      {
        players.length && teams.length
          ? (
            ''
          )
          : (
            <div className="no-content">
              <h1>Oops,</h1>
              <p><b>No Spartans {!teams.length ? 'OR Fireteams' : ''}</b> are associated with your account.
                Please <b>create</b> a {!teams.length ? 'team' : ''} to see your creation!
              </p>
              <div className="button-contaier">
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a className="button-middle" href={!teams.length ? '/teams/new' : '/players/new'}>
                  <div className="outer-shadow" />
                  <div className="outer" />
                  <div className="inner-container">
                    <div className="container-shadow" />
                    <div className="container-background" />
                    <span className="button-content">
                      <span>{!teams.length ? 'Add Fireteam' : 'Add Spartan'}</span>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          )
      }
      <div className="player-cards-container">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>
    </div>
  );
}
