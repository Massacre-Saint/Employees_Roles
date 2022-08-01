/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getPublicTeams } from '../api/teamData';
import TeamTable from '../components/cards/TeamTable';

export default function Public() {
  const [publicTeams, setPublicTeams] = useState([]);
  const [, setTeamObj] = useState({});
  const showPublicTeams = () => {
    getPublicTeams().then((teams) => {
      setPublicTeams(teams);
      publicTeams.map((Obj) => setTeamObj(Obj));
    });
  };
  useEffect(() => {
    showPublicTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="public-header">
        <div className="public-hero">
          <div className="public-nav" />
          <div className="nav-wrap">
            <h1 className="public-title">PUBLIC TEAMS</h1>
            <div className="public-nav-links">
              <nav className="public-nav-links-item">
              </nav>
            </div>
            <div className="public-nav-search">
              <div className="public-search-bar">
                Insert Search Bar
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="public-table-container">
        <div>
          <Table className="table" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Team Name</th>
                <th># of Spartans</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {publicTeams.map((team) => (
                <TeamTable key={team.firebaseKey} teamObj={team} onUpdate={showPublicTeams} />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
