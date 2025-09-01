import Home from "./myComponents/Home";
import Layout from "./myComponents/Layout";
import { Routes, Route } from "react-router"


export default function App() {


  return (

    <main style={{ fontFamily: "sans-serif" }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/inbox" element={<h1>Inbox</h1>} />
          <Route path="/calendar" element={<h1>Calendar</h1>} />
          <Route path="/search" element={<h1>Search</h1>} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Routes>
      </Layout>
    </main>

  );
}
