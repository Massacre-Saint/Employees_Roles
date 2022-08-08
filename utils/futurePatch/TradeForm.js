// import { useRouter } from 'next/router';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { useAuth } from '../../utils/context/authContext';
// import { getTeams, updateTeam } from '../../api/teamData';
// import { createTrade } from '../../api/tradeData';

// const intitialState = {
//   name: '',
//   public: true,
//   fromUser: '',
//   traded: false,
//   denied: false,
// };
// export default function TradeForm({ teamObj }) {
//   const [userTeams, setUserTeams] = useState([]);
//   const router = useRouter();
//   const [formInput, setFormInput] = useState(intitialState);
//   const { user } = useAuth();
//   useEffect(() => {
//     getTeams(user.uid).then(setUserTeams);
//     setFormInput(teamObj);
//   }, [teamObj, user]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = { ...formInput, fromUser: teamObj.uid, uid: user.uid };
//     createTrade(payload).then(() => router.push('/'));
//     updateTeam(formInput).then(() => router.push('/'));
//   };
//   return (

//     <Form>
//       <Form.Group className="mb-3">
//         <Form.Label>Chosen Team</Form.Label>
//         <Form.Control placeholder={teamObj.name} disabled />
//       </Form.Group>
//       <Form.Group className="mb-3">
//         <Form.Label>Your Team to Trade</Form.Label>
//         <Form.Select
//           aria-label="Team"
//           name="uid"
//           value={formInput.uid}
//           onChange={handleChange}
//           className="mb-3"
//           required
//         >
//           <option value="">Choose your team.</option>
//           {
//             userTeams.map((team) => (
//               <option
//                 key={team.firebaseKey}
//                 value={team.firebaseKey}
//               >
//                 {team.name}
//               </option>
//             ))
//           }
//         </Form.Select>
//         <Form.Check
//           className="text-white mb-3"
//           type="switch"
//           id="public"
//           name="true"
//           label="Public?"
//           checked={formInput.public}
//           onChange={(e) => setFormInput((prevState) => ({
//             ...prevState,
//             public: e.target.checked,
//           }))}
//         />
//       </Form.Group>
//       <Button variant="primary" onClick={handleSubmit}>
//         Submit Trade
//       </Button>
//     </Form>
//   );
// }
// TradeForm.propTypes = {
//   teamObj: PropTypes.shape({
//     firebaseKey: PropTypes.string,
//     name: PropTypes.string,
//     public: PropTypes.bool,
//     uid: PropTypes.string,
//   }),
// };

// TradeForm.defaultProps = {
//   teamObj: intitialState,
// };
