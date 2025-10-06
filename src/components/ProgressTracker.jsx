// src/components/ProgressTracker.jsx
import { motion } from 'framer-motion';
import { Target, TrendingUp, Award } from 'lucide-react';

export default function ProgressTracker() {
  const stats = JSON.parse(localStorage.getItem('userStats') || '{}');
  const totalQuizzes = stats.totalQuizzes || 0;
  
  const milestones = [
    { target: 1, badge: '🚀', label: 'Primeiro Quiz' },
    { target: 5, badge: '⭐', label: 'Quiz Entusiasta' },
    { target: 10, badge: '🏆', label: 'Mestre dos Quizzes' },
    { target: 25, badge: '👑', label: 'Lenda dos Quizzes' },
    { target: 50, badge: '💎', label: 'Lenda Suprema' }
  ];

  const nextMilestone = milestones.find(m => m.target > totalQuizzes) || milestones[milestones.length - 1];
  const progress = (totalQuizzes / nextMilestone.target) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
        Progresso de Conquistas
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {totalQuizzes} quizzes completados
          </span>
          <span className="text-sm font-medium text-purple-600">
            Próximo: {nextMilestone.target}
          </span>
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Início</span>
          <span className="text-center">
            {nextMilestone.badge} {nextMilestone.label}
          </span>
          <span>{nextMilestone.target} quizzes</span>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-4">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`text-center p-2 rounded-lg ${
                totalQuizzes >= milestone.target
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              <div className="text-lg mb-1">{milestone.badge}</div>
              <div className="text-xs font-medium">{milestone.target}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}