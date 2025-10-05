// src/pages/QuizLandingPage.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedQuizzes from "../components/FeaturedQuizzes";
import AdsBanner from "../components/AdsBanner";
import Footer from "../components/Footer";

export default function QuizLandingPage() {
  const [isDark, setIsDark] = useState(() => {
    // inicialização segura (evita erro SSR)
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    // fallback para preferência do sistema
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // adiciona/remove classe 'dark' no <html>
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // persiste escolha
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // sortBy persistente (opcional)
  const [sortBy, setSortBy] = useState(() => localStorage.getItem("sortBy") || "popular");
  useEffect(() => localStorage.setItem("sortBy", sortBy), [sortBy]);

  const toggleDark = () => setIsDark(prev => !prev);

  return (
    // NÃO é necessário envolver com className 'dark' aqui, já aplicamos no <html>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Navbar isDark={isDark} toggleDark={toggleDark} sortBy={sortBy} setSortBy={setSortBy} />
      <main>
        <Hero />
        <Categories />
        <FeaturedQuizzes />
        <AdsBanner />
      </main>
      <Footer />
    </div>
  );
}
