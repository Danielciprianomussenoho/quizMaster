// src/utils/DifficultyManager.js
export class DifficultyManager {
  static difficulties = {
    easy: { timeMultiplier: 1.5, scoreMultiplier: 1, color: 'from-green-500 to-emerald-500' },
    medium: { timeMultiplier: 1, scoreMultiplier: 1.5, color: 'from-yellow-500 to-amber-500' },
    hard: { timeMultiplier: 0.7, scoreMultiplier: 2, color: 'from-red-500 to-orange-500' }
  };

  static getQuestionsByDifficulty(questions, difficulty, userPerformance) {
    // Embaralha as questões
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    
    // Lógica adaptativa baseada no desempenho
    if (userPerformance && userPerformance > 80) {
      // Se usuário vai bem, aumenta dificuldade
      return shuffled.slice(0, Math.min(questions.length, 10));
    }
    
    return shuffled.slice(0, Math.min(questions.length, 8));
  }

  static calculateTimeLimit(questionsCount, difficulty) {
    const baseTime = questionsCount * 30; // 30 segundos por questão
    return Math.floor(baseTime * this.difficulties[difficulty].timeMultiplier);
  }

  static calculateScore(correctAnswers, totalQuestions, difficulty) {
    const baseScore = (correctAnswers / totalQuestions) * 100;
    return Math.floor(baseScore * this.difficulties[difficulty].scoreMultiplier);
  }
}