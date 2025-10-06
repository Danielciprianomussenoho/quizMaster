// src/components/Navbar.jsx
import { useState } from "react"; 
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, User, ChevronDown, Search, Home, Info, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ isDark, toggleDark, sortBy, setSortBy }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    // Scroll para o topo ao navegar
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnchorClick = (sectionId) => {
    if (location.pathname === '/') {
      // Se já está na página inicial, faz scroll suave
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se não está na página inicial, navega para home com hash
      navigate(`/#${sectionId}`);
      // Scroll para a seção após a navegação
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate("/");
    }
  };

  const quickActions = [
    { icon: <Home className="w-4 h-4" />, label: 'Início', onClick: () => handleNavigation('/') },
    { icon: <Info className="w-4 h-4" />, label: 'Sobre', onClick: () => handleNavigation('/about') },
    { icon: <Mail className="w-4 h-4" />, label: 'Contato', onClick: () => handleNavigation('/contact') }
  ];

  return (
    <nav className="bg-white dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <motion.button
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 group"
          >
            <div className="flex items-center space-x-2">
              <motion.div 
                whileHover={{ rotate: 5 }}
                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all"
              >
                <span className="text-white font-bold text-sm">Q</span>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                QuizMaster
              </span>
            </div>
          </motion.button>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation("/")}
              className={`transition-colors font-medium ${
                location.pathname === '/' 
                  ? 'text-purple-600 dark:text-purple-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              Início
            </button>
            <button 
              onClick={() => handleAnchorClick('categories')}
              className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              Categorias
            </button>
            <button 
              onClick={() => handleAnchorClick('trending')}
              className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              Em Alta
            </button>
            <button 
              onClick={() => handleNavigation("/about")}
              className={`transition-colors font-medium ${
                location.pathname === '/about' 
                  ? 'text-purple-600 dark:text-purple-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
              }`}
            >
              Sobre
            </button>
          </div>

          {/* Ações */}
          <div className="flex items-center space-x-4">
            
            {/* SortBy - Desktop */}
            <div className="hidden md:block relative group/sort">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 pr-8 text-sm bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
              >
                <option value="popular">📊 Popularidade</option>
                <option value="recent">🆕 Recentes</option>
                <option value="played">🎮 Mais Jogados</option>
                <option value="rating">⭐ Melhor Avaliados</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover/sort:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Ordenar quizzes
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
              </div>
            </div>

            {/* Dark/Light toggle */}
            <motion.button 
              onClick={toggleDark}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title={isDark ? "Modo Claro" : "Modo Escuro"}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400"/>
              ) : (
                <Moon className="w-5 h-5 text-slate-700"/>
              )}
            </motion.button>

            {/* Perfil Desktop */}
            <div className="relative group hidden md:block">
              <motion.button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <User className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}/>
              </motion.button>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <div className="px-4 py-2 mb-2 border-b border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {JSON.parse(localStorage.getItem('userProfile') || '{}').username || 'Usuário'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {JSON.parse(localStorage.getItem('userStats') || '{}').totalQuizzes || 0} quizzes
                        </p>
                      </div>
                      
                      <button
                        onClick={() => handleNavigation("/profile")}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors mb-1"
                      >
                        Meu Perfil
                      </button>
                      <button
                        onClick={() => handleNavigation("/profile")}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors mb-1"
                      >
                        Minhas Conquistas
                      </button>
                      
                      <hr className="my-2 border-slate-200 dark:border-slate-700" />
                      
                      {/* Quick Actions */}
                      <div className="space-y-1 mb-2">
                        {quickActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={action.onClick}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center space-x-2"
                          >
                            {action.icon}
                            <span>{action.label}</span>
                          </button>
                        ))}
                      </div>
                      
                      <hr className="my-2 border-slate-200 dark:border-slate-700" />
                      
                      <button
                        onClick={() => {
                          // Simular logout - limpar dados locais
                          localStorage.removeItem('userProfile');
                          setIsProfileOpen(false);
                          window.location.reload();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                      >
                        Sair
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-slate-700 dark:text-slate-300"/>
              ) : (
                <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300"/>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              
              {/* Search Bar Mobile */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar quizzes..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* SortBy Mobile */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Ordenar por:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-3 text-sm bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="popular">📊 Popularidade</option>
                  <option value="recent">🆕 Recentes</option>
                  <option value="played">🎮 Mais Jogados</option>
                  <option value="rating">⭐ Melhor Avaliados</option>
                </select>
              </div>

              {/* Navigation Links Mobile */}
              <div className="space-y-1">
                <button
                  onClick={() => handleNavigation("/")}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium flex items-center space-x-3 ${
                    location.pathname === '/' 
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>Início</span>
                </button>
                
                <button
                  onClick={() => handleAnchorClick('categories')}
                  className="w-full text-left px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors font-medium flex items-center space-x-3"
                >
                  <span>📚</span>
                  <span>Categorias</span>
                </button>
                
                <button
                  onClick={() => handleAnchorClick('trending')}
                  className="w-full text-left px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors font-medium flex items-center space-x-3"
                >
                  <span>🔥</span>
                  <span>Em Alta</span>
                </button>
                
                <button
                  onClick={() => handleNavigation("/about")}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium flex items-center space-x-3 ${
                    location.pathname === '/about' 
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Info className="w-5 h-5" />
                  <span>Sobre</span>
                </button>
                
                <button
                  onClick={() => handleNavigation("/profile")}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium flex items-center space-x-3 ${
                    location.pathname === '/profile' 
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Meu Perfil</span>
                </button>
              </div>

              {/* Quick Actions Mobile */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
                  Ações Rápidas
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={action.onClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      {action.icon}
                      <span>{action.label}</span>
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={() => handleNavigation("/contact")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contato</span>
                  </motion.button>
                </div>
              </div>

              {/* Current User Info Mobile */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {JSON.parse(localStorage.getItem('userProfile') || '{}').username?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {JSON.parse(localStorage.getItem('userProfile') || '{}').username || 'Usuário'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {JSON.parse(localStorage.getItem('userStats') || '{}').totalQuizzes || 0} quizzes completados
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Actions Mobile */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Configurações
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('userProfile');
                      setIsMenuOpen(false);
                      window.location.reload();
                    }}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}