// src/pages/RankingPage.jsx (ATUALIZADO)
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, TrendingUp, Users, Star, Award, ArrowLeft, Search, Calendar, Zap, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ScoreSystem } from '../utils/ScoreSystem';
import SEO from '../components/SEO';

// Dados mockados - serão substituídos pelo backend
const generateMockLeaderboard = (type = 'all') => {
  const baseUsers = [
    {
      id: 1,
      username: 'QuizMestre',
      email: 'quiz_master@email.com',
      totalQuizzes: 25,
      averageScore: 92,
      totalPoints: 1250,
      weeklyPoints: 340,
      monthlyPoints: 890,
      badges: ['gold-medal', 'quiz-master', 'perfect-score'],
      joinedDate: '2024-01-15',
      isActive: true,
      lastLogin: '2024-03-20',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      username: 'SabioConhecimento',
      email: 'knowledge@email.com',
      totalQuizzes: 18,
      averageScore: 88,
      totalPoints: 980,
      weeklyPoints: 280,
      monthlyPoints: 720,
      badges: ['silver-medal', 'knowledge-seeker'],
      joinedDate: '2024-02-01',
      isActive: true,
      lastLogin: '2024-03-19',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      username: 'VelozRapido',
      email: 'speed@email.com',
      totalQuizzes: 15,
      averageScore: 85,
      totalPoints: 760,
      weeklyPoints: 210,
      monthlyPoints: 580,
      badges: ['bronze-medal', 'speed-demon'],
      joinedDate: '2024-02-10',
      isActive: true,
      lastLogin: '2024-03-18',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 4,
      username: 'DesafiadorPro',
      email: 'challenger@email.com',
      totalQuizzes: 12,
      averageScore: 78,
      totalPoints: 540,
      weeklyPoints: 180,
      monthlyPoints: 420,
      badges: ['hard-challenge'],
      joinedDate: '2024-02-15',
      isActive: true,
      lastLogin: '2024-03-17',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 5,
      username: 'InicianteTop',
      email: 'beginner@email.com',
      totalQuizzes: 8,
      averageScore: 65,
      totalPoints: 320,
      weeklyPoints: 120,
      monthlyPoints: 280,
      badges: [],
      joinedDate: '2024-03-01',
      isActive: true,
      lastLogin: '2024-03-20',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 6,
      username: 'MestreCerebro',
      email: 'brain@email.com',
      totalQuizzes: 30,
      averageScore: 95,
      totalPoints: 1450,
      weeklyPoints: 380,
      monthlyPoints: 920,
      badges: ['gold-medal', 'quiz-master', 'perfect-score', 'knowledge-seeker'],
      joinedDate: '2024-01-10',
      isActive: true,
      lastLogin: '2024-03-20',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 7,
      username: 'EspecialistaQuiz',
      email: 'expert@email.com',
      totalQuizzes: 22,
      averageScore: 90,
      totalPoints: 1100,
      weeklyPoints: 310,
      monthlyPoints: 780,
      badges: ['silver-medal', 'speed-demon'],
      joinedDate: '2024-01-20',
      isActive: true,
      lastLogin: '2024-03-19',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 8,
      username: 'AprendizAtivo',
      email: 'learner@email.com',
      totalQuizzes: 6,
      averageScore: 60,
      totalPoints: 240,
      weeklyPoints: 90,
      monthlyPoints: 190,
      badges: [],
      joinedDate: '2024-03-05',
      isActive: true,
      lastLogin: '2024-03-20',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 9,
      username: 'CampeãoMente',
      email: 'champion@email.com',
      totalQuizzes: 28,
      averageScore: 93,
      totalPoints: 1350,
      weeklyPoints: 360,
      monthlyPoints: 860,
      badges: ['gold-medal', 'quiz-master'],
      joinedDate: '2024-01-12',
      isActive: true,
      lastLogin: '2024-03-18',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 10,
      username: 'ConhecedorSabio',
      email: 'wise@email.com',
      totalQuizzes: 20,
      averageScore: 87,
      totalPoints: 1020,
      weeklyPoints: 290,
      monthlyPoints: 710,
      badges: ['silver-medal', 'knowledge-seeker'],
      joinedDate: '2024-02-05',
      isActive: true,
      lastLogin: '2024-03-17',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  // Ordenar por tipo de ranking
  switch (type) {
    case 'weekly':
      return [...baseUsers]
        .sort((a, b) => b.weeklyPoints - a.weeklyPoints)
        .slice(0, 10);
    
    case 'monthly':
      return [...baseUsers]
        .sort((a, b) => b.monthlyPoints - a.monthlyPoints)
        .slice(0, 10);
    
    default: // 'all'
      return [...baseUsers].sort((a, b) => b.totalPoints - a.totalPoints);
  }
};

export default function RankingPage() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all'); // all, weekly, monthly

  useEffect(() => {
    loadLeaderboard();
  }, [timeFilter]);

  const loadLeaderboard = () => {
    const leaderboardData = generateMockLeaderboard(timeFilter);
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const userStats = ScoreSystem.getUserStats();
    
    // Dados do usuário atual (mock para exemplo)
    const currentUserData = {
      id: 999,
      username: userProfile.username || 'Você',
      email: userProfile.email || '',
      totalQuizzes: userStats.totalQuizzes || 0,
      averageScore: userStats.averageScore || 0,
      totalPoints: userStats.totalPoints || 0,
      weeklyPoints: Math.floor(Math.random() * 200) + 50, // Mock
      monthlyPoints: Math.floor(Math.random() * 600) + 100, // Mock
      badges: userStats.badges || [],
      joinedDate: userProfile.joinedDate || new Date().toISOString(),
      isActive: true,
      lastLogin: new Date().toISOString(),
      avatar: userProfile.avatar || ''
    };

    // Encontrar posição do usuário atual
    const allUsers = timeFilter === 'all' ? leaderboardData : generateMockLeaderboard('all');
    const userRank = allUsers.findIndex(user => 
      user.username === currentUserData.username
    ) + 1;

    setLeaderboard(leaderboardData);
    setCurrentUser({
      ...currentUserData,
      rank: userRank > 0 ? userRank : null
    });
  };

  const filteredLeaderboard = leaderboard.filter(user =>
    user && user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankBadge = (rank) => {
    if (rank === 1) return { 
      icon: <Crown className="w-5 h-5" />, 
      color: 'from-yellow-400 to-amber-500', 
      bg: 'bg-yellow-500',
      glow: 'shadow-lg shadow-yellow-500/25'
    };
    if (rank === 2) return { 
      icon: <Medal className="w-5 h-5" />, 
      color: 'from-slate-400 to-slate-500', 
      bg: 'bg-slate-500',
      glow: 'shadow-lg shadow-slate-500/25'
    };
    if (rank === 3) return { 
      icon: <Medal className="w-5 h-5" />, 
      color: 'from-amber-600 to-amber-700', 
      bg: 'bg-amber-600',
      glow: 'shadow-lg shadow-amber-500/25'
    };
    return { 
      icon: null, 
      color: 'from-purple-500 to-pink-500', 
      bg: 'bg-purple-500',
      glow: ''
    };
  };

  const getBadgeEmoji = (badge) => {
    const emojis = {
      'gold-medal': '🥇',
      'silver-medal': '🥈',
      'bronze-medal': '🥉',
      'hard-challenge': '💪',
      'perfect-score': '⭐',
      'quiz-master': '👑',
      'speed-demon': '⚡',
      'knowledge-seeker': '📚'
    };
    return emojis[badge] || '🏆';
  };

  const getPointsByFilter = (user) => {
    switch (timeFilter) {
      case 'weekly':
        return user.weeklyPoints;
      case 'monthly':
        return user.monthlyPoints;
      default:
        return user.totalPoints;
    }
  };

  const getFilterDescription = () => {
    switch (timeFilter) {
      case 'weekly':
        return "Top 10 desta semana";
      case 'monthly':
        return "Top 10 deste mês";
      default:
        return "Ranking geral de todos os tempos";
    }
  };

  const getFilterIcon = () => {
    switch (timeFilter) {
      case 'weekly':
        return <Zap className="w-5 h-5" />;
      case 'monthly':
        return <CalendarDays className="w-5 h-5" />;
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };

  const UserCard = ({ user, rank }) => {
    if (!user || !user.username) return null;
    
    const badge = getRankBadge(rank);
    const points = getPointsByFilter(user);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border-2 transition-all ${
          rank === 1 ? 'border-yellow-400 ' + badge.glow : 
          rank === 2 ? 'border-slate-400 ' + badge.glow : 
          rank === 3 ? 'border-amber-600 ' + badge.glow : 
          'border-transparent hover:border-purple-200 dark:hover:border-purple-800'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Rank Badge */}
            <div className={`w-12 h-12 bg-gradient-to-r ${badge.color} rounded-full flex items-center justify-center text-white font-bold text-lg relative ${badge.glow}`}>
              {rank <= 3 ? badge.icon : rank}
              {rank <= 3 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                </div>
              )}
            </div>

            {/* User Avatar and Info */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
                {user.isActive && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                )}
              </div>
              
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  {user.username}
                  {currentUser && user.username === currentUser.username && (
                    <span className="ml-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                      Você
                    </span>
                  )}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {user.totalQuizzes || 0} quizzes • {user.averageScore || 0}% média
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-right">
            <div className="flex items-center space-x-2 justify-end mb-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-bold text-slate-900 dark:text-white text-lg">
                {points || 0}
              </span>
            </div>
            <div className="flex items-center space-x-1 justify-end">
              <Award className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {user.badges?.length || 0} conquistas
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-1">
            <span>Progresso</span>
            <span>Nível {Math.floor((points || 0) / 100) + 1}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((points || 0) % 100)}%` }}
            />
          </div>
        </div>

        {/* Badges Preview */}
        {user.badges && user.badges.length > 0 && (
          <div className="mt-4 flex space-x-2">
            {user.badges.slice(0, 4).map((badge, index) => (
              <div key={index} className="text-2xl" title={badge}>
                {getBadgeEmoji(badge)}
              </div>
            ))}
            {user.badges.length > 4 && (
              <span className="text-slate-500 dark:text-slate-400 text-sm flex items-center">
                +{user.badges.length - 4}
              </span>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <>
      <SEO 
        title="Ranking - QuizMaster"
        description="Veja o ranking dos melhores jogadores do QuizMaster. Compare suas conquistas e suba no ranking!"
        keywords="ranking quiz, líderes, conquistas, competição"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
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

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl text-white">
                {getFilterIcon()}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Ranking de Jogadores
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              {getFilterDescription()}
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {timeFilter === 'all' ? leaderboard.length : '10'}
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                {timeFilter === 'all' ? 'Jogadores' : 'Top 10'}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {leaderboard[0] ? getPointsByFilter(leaderboard[0]) : 0}
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                {timeFilter === 'weekly' ? 'Pontos Semana' : 
                 timeFilter === 'monthly' ? 'Pontos Mês' : 'Maior Pontuação'}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg">
              <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {Math.max(...leaderboard.map(u => u.badges?.length || 0))}
              </div>
              <div className="text-slate-600 dark:text-slate-300">
                Mais Conquistas
              </div>
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar jogador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900 dark:text-white"
                />
              </div>

              {/* Time Filter */}
              <div className="flex space-x-2">
                {[
                  { value: 'all', label: 'Geral', icon: <Trophy className="w-4 h-4" /> },
                  { value: 'weekly', label: 'Semanal', icon: <Zap className="w-4 h-4" /> },
                  { value: 'monthly', label: 'Mensal', icon: <CalendarDays className="w-4 h-4" /> }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setTimeFilter(filter.value)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${
                      timeFilter === filter.value
                        ? 'bg-purple-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {filter.icon}
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Current User Card */}
          {currentUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {currentUser.avatar ? (
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {currentUser.username?.charAt(0)?.toUpperCase() || 'V'}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold mb-1">Sua Posição</h3>
                      <p className="text-purple-100">
                        {currentUser.rank ? `#${currentUser.rank} no ranking` : 'Complete quizzes para entrar no ranking!'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {getPointsByFilter(currentUser)} pts
                    </div>
                    <div className="text-purple-100 text-sm">
                      {currentUser.badges?.length || 0} conquistas
                    </div>
                  </div>
                </div>
                {!currentUser.rank && (
                  <button 
                    onClick={() => navigate('/')}
                    className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Fazer um Quiz
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Leaderboard */}
          <div className="space-y-4">
            {filteredLeaderboard.map((user, index) => (
              <UserCard 
                key={`${user.username}-${index}`} 
                user={user} 
                rank={index + 1}
              />
            ))}
          </div>

          {filteredLeaderboard.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Trophy className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Nenhum jogador encontrado
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {searchTerm ? 'Tente buscar com outros termos' : 'Seja o primeiro a entrar no ranking!'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}