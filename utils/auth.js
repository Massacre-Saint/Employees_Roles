import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = () => {
  // const provider = new firebase.auth.GoogleAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(githubProvider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, signOut };
