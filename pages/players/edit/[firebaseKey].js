import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { getSinglePlayer } from '../../../api/playerData';
import PlayerForm from '../../../components/forms/PlayerForm';

export default function EditPlayer() {
  const [updatePlayer, setUpdatePlayer] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setUpdatePlayer);
  }, [firebaseKey]);
  return (<PlayerForm obj={updatePlayer} />);
}
