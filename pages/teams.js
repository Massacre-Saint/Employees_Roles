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
        <div className="player-cards-container">
          {/* TODO: map over books here using BookCard component */}
          <h1>Public</h1>
          {teams.map((team) => (
            <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
          ))}
          <h1>Private</h1>
        </div>
      </div>
    </div>
  );
}
