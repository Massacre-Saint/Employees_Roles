import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import TradeForm from './TradeForm';
import { useAuth } from '../../utils/context/authContext';

export default function TradeModal({ teamObj }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useAuth();
  useEffect(() => {
    if (teamObj.firebaseKey) console.warn('hello');
  }, [teamObj, user]);

  return (
    <>
      <button type="button" onClick={handleShow}>
        <FontAwesomeIcon className="icon" icon={faArrowRightArrowLeft} alt="tade team" />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trade Team?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TradeForm teamObj={teamObj} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
TradeModal.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    public: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
};
