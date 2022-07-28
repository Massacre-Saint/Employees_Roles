import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewTeamDetails } from '../../api/margedData';
import PlayerCard from '../../components/cards/PlayerCard';
import Search from '../../components/Search';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [players, setPlayers] = useState([]);
  console.warn(teamDetails);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getAllPlayers = () => {
    viewTeamDetails(firebaseKey).then((arrayObjects) => {
      setTeamDetails(arrayObjects);
      setFilteredPlayers(arrayObjects.players);
      setPlayers(arrayObjects.players);
    });
  };
  useEffect(() => {
    getAllPlayers(firebaseKey);
  }, [firebaseKey]);
  return (
    <div>
      <div className="team-header-container">
        <div className="team-hero-header">{teamDetails.name}</div>
        <div className="search-bar">
          <Search players={players} teamDetails={teamDetails} setFilteredPlayers={setFilteredPlayers} />
        </div>
      </div>
      <h1>ASSIGNED SPARTANS</h1>
      <div className="divider-line-lg" />
      <div className="player-cards-container">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>
    </div>
  );
}
