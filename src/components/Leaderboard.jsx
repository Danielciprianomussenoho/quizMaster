// src/components/Leaderboard.jsx
import { motion } from 'framer-motion';
import { Trophy, Crown, Star, Medal } from 'lucide-react';
import { ScoreSystem } from '../utils/ScoreSystem';

export default function Leaderboard() {
  const leaderboard = ScoreSystem.getLeaderboard();

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1: return <Medal className="w-6 h-6 text-gray-400" />;
      case 2: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 text-center font-bold">{index + 1}</span>;
    }
  };

  const getRankColor = (index) => {
    switch(index) {
      case 0: return 'from-yellow-500 to-amber-500';
      case 1: return 'from-gray-400 to-gray-500';
      case 2: return 'from-amber-600 to-orange-600';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
        <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
        Ranking Global
      </h2>
      
      <div className="space-y-3">
        {leaderboard.length > 0 ? (
          leaderboard.slice(0, 10).map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${getRankColor(index)} text-white`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(index)}
                </div>
                <div>
                  <h3 className="font-semibold capitalize">{result.category}</h3>
                  <p className="text-sm opacity-90 capitalize">{result.difficulty}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{result.percentage}%</p>
                <p className="text-sm opacity-90">
                  {result.score}/{result.totalQuestions}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum resultado ainda</p>
            <p className="text-sm">Complete quizzes para aparecer no ranking!</p>
          </div>
        )}
      </div>

      {leaderboard.length > 10 && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            Sua Posição
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            {leaderboard.length > 50 ? 'Top 50' : `Entre os ${leaderboard.length} melhores`}
          </p>
        </div>
      )}
    </div>
  );
}