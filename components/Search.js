import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Search({ players, setFilteredPlayers }) {
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    const results = players.filter((player) => player.gamertag.trim().toLowerCase().includes(query) || player.rank.trim().toLowerCase().includes(query));
    setFilteredPlayers(results);
  };
  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search Gamertag"
          className="me-2"
          aria-label="Search"
          value={query}
          name="search"
          onChange={handleChange}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </div>
  );
}
Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    gamertag: PropTypes.string,
  })),
  teamDetails: PropTypes.shape({
    players: PropTypes.arrayOf(PropTypes.shape({
      gamertag: PropTypes.string,
    })),
  }),
  setFilteredPlayers: PropTypes.func,
};

Search.defaultProps = {
  players: PropTypes.arrayOf(PropTypes.shape({
    gamertag: '',
  })),
  teamDetails: {},
  setFilteredPlayers: () => {},
};
