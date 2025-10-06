// src/components/Categories.jsx (ATUALIZADO)
import { motion } from "framer-motion";
import { Star, TrendingUp, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScoreSystem } from "../utils/ScoreSystem";
import { useState, useEffect } from "react";
import { SortManager } from "../utils/SortManager";

const categoriesData = [
  { 
    id: 1, 
    name: "personalidade", 
    icon: "👤", 
    color: "from-purple-500 to-pink-500", 
    description: "Descubra mais sobre você", 
    popular: true,
    participants: "125K",
    quizzes: 45,
    createdAt: "2024-01-10"
  },
  { 
    id: 2, 
    name: "entretenimento", 
    icon: "🎬", 
    color: "from-blue-500 to-cyan-500", 
    description: "Filmes e celebridades", 
    popular: true,
    participants: "89K", 
    quizzes: 38,
    createdAt: "2024-01-15"
  },
  { 
    id: 3, 
    name: "conhecimento", 
    icon: "🧠", 
    color: "from-green-500 to-emerald-500", 
    description: "Teste seu QI e cultura", 
    popular: false,
    participants: "67K",
    quizzes: 52,
    createdAt: "2024-01-08"
  },
  {
    id: 4,
    name: 'games',
    icon: '🎮',
    color: 'from-red-500 to-orange-500',
    description: 'Mundo dos videogames',
    popular: true,
    participants: "95K",
    quizzes: 41,
    createdAt: "2024-01-20"
  },
  {
    id: 5,
    name: 'esportes',
    icon: '⚽',
    color: 'from-yellow-500 to-amber-500',
    description: 'Futebol e outros esportes',
    popular: false,
    participants: "45K",
    quizzes: 28,
    createdAt: "2024-01-25"
  },
  {
    id: 6,
    name: 'lifestyle',
    icon: '🌟',
    color: 'from-indigo-500 to-purple-500',
    description: 'Estilo de vida e hobbies',
    popular: false,
    participants: "38K",
    quizzes: 33,
    createdAt: "2024-01-30"
  }
];

export default function Categories({ sortBy }) {
  const navigate = useNavigate();
  const [sortedCategories, setSortedCategories] = useState([]);

  // Aplicar sorting quando sortBy mudar
  useEffect(() => {
    const sorted = SortManager.sortQuizzes(categoriesData, sortBy);
    setSortedCategories(sorted);
  }, [sortBy]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/quiz/${categoryName}`);
  };

  const CategoryCard = ({ category, index }) => {
    const stats = ScoreSystem.getCategoryStats(category.name);
    
    return (
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5, scale: 1.02 }}
        onClick={() => handleCategoryClick(category.name)}
        className={`bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 cursor-pointer group relative overflow-hidden ${
          category.popular ? 'ring-2 ring-yellow-400' : ''
        }`}
      >
        {category.popular && (
          <div className="absolute top-4 right-4 bg-yellow-400 px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <Star className="w-3 h-3 mr-1"/> Popular
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl`}>
            {category.icon}
          </div>
          <motion.div
            whileHover={{ x: 3 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowRight className="w-5 h-5 text-slate-400" />
          </motion.div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize mb-2">
          {category.name}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{category.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
            <Users className="w-4 h-4 mr-1"/>
            <span>{category.participants}</span>
          </div>
          
          {stats.played > 0 && (
            <div className="text-right">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Seu recorde
              </div>
              <div className={`text-sm font-bold ${
                stats.average >= 80 ? 'text-green-600' :
                stats.average >= 60 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {stats.average}%
              </div>
            </div>
          )}
        </div>

        {/* Info adicional baseada no sort */}
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
            <span>{category.quizzes} quizzes</span>
            {sortBy === 'recent' && (
              <span>🆕 Recente</span>
            )}
            {sortBy === 'popular' && (
              <span>📊 Popular</span>
            )}
          </div>
        </div>

        {/* Progresso sutil na borda inferior */}
        {stats.played > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700">
            <div 
              className={`h-1 bg-gradient-to-r ${category.color}`}
              style={{ width: `${Math.min(stats.average, 100)}%` }}
            />
          </div>
        )}
      </motion.div>
    );
  };

  const getSortIndicator = () => {
    const indicators = {
      'popular': '📊 Categorias Populares',
      'recent': '🆕 Categorias Recentes', 
      'played': '🎮 Categorias Mais Jogadas',
      'rating': '⭐ Categorias Melhor Avaliadas'
    };
    return indicators[sortBy] || '📊 Categorias Populares';
  };

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Explore Categorias
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-2">
          Descubra quizzes incríveis em diversas categorias. Clique em qualquer categoria para começar a jogar!
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-purple-600 dark:text-purple-400 font-medium"
        >
          {getSortIndicator()}
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCategories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>

      {/* Info sobre sorting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm"
      >
        <p>
          Mostrando {sortedCategories.length} categorias • Use o menu de navegação para alterar a ordenação
        </p>
      </motion.div>
    </section>
  );
}