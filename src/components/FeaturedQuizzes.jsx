// src/components/FeaturedQuizzes.jsx (ATUALIZADO)
import { motion } from "framer-motion";
import { Users, ArrowRight, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SortManager } from "../utils/SortManager";

// Dados dos quizzes com mais propriedades para sorting
const featuredQuizzesData = [
  {
    id: 1,
    title: 'Qual personagem de Harry Potter você é?',
    category: 'personalidade',
    participants: '125K',
    difficulty: 'Fácil',
    time: '3 min',
    questions: 8,
    rating: 4.8,
    timesPlayed: 125000,
    createdAt: '2024-01-15',
    featured: true
  },
  {
    id: 2,
    title: 'Teste: Quanto você sabe sobre Marvel?',
    category: 'entretenimento',
    participants: '89K',
    difficulty: 'Médio',
    time: '5 min',
    questions: 10,
    rating: 4.6,
    timesPlayed: 89000,
    createdAt: '2024-02-01',
    featured: true
  },
  {
    id: 3,
    title: 'Conhecimentos Gerais: Desafio Supremo',
    category: 'conhecimento',
    participants: '67K',
    difficulty: 'Difícil',
    time: '8 min',
    questions: 12,
    rating: 4.9,
    timesPlayed: 67000,
    createdAt: '2024-01-20',
    featured: true
  },
  {
    id: 4,
    title: 'Quiz de Games: Dos Clássicos aos Atuais',
    category: 'games',
    participants: '95K',
    difficulty: 'Médio',
    time: '6 min',
    questions: 10,
    rating: 4.7,
    timesPlayed: 95000,
    createdAt: '2024-02-10',
    featured: true
  },
  {
    id: 5,
    title: 'Esportes: Teste Seu Conhecimento',
    category: 'esportes',
    participants: '45K',
    difficulty: 'Fácil',
    time: '4 min',
    questions: 8,
    rating: 4.4,
    timesPlayed: 45000,
    createdAt: '2024-01-25',
    featured: true
  },
  {
    id: 6,
    title: 'Lifestyle: Seu Estilo de Vida',
    category: 'lifestyle',
    participants: '38K',
    difficulty: 'Fácil',
    time: '3 min',
    questions: 7,
    rating: 4.5,
    timesPlayed: 38000,
    createdAt: '2024-02-05',
    featured: true
  }
];

export default function FeaturedQuizzes({ sortBy }) {
  const navigate = useNavigate();
  const [sortedQuizzes, setSortedQuizzes] = useState([]);

  // Aplicar sorting quando sortBy mudar
  useEffect(() => {
    const sorted = SortManager.sortQuizzes(featuredQuizzesData, sortBy);
    setSortedQuizzes(sorted);
  }, [sortBy]);

  const handleQuizClick = (quizCategory) => {
    navigate(`/quiz/${quizCategory}`);
  };

  const DifficultyBadge = ({ difficulty }) => {
    const colors = {
      'Fácil': 'from-green-500 to-emerald-500',
      'Médio': 'from-yellow-500 to-amber-500',
      'Difícil': 'from-red-500 to-orange-500'
    };

    return (
      <span className={`px-3 py-1 bg-gradient-to-r ${colors[difficulty]} text-white rounded-full text-sm font-medium capitalize`}>
        {difficulty.toLowerCase()}
      </span>
    );
  };

  const getSortIndicator = () => {
    const indicators = {
      'popular': '📊 Ordenado por Popularidade',
      'recent': '🆕 Ordenado por Recentes', 
      'played': '🎮 Ordenado por Mais Jogados',
      'rating': '⭐ Ordenado por Melhor Avaliados'
    };
    return indicators[sortBy] || '📊 Ordenado por Popularidade';
  };

  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Quizzes em Destaque
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
          Os quizzes mais populares da semana. Junte-se à diversão!
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-purple-600 dark:text-purple-400 font-medium"
        >
          {getSortIndicator()}
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {sortedQuizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => handleQuizClick(quiz.category)}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <DifficultyBadge difficulty={quiz.difficulty} />
              <div className="flex items-center space-x-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{quiz.rating}</span>
              </div>
            </div>
            
            <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl mb-4 flex items-center justify-center text-white text-4xl">
              {quiz.category === 'personalidade' && '👤'}
              {quiz.category === 'entretenimento' && '🎬'}
              {quiz.category === 'conhecimento' && '🧠'}
              {quiz.category === 'games' && '🎮'}
              {quiz.category === 'esportes' && '⚽'}
              {quiz.category === 'lifestyle' && '🌟'}
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
              {quiz.title}
            </h3>
            
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 mb-4">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">{quiz.participants}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{quiz.time}</span>
              </div>
              <div className="text-sm">
                {quiz.questions} perguntas
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
              {quiz.category === 'personalidade' && 'Descubra qual personagem combina com sua personalidade neste quiz divertido e envolvente!'}
              {quiz.category === 'entretenimento' && 'Teste seus conhecimentos sobre filmes, séries e universo cinematográfico!'}
              {quiz.category === 'conhecimento' && 'Desafie seu cérebro com perguntas de cultura geral e conhecimentos diversos!'}
              {quiz.category === 'games' && 'Do Atari ao PS5, teste seu conhecimento sobre a história dos videogames!'}
              {quiz.category === 'esportes' && 'Futebol, basquete, F1 e muito mais! Mostre que você é expert em esportes!'}
              {quiz.category === 'lifestyle' && 'Descubra mais sobre seus hábitos, preferências e estilo de vida!'}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 group/btn"
            >
              <span>Jogar Agora</span>
              <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
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
          Mostrando {sortedQuizzes.length} quizzes • Use o menu acima para alterar a ordenação
        </p>
      </motion.div>
    </section>
  );
}