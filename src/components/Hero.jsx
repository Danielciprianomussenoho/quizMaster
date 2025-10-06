// src/components/Hero.jsx (MODIFICADO)
import { motion } from "framer-motion";
import { ArrowRight, Users, Star, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  
  const stats = JSON.parse(localStorage.getItem('userStats') || '{}');
  const totalPlayers = "50K+";
  const averageRating = "4.8";
  const totalQuizzes = "500+";

  const Stat = ({ icon, value, label }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
      className="flex items-center space-x-2 text-slate-600 dark:text-slate-300"
    >
      {icon}
      <div>
        <div className="font-bold text-slate-900 dark:text-white">{value}</div>
        <div className="text-sm">{label}</div>
      </div>
    </motion.div>
  );

  return (
    <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6"
        >
          Descubra, Aprenda e
          <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Divirta-se
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Milhares de quizzes incríveis esperando por você. Teste seu conhecimento, 
          descubra sua personalidade, ganhe conquistas e compartilhe com amigos!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button 
            onClick={() => navigate("/quiz/personalidade")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition-all"
          >
            <span>Começar Agora</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button 
            onClick={() => navigate("/profile")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Ver Meu Progresso
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          <Stat 
            icon={<Users className="w-6 h-6 text-purple-500" />} 
            value={totalPlayers} 
            label="Jogadores Ativos" 
          />
          <Stat 
            icon={<Star className="w-6 h-6 text-yellow-500" />} 
            value={averageRating} 
            label="Avaliação Média" 
          />
          <Stat 
            icon={<Target className="w-6 h-6 text-green-500" />} 
            value={totalQuizzes} 
            label="Quizzes Disponíveis" 
          />
          {stats.totalQuizzes > 0 && (
            <Stat 
              icon={<div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />} 
              value={`${stats.totalQuizzes}`} 
              label="Seus Quizzes" 
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}