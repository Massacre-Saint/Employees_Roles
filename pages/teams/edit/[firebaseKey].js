import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { getSingleTeam } from '../../../api/teamData';
import TeamForm from '../../../components/forms/TeamForm';

export default function EditTeam() {
  const [updateTeam, setUpdateTeam] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setUpdateTeam);
  }, [firebaseKey]);
  return (<TeamForm obj={updateTeam} />);
}
