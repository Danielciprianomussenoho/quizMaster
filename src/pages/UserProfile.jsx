// src/pages/UserProfile.jsx (ATUALIZADO)
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Award, Calendar, TrendingUp, Edit , ArrowLeft} from 'lucide-react';
import { ScoreSystem } from '../utils/ScoreSystem';
import { useState, useEffect } from 'react';
import EditProfileModal from '../components/EditProfileModal';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: 'QuizMaster',
    email: '',
    bio: 'Apaixonado por quizzes e aprendizado! 🎯',
    avatar: '',
    totalQuizzes: 0,
    averageScore: 0,
    badges: []
  });
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Carregar dados do usuário
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const stats = ScoreSystem.getUserStats();
    const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    
    setUserData(prev => ({
      ...prev,
      ...savedProfile,
      totalQuizzes: stats.totalQuizzes || 0,
      averageScore: stats.averageScore || 0,
      badges: stats.badges || []
    }));
  };

  const handleSaveProfile = (updatedUser) => {
    setUserData(prev => ({
      ...prev,
      ...updatedUser
    }));
    loadUserData(); // Recarregar dados atualizados
  };

  const stats = ScoreSystem.getUserStats();
  const leaderboard = ScoreSystem.getLeaderboard();
  const recentResults = JSON.parse(localStorage.getItem('quizResults') || '[]').slice(0, 5);

  const StatCard = ({ icon, title, value, color }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-r ${color} p-1 rounded-2xl shadow-lg`}
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center">
        <div className="flex justify-center mb-3">
          <div className={`p-3 rounded-full bg-gradient-to-r ${color} text-white`}>
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{value}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm">{title}</p>
      </div>
    </motion.div>
  );

  const BadgeIcon = ({ type }) => {
    const badges = {
      'gold-medal': { icon: '🥇', label: 'Medalha de Ouro', color: 'from-yellow-500 to-amber-500' },
      'silver-medal': { icon: '🥈', label: 'Medalha de Prata', color: 'from-slate-400 to-slate-500' },
      'bronze-medal': { icon: '🥉', label: 'Medalha de Bronze', color: 'from-amber-600 to-amber-700' },
      'hard-challenge': { icon: '💪', label: 'Desafio Difícil', color: 'from-red-500 to-pink-500' },
      'perfect-score': { icon: '⭐', label: 'Pontuação Perfeita', color: 'from-purple-500 to-pink-500' }
    };

    const badge = badges[type];
    if (!badge) return null;

    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`bg-gradient-to-r ${badge.color} p-1 rounded-full`}
      >
        <div className="bg-white dark:bg-slate-900 rounded-full p-3">
          <span className="text-2xl" title={badge.label}>{badge.icon}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <>
     <SEO 
        title="Meu Perfil - BrainMaster"
        description="Acompanhe seu progresso, conquistas e estatísticas no BrainMaster."
        keywords="perfil quiz, estatísticas, conquistas, ranking"
      />
      
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
         {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        </motion.div>
        
        {/* Header do Perfil */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    userData.username?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  {userData.username}
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-2">
                  {userData.bio}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {userData.totalQuizzes || 0} quizzes completados • Média de {userData.averageScore || 0}%
                  {userData.email && ` • ${userData.email}`}
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={() => setIsEditModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Editar Perfil</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Grid de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Trophy className="w-6 h-6" />}
            title="Pontuação Média"
            value={`${userData.averageScore || 0}%`}
            color="from-yellow-500 to-amber-500"
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            title="Quizzes Completos"
            value={userData.totalQuizzes || 0}
            color="from-blue-500 to-cyan-500"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Melhor Pontuação"
            value={`${Math.max(...(JSON.parse(localStorage.getItem('quizResults') || '[]').map(r => r.percentage) || [0]))}%`}
            color="from-green-500 to-emerald-500"
          />
          <StatCard
            icon={<Award className="w-6 h-6" />}
            title="Conquistas"
            value={userData.badges?.length || 0}
            color="from-purple-500 to-pink-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Badges Collection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-purple-500" />
              Conquistas
            </h2>
            <div className="flex flex-wrap gap-4">
              {userData.badges?.length > 0 ? (
                userData.badges.map((badge, index) => (
                  <BadgeIcon key={index} type={badge} />
                ))
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-center w-full py-8">
                  Complete quizzes para desbloquear conquistas!
                </p>
              )}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-blue-500" />
              Atividade Recente
            </h2>
            <div className="space-y-4">
              {recentResults.length > 0 ? (
                recentResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white capitalize">{result.category}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {result.difficulty} • {new Date(result.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full font-bold ${
                      result.percentage >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      result.percentage >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {result.percentage}%
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                  Nenhuma atividade recente
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Categorias Performance */}
        {stats.categories && Object.keys(stats.categories).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg mt-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Desempenho por Categoria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats.categories).map(([category, data]) => (
                <div key={category} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <h3 className="font-semibold text-slate-900 dark:text-white capitalize">{category}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {data.played} {data.played === 1 ? 'quiz' : 'quizzes'}
                    </span>
                    <span className={`font-bold ${
                      data.average >= 80 ? 'text-green-600' :
                      data.average >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {data.average}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${
                        data.average >= 80 ? 'bg-green-500' :
                        data.average >= 60 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${data.average}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal de Edição de Perfil */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={userData}
        onSave={handleSaveProfile}
      />
    </div>
    </>
  );
}