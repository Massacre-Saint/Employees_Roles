import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewTeamDetails } from '../../api/margedData';
import PlayerCard from '../../components/cards/PlayerCard';
import Search from '../../components/Search';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [players, setPlayers] = useState([]);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);
  return (
    <div>
      <div className="header-container">
        <div className="hero-header">{teamDetails.name}</div>
        <div className="search-bar">
          <Search players={players} teamDetails={teamDetails} setFilteredPlayers={setFilteredPlayers} />
        </div>
      </div>
      <h1 className="text-lg">ASSIGNED SPARTANS</h1>
      <div className="divider-line-lg" />
      {
        players.length
          ? (
            ''
          )
          : (
            <div className="no-content">
              <h1>Oops,</h1>
              <p>No Spartans are associated with Fireteam {teamDetails.name}.
                Please create a Spartan to see your roster!
              </p>
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
