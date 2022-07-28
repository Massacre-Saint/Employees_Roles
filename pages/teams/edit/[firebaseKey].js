import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import TeamForm from '../../../components/forms/TeamForm';
import { getSingleTeam } from '../../../api/teamData';

export default function EditPlayer() {
  const [updateTeam, setUpdateTeam] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setUpdateTeam);
  }, [firebaseKey]);
  return (<TeamForm obj={updateTeam} />);
}
