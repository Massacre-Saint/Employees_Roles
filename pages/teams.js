import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/cards/TeamCard';

export default function Team() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const getAllTeams = () => {
    getTeams(user.uid).then((teamArray) => {
      setTeams(teamArray);
    });
  };
  useEffect(() => {
    getAllTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div>
      <div>
        <div className="button-contaier">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="button-middle" href="/teams/new">
            <div className="outer-shadow" />
            <div className="outer" />
            <div className="inner-container">
              <div className="container-shadow" />
              <div className="container-background" />
              <span className="button-content">
                <span>Add Team</span>
              </span>
            </div>
          </a>
        </div>
        <div className="player-cards-container">
          {teams.map((team) => (
            <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
          ))}
        </div>
      </div>
    </div>
  );
}
