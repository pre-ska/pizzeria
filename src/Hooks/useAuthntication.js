import { useEffect, useState } from "react";

let auth = window.firebase.auth();
let provider = new window.firebase.auth.GoogleAuthProvider();

export function useAuthentication() {
  const [authenticated, setAuthenticated] = useState("loading");

  function login() {
    auth.signInWithPopup(provider);
  }

  function logout() {
    auth
      .signOut()
      .then(() => {
        //sign out successful
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          setAuthenticated(user);
        } else {
          setAuthenticated();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return { login, loggedIn: authenticated, logout };
}
