import {  useState } from "react";
import Login from "./myComponents/Login";



export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <main style={{  fontFamily: "sans-serif" }}>
      {loggedIn ? (
        <h1>Welcome! You are logged in.</h1>
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </main>
  );
}
