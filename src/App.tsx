import Home from "./myComponents/Home";
import Layout from "./myComponents/Layout";
import { Routes, Route } from "react-router"


export default function App() {


  return (

    <main style={{ fontFamily: "sans-serif" }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/folder/:folderId" element={<Home/>} />
        </Routes>
      </Layout>
    </main>

  );
}
