import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Mediation } from "./pages/Mediation";
import { WhatWeDo } from "./pages/WhatWeDo";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mediation-explained" element={<Mediation />} />
        <Route path="what-we-do" element={<WhatWeDo />} />
        <Route path="about" element={<About />} />
        <Route path="get-in-touch" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
