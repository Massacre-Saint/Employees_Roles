/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table } from 'react-bootstrap';
import { getPublicTeams } from '../api/teamData';
import TeamTable from '../components/cards/TeamTable';

export default function Public() {
  const [publicTeams, setPublicTeams] = useState([]);
  const [teamObj, setTeamObj] = useState({});
  const showPublicTeams = () => {
    getPublicTeams().then((teams) => {
      setPublicTeams(teams);
      publicTeams.map((Obj) => setTeamObj(Obj));
      // const teamFirebaseKey = teams.map((team) => team.firebaseKey);
    });
  };
  useEffect(() => {
    showPublicTeams();
  }, []);
  return (
    <div key={1}>
      <div className="public-header">
        <div className="public-hero">
          <div className="public-nav" />
          <div className="nav-wrap">
            <h1 className="public-title">PUBLIC TEAMS</h1>
            <div className="public-nav-links">
              <nav className="public-nav-links-item">
                <Link key={teamObj.firebaseKey} href="/teams/" className="public-nav-link" passHref>
                  Teams
                </Link>
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
                <th>#</th>
                <th>Username</th>
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
