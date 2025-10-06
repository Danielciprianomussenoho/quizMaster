// src/pages/QuizPage.jsx (ATUALIZADO - Adicionar BackButton)
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { quizData } from "../data/quizData";
import Confetti from "react-confetti";
import QuestionsCard from "../components/QuestionsCard";
import { ScoreSystem } from "../utils/ScoreSystem";
import { DifficultyManager } from "../utils/DifficultyManager";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "../components/BackButton";
import SEO from "../components/SEO";

export default function QuizPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(null);

  // Inicializar quiz
  useEffect(() => {
    const categoryQuestions = quizData[category] || [];
    const userStats = ScoreSystem.getUserStats();
    const categoryPerformance = userStats.categories?.[category]?.average || 0;
    
    const filteredQuestions = DifficultyManager.getQuestionsByDifficulty(
      categoryQuestions, 
      difficulty, 
      categoryPerformance
    );
    
    setQuestions(filteredQuestions);
    setStartTime(Date.now());
  }, [category, difficulty]);

  // Timer
  useEffect(() => {
    if (startTime && !isFinished) {
      const interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, isFinished]);

  const total = questions.length;
  const currentQ = questions[current];
  const percentScore = Math.round((score / total) * 100);
  const showConfetti = isFinished && percentScore >= 70;

  const handleAnswer = (option) => {
    if (showFeedback) return;
    setSelected(option);
    setShowFeedback(true);

    if (currentQ.answer && option === currentQ.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const goToNext = () => {
    if (current + 1 < total) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      const finalTime = Math.floor((Date.now() - startTime) / 1000);
      ScoreSystem.saveQuizResult(category, difficulty, score, total, finalTime);
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setIsFinished(false);
    setShowFeedback(false);
    setTimeSpent(0);
    setStartTime(Date.now());
  };

  const calculateProgress = () => {
    if (isFinished) return 100;
    const base = (current / total) * 100;
    const answered = selected ? (1 / total) * 100 : 0;
    return base + answered;
  };

  const handleExitQuiz = () => {
    if (window.confirm('Tem certeza que deseja sair do quiz? Seu progresso será perdido.')) {
      navigate('/');
    }
  };

  if (!questions.length && category in quizData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full">
          <BackButton className="mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            Escolha a Dificuldade
          </h2>
          <div className="space-y-4">
            {Object.entries(DifficultyManager.difficulties).map(([diff, config]) => (
              <motion.button
                key={diff}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDifficulty(diff)}
                className={`w-full bg-gradient-to-r ${config.color} text-white py-4 rounded-xl font-bold text-lg capitalize`}
              >
                {diff} 
                <span className="block text-sm opacity-90">
                  {diff === 'easy' ? '+ tempo, - pontos' : 
                   diff === 'medium' ? 'tempo normal, + pontos' : 
                   '- tempo, ++ pontos'}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full text-center">
          <BackButton className="mb-6 justify-center" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Categoria Não Encontrada
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Nenhuma pergunta encontrada para "{category}".
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Voltar para Início
          </button>
        </div>
      </div>
    );
  }

   const categoryTitles = {
    personalidade: 'Quiz de Personalidade - Descubra Mais Sobre Você',
    entretenimento: 'Quiz de Entretenimento - Teste Seu Conhecimento',
    games: 'Quiz de Games - Desafie Seu Conhecimento em Jogos',
    esportes: 'Quiz de Esportes - Mostre Seu Conhecimento Esportivo',
    lifestyle: 'Quiz de Lifestyle - Descubra Seu Estilo de Vida',
    conhecimento_geral: 'Quiz de Conhecimento Geral - Amplie Seus Horizontes',
    tecnologia: 'Quiz de Tecnologia - Teste Seu Conhecimento em TI',
    historia: 'Quiz de História - Reviva os Grandes Momentos do Passado',
    ciencia: 'Quiz de Ciência - Explore o Mundo da Ciência e da Natureza',
    artes: 'Quiz de Artes - Mergulhe no Mundo da Criatividade',
    musica: 'Quiz de Música - Teste Seu Conhecimento Musical',
    cinema: 'Quiz de Cinema - Desafie Seu Conhecimento sobre Filmes',
    literatura: 'Quiz de Literatura - Explore o Mundo dos Livros',
    culinaria: 'Quiz de Culinária - Descubra Sabores e Técnicas',
    viagens: 'Quiz de Viagens - Teste Seu Conhecimento Geográfico',
    negocios: 'Quiz de Negócios - Desafie Seu Conhecimento Empresarial',
    saude: 'Quiz de Saúde - Teste Seu Conhecimento sobre Bem-Estar',
    natureza: 'Quiz de Natureza - Explore o Mundo Natural',
    politica: 'Quiz de Política - Entenda o Mundo das Decisões',
    filosofia: 'Quiz de Filosofia - Questões que Desafiam a Mente',
    religiao: 'Quiz de Religião - Conheça as Crenças do Mundo',
  
  };
  return (
    <>
     <SEO 
        title={`${categoryTitles[category] || 'Quiz'} - BrainMaster`}
        description={`Faça nosso quiz de ${category} e teste seu conhecimento. Mais de 50 perguntas!`}
        keywords={`quiz ${category}, perguntas ${category}, brainmaster`}
      />
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      {showConfetti && <Confetti />}

      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8">
        
        {/* Header com Navegação */}
        {!isFinished && (
          <div className="flex justify-between items-center mb-6">
            <BackButton 
              label="Sair" 
              to="/"
              showHome={false}
              className="flex-1"
            />
            
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-white text-sm font-bold bg-gradient-to-r ${
                DifficultyManager.difficulties[difficulty].color
              } capitalize`}>
                {difficulty}
              </span>
              <span className="text-slate-600 dark:text-slate-300 text-sm">
                {timeSpent}s
              </span>
            </div>
            
            <span className="text-slate-600 dark:text-slate-300 text-sm flex-1 text-right">
              {current + 1}/{total}
            </span>
          </div>
        )}

        {/* Barra de Progresso */}
        {!isFinished && (
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full mb-6">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
            />
          </div>
        )}

        {!isFinished ? (
          <>
            {/* Card da Pergunta */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <QuestionsCard
                  data={currentQ}
                  onAnswer={handleAnswer}
                  showFeedback={showFeedback}
                  selected={selected}
                  current={current}
                  total={total}
                />
              </motion.div>
            </AnimatePresence>

            {/* Botão de próxima */}
            <div className="mt-6">
              {showFeedback && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={goToNext}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  {current + 1 < total ? "Próxima Pergunta" : "Ver Resultado"}
                </motion.button>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <BackButton className="mb-6 justify-center" />
            
            <h1 className="text-4xl font-bold text-purple-600 mb-4">
              {percentScore >= 70 ? "Quiz Finalizado 🎉" : "Quiz Concluído!"}
            </h1>
            
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-full w-32 h-32 mx-auto mb-6">
              <div className="bg-white dark:bg-slate-900 rounded-full w-full h-full flex items-center justify-center">
                <span className="text-3xl font-bold text-purple-600">{percentScore}%</span>
              </div>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
              Você acertou <span className="font-bold text-purple-600">{score}</span> de{" "}
              <span className="font-bold">{total}</span> perguntas.
            </p>

            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Tempo gasto: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s • 
              Dificuldade: <span className="capitalize">{difficulty}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={restartQuiz}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                Reiniciar Quiz
              </button>
              <button
                onClick={() => navigate("/")}
                className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white px-6 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition font-semibold"
              >
                Voltar para Início
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition font-semibold"
              >
                Ver Perfil
              </button>
            </div>

            {/* Sugestões */}
            <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                Próximos Desafios
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.keys(quizData)
                  .filter(cat => cat !== category)
                  .slice(0, 3)
                  .map(cat => (
                    <button
                      key={cat}
                      onClick={() => navigate(`/quiz/${cat}`)}
                      className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900 transition font-medium"
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
}