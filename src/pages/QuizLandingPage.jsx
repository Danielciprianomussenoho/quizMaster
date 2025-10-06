// src/pages/QuizLandingPage.jsx (ATUALIZADO)
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedQuizzes from "../components/FeaturedQuizzes";
import AdsBanner from "../components/AdsBanner";
import Footer from "../components/Footer";
import { useLocation } from 'react-router-dom';
import SEO from "../components/SEO";

export default function QuizLandingPage() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [sortBy, setSortBy] = useState(() => localStorage.getItem("sortBy") || "popular");

    useEffect(() => {
    // Lidar com âncoras quando a página carrega
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);
  
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  const toggleDark = () => setIsDark(prev => !prev);

  return (
    <>
         <SEO 
        title="BrainMaster - Quizzes Educativos e Desafios Mentais"
        description="Teste seu conhecimento com mais de 300 perguntas gratuitas em diversas categorias. Personalidade, entretenimento, games, esportes, lifestyle e conhecimento geral. Torne-se um BrainMaster!"
        keywords="quiz, conhecimento, entretenimento, educação, jogos, personalidade, games, esportes, lifestyle, desafios mentais, brainmaster, perguntas e respostas"
      />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Navbar isDark={isDark} toggleDark={toggleDark} sortBy={sortBy} setSortBy={setSortBy} />
      <main>
        <Hero />
        <Categories sortBy={sortBy} />
        <FeaturedQuizzes sortBy={sortBy} />
        <AdsBanner />
      </main>
      <Footer />
    </div>
    </>
  );
}