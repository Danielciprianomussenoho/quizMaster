import { useState } from "react"; 
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, User, ChevronDown } from "lucide-react";

export default function Navbar({ isDark, toggleDark, sortBy, setSortBy }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              QuizMaster
            </span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-purple-600 dark:hover:text-purple-400">Início</a>
            <a href="#categories" className="hover:text-purple-600 dark:hover:text-purple-400">Categorias</a>
            <a href="#trending" className="hover:text-purple-600 dark:hover:text-purple-400">Em Alta</a>
            <a href="#about" className="hover:text-purple-600 dark:hover:text-purple-400">Sobre</a>
          </div>

          {/* Ações */}
          <div className="flex items-center space-x-4">
            {/* SortBy */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="hidden md:block border rounded-md px-2 py-1 text-sm bg-white dark:bg-slate-800 dark:text-white"
            >
              <option value="popular">Popularidade</option>
              <option value="recent">Recentes</option>
              <option value="played">Mais Jogados</option>
            </select>

            {/* Dark/Light toggle */}
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
              {isDark ? <Sun className="w-5 h-5 text-yellow-400"/> : <Moon className="w-5 h-5 text-slate-700"/>}
            </button>

            {/* Perfil */}
            <div className="relative group hidden md:block">
              <button className="flex items-center space-x-2">
                <User className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
                <ChevronDown className="w-4 h-4 text-slate-500"/>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg hidden group-hover:block">
                <a href="/profile" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">Perfil</a>
                <a href="/settings" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">Configurações</a>
                <a href="/logout" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">Sair</a>
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - fora do flex, logo abaixo */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
          >
            <div className="px-4 py-4 space-y-4">
              <input
                type="text"
                placeholder="Buscar quizzes..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <div className="space-y-2">
                <a href="#home" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-purple-600">Início</a>
                <a href="#categories" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-purple-600">Categorias</a>
                <a href="#trending" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-purple-600">Em Alta</a>
                <a href="#about" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-purple-600">Sobre</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
