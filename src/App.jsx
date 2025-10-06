// src/App.jsx (ATUALIZADO FINAL)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizLandingPage from "./pages/QuizLandingPage";
import QuizPage from "./pages/QuizPage";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Contact from "./pages/Contact";
import DMCA from "./pages/DMCA";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizLandingPage />} />
        <Route path="/quiz/:category" element={<QuizPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dmca" element={<DMCA />} />
        {/* Fallback para rotas não encontradas */}
        <Route path="*" element={<QuizLandingPage />} />
      </Routes>
    </Router>
  );
}