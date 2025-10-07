// // src/pages/QuizLandingPage.jsx (ATUALIZADO)
// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Categories from "../components/Categories";
// import FeaturedQuizzes from "../components/FeaturedQuizzes";
// import AdsBanner from "../components/AdsBanner";
// import Footer from "../components/Footer";
// import { useLocation } from 'react-router-dom';
// import SEO from "../components/SEO";

// export default function QuizLandingPage() {
//   const location = useLocation();
//   const [isDark, setIsDark] = useState(() => {
//     if (typeof window === "undefined") return false;
//     const stored = localStorage.getItem("theme");
//     if (stored) return stored === "dark";
//     return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
//   });

//   const [sortBy, setSortBy] = useState(() => localStorage.getItem("sortBy") || "popular");

//     useEffect(() => {
//     // Lidar com âncoras quando a página carrega
//     if (location.hash) {
//       const sectionId = location.hash.replace('#', '');
//       setTimeout(() => {
//         const element = document.getElementById(sectionId);
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth' });
//         }
//       }, 100);
//     }
//   }, [location]);
  
//   useEffect(() => {
//     if (isDark) document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//     localStorage.setItem("theme", isDark ? "dark" : "light");
//   }, [isDark]);

//   useEffect(() => {
//     localStorage.setItem("sortBy", sortBy);
//   }, [sortBy]);

//   const toggleDark = () => setIsDark(prev => !prev);

//   return (
//     <>
//          <SEO 
//         title="BrainMaster - Quizzes Educativos e Desafios Mentais"
//         description="Teste seu conhecimento com mais de 300 perguntas gratuitas em diversas categorias. Personalidade, entretenimento, games, esportes, lifestyle e conhecimento geral. Torne-se um BrainMaster!"
//         keywords="quiz, conhecimento, entretenimento, educação, jogos, personalidade, games, esportes, lifestyle, desafios mentais, brainmaster, perguntas e respostas"
//       />
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
//       <Navbar isDark={isDark} toggleDark={toggleDark} sortBy={sortBy} setSortBy={setSortBy} />
//       <main>
//         <Hero />
//         <Categories sortBy={sortBy} />
//         <FeaturedQuizzes sortBy={sortBy} />
//         <AdsBanner />
//       </main>
//       <Footer />
//     </div>
//     </>
//   );
// }




// src/pages/QuizLandingPage.jsx (ATUALIZADO COM BLOG)
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedQuizzes from "../components/FeaturedQuizzes";
import AdsBanner from "../components/AdsBanner";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from 'react-router-dom'; // Adicione useNavigate
import SEO from "../components/SEO";

// Componente novo - BlogPreview
const BlogPreview = () => {
  const navigate = useNavigate();
  
  const blogPosts = [
    {
      id: 1,
      title: "Como os Quizzes Melhoram Sua Memória em 50%",
      excerpt: "Descubra a ciência por trás do aprendizado através de testes...",
      readTime: "5 min",
      category: "Aprendizado"
    },
    {
      id: 2,
      title: "10 Técnicas para Memorização Eficiente",
      excerpt: "Estratégias baseadas em pesquisas de neurociência...",
      readTime: "7 min",
      category: "Memorização"
    },
    {
      id: 3,
      title: "Por que Brincar Ajuda a Aprender",
      excerpt: "Entenda como elementos lúdicos aceleram o aprendizado...",
      readTime: "6 min",
      category: "Psicologia"
    }
  ];

  return (
    <section id="blog" className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Blog Educacional
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Artigos baseados em ciência sobre aprendizado eficiente e métodos de estudo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate('/blog')}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  {post.readTime}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/blog')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Ver Todos os Artigos
          </button>
        </div>
      </div>
    </section>
  );
};

// Componente novo - EducationalContent
const EducationalContent = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Por que Aprender com Quizzes?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Descubra os benefícios científicos dos métodos interativos de aprendizado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              🧠 Base Científica
            </h3>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Pesquisas em <strong>psicologia cognitiva</strong> demonstram que o 
                <strong> teste ativo da memória</strong> é uma das formas mais eficazes 
                de consolidar informações. Quando você responde a perguntas, está 
                fortalecendo as conexões neurais relacionadas ao conhecimento.
              </p>
              
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Estudos da <strong>Universidade de Harvard</strong> mostram que estudantes 
                que utilizam quizzes regulares podem melhorar sua retenção de conhecimento 
                em até <strong>50%</strong> comparado com métodos tradicionais de estudo.
              </p>

              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Principais Benefícios:
              </h4>
              <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                <li>• <strong>Memorização mais eficiente</strong> através da repetição espaçada</li>
                <li>• <strong>Identificação de lacunas</strong> de conhecimento</li>
                <li>• <strong>Feedback imediato</strong> para correção rápida</li>
                <li>• <strong>Engajamento maior</strong> que métodos passivos</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                📈 Metodologia Comprovada
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Utilizamos técnicas baseadas em <strong>repetição espaçada</strong> e 
                <strong> testes adaptativos</strong> para maximizar a retenção de 
                conhecimento. Nossos quizzes são desenvolvidos seguindo princípios 
                da <strong>psicologia educacional</strong>.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                🎯 Para Todos os Níveis
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Desde iniciantes até especialistas, nossa plataforma oferece conteúdo 
                para todos os níveis. Com <strong>dificuldades progressivas</strong>, 
                você pode evoluir no seu próprio ritmo e acompanhar seu progresso.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                🏆 Aprendizado Gamificado
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Sistema de <strong>conquistas e ranking</strong> que motiva a 
                melhoria contínua. A competição saudável estimula o aprofundamento 
                do conhecimento e mantém o engajamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
          
          {/* NOVAS SEÇÕES ADICIONADAS AQUI - POSIÇÃO ESTRATÉGICA */}
          <EducationalContent />
          <AdsBanner />
          <BlogPreview />
        </main>
        <Footer />
      </div>
    </>
  );
}