// src/utils/SortManager.js
export class SortManager {
  static sortQuizzes(quizzes, sortBy) {
    const sorted = [...quizzes];
    
    switch(sortBy) {
      case 'popular':
        return sorted.sort((a, b) => {
          const aParticipants = parseInt(a.participants) || 0;
          const bParticipants = parseInt(b.participants) || 0;
          return bParticipants - aParticipants;
        });
        
      case 'recent':
        return sorted.sort((a, b) => {
          const aDate = a.createdAt || new Date(2024, 0, 1);
          const bDate = b.createdAt || new Date(2024, 0, 1);
          return new Date(bDate) - new Date(aDate);
        });
        
      case 'played':
        return sorted.sort((a, b) => {
          const aPlayed = a.timesPlayed || 0;
          const bPlayed = b.timesPlayed || 0;
          return bPlayed - aPlayed;
        });
        
      case 'rating':
        return sorted.sort((a, b) => {
          const aRating = a.rating || 0;
          const bRating = b.rating || 0;
          return bRating - aRating;
        });
        
      default:
        return sorted;
    }
  }

  static getSortOptions() {
    return [
      { value: 'popular', label: '📊 Popularidade' },
      { value: 'recent', label: '🆕 Recentes' },
      { value: 'played', label: '🎮 Mais Jogados' },
      { value: 'rating', label: '⭐ Melhor Avaliados' }
    ];
  }
}