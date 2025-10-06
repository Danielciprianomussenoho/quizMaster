// src/utils/ScoreSystem.js
export class ScoreSystem {
  static saveQuizResult(category, difficulty, score, totalQuestions, timeSpent) {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const newResult = {
      id: Date.now(),
      category,
      difficulty,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      timeSpent,
      date: new Date().toISOString(),
      badges: this.calculateBadges(score, totalQuestions, difficulty)
    };
    
    results.unshift(newResult);
    localStorage.setItem('quizResults', JSON.stringify(results));
    this.updateUserStats(newResult);
    return newResult;
  }

  static calculateBadges(score, total, difficulty) {
    const badges = [];
    const percentage = (score / total) * 100;
    
    if (percentage >= 90) badges.push('gold-medal');
    if (percentage >= 75) badges.push('silver-medal');
    if (percentage >= 60) badges.push('bronze-medal');
    if (difficulty === 'hard' && percentage >= 80) badges.push('hard-challenge');
    if (score === total) badges.push('perfect-score');
    
    return badges;
  }

  static updateUserStats(result) {
    const stats = JSON.parse(localStorage.getItem('userStats') || '{}');
    
    stats.totalQuizzes = (stats.totalQuizzes || 0) + 1;
    stats.totalScore = (stats.totalScore || 0) + result.percentage;
    stats.averageScore = Math.round(stats.totalScore / stats.totalQuizzes);
    
    // Categorias
    if (!stats.categories) stats.categories = {};
    if (!stats.categories[result.category]) {
      stats.categories[result.category] = { played: 0, totalScore: 0 };
    }
    stats.categories[result.category].played++;
    stats.categories[result.category].totalScore += result.percentage;
    stats.categories[result.category].average = Math.round(
      stats.categories[result.category].totalScore / 
      stats.categories[result.category].played
    );
    
    // Badges
    if (!stats.badges) stats.badges = [];
    result.badges.forEach(badge => {
      if (!stats.badges.includes(badge)) {
        stats.badges.push(badge);
      }
    });
    
    localStorage.setItem('userStats', JSON.stringify(stats));
  }

  static getLeaderboard() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    return results
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 50);
  }

  static getUserStats() {
    return JSON.parse(localStorage.getItem('userStats') || '{}');
  }

  static getCategoryStats(category) {
    const stats = this.getUserStats();
    return stats.categories?.[category] || { played: 0, average: 0 };
  }

  static getUserProfile() {
    const defaultProfile = {
      username: 'QuizMaster',
      email: '',
      bio: 'Apaixonado por quizzes e aprendizado! 🎯',
      avatar: '',
      joinDate: new Date().toISOString()
    };
    
    const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    return { ...defaultProfile, ...savedProfile };
  }

  static updateUserProfile(profileData) {
    const currentProfile = this.getUserProfile();
    const updatedProfile = { ...currentProfile, ...profileData };
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    return updatedProfile;
  }
}
