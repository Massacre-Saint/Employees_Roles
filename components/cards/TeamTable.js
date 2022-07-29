import PropTypes from 'prop-types';

function TeamTable({ teamObj }) {
  return (
    <tr>
      <td>{teamObj.name}</td>
      <td>#</td>
      <td>{teamObj.uid}</td>
    </tr>
  );
}

export default TeamTable;

TeamTable.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    public: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
};
