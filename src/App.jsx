// src/App.jsx (ATUALIZADO)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizLandingPage from "./pages/QuizLandingPage";
import QuizPage from "./pages/QuizPage";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import RankingPage from "./pages/RankingPage";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Contact from "./pages/Contact";
import DMCA from "./pages/DMCA";
import HelpCenter from "./pages/HelpCenter";
import ReportProblem from "./pages/ReportProblem";
import SuggestQuiz from "./pages/SuggestQuiz";
import Cookies from "./pages/Cookies";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizLandingPage />} />
        <Route path="/quiz/:category" element={<QuizPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dmca" element={<DMCA />} />
        {/* Novas rotas */}
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/report-problem" element={<ReportProblem />} />
        <Route path="/suggest-quiz" element={<SuggestQuiz />} />
        <Route path="/cookies" element={<Cookies />} />
        {/* Fallback para rotas não encontradas */}
        <Route path="*" element={<QuizLandingPage />} />
      </Routes>
    </Router>
  );
}