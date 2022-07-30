import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeamPlayers } from '../../api/margedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteTeamPlayers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>FIRETEAM: {teamObj.name}</Card.Title>
        <Link href={`/teams/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/teams/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    public: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
