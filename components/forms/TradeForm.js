import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getTeams, updateTeam } from '../../api/teamData';

export default function TradeForm({ teamObj }) {
  const [userTeams, setUserTeams] = useState([]);
  const [formInput, setFormInput] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    getTeams(user.uid).then(setUserTeams);
    setFormInput(teamObj);
  }, [teamObj, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (

    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Chosen Team</Form.Label>
        <Form.Control placeholder={teamObj.name} disabled />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Your Team to Trade</Form.Label>
        <Form.Select
          aria-label="Team"
          name="uid"
          value={formInput.name}
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Choose your team.</option>
          {
            userTeams.map((team) => (
              <option
                key={team.uid}
                value={user.uid}
              >
                {team.name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>
    </Form>
  );
}
TradeForm.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    public: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
};
