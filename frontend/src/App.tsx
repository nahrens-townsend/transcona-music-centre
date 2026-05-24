import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Guitar from "@/pages/Guitar";
import Voice from "@/pages/Voice";
import Piano from "@/pages/Piano";
import Violin from "@/pages/Violin";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--navbar-height, 80px)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visit-us" element={<Contact />} />
          <Route path="/guitar" element={<Guitar />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/piano" element={<Piano />} />
          <Route path="/violin" element={<Violin />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
