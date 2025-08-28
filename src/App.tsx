import { useEffect, useState } from "react";
import { createNote, getNotes } from "./helpers/api";
import type { NoteRequest, NoteResponse } from "./types";
import Login from "./components/Login";



export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      {loggedIn ? (
        <h1>Welcome! You are logged in.</h1>
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </main>
  );
}
