import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";

const featuredQuizzes = [
    {
      id: 1,
      title: 'Qual personagem de Harry Potter você é?',
      category: 'Personalidade',
      participants: '125K',
      difficulty: 'Fácil',
      time: '3 min',
      image: '/api/placeholder/300/200',
      featured: true
    },
    {
      id: 2,
      title: 'Teste: Quanto você sabe sobre Marvel?',
      category: 'Entretenimento',
      participants: '89K',
      difficulty: 'Médio',
      time: '5 min',
      image: '/api/placeholder/300/200',
      featured: true
    }
  ];


export default function FeaturedQuizzes() {
  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Quizzes em Destaque
          </h2>
          <p className="text-lg text-slate-600">
            Os quizzes mais populares da semana. Junte-se à diversão!
          </p>
        </motion.div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredQuizzes.map((quiz, i) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border dark:border-slate-700"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{quiz.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-2">{quiz.category} - {quiz.difficulty}</p>
            <div className="flex items-center space-x-4 text-slate-500 dark:text-slate-400 mb-4">
              <Users className="w-4 h-4"/> {quiz.participants} jogadores
              <span>⏱ {quiz.time}</span>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2">
              <span>Jogar Agora</span> <ArrowRight className="w-4 h-4"/>
            </button>
          </motion.div>
        ))}
      </div> */}

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredQuizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl overflow-hidden flex items-center justify-center text-white text-4xl">
                  {quiz.image ? (
                    <img src={quiz.image} alt={quiz.title} className="w-full h-full object-cover" />
                  ) : (
                    '🎯'
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {quiz.category}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {quiz.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {quiz.title}
                  </h3>
                  
                  <div className="flex items-center space-x-6 text-slate-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{quiz.participants} jogadores</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>⏱️</span>
                      <span>{quiz.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4">
                    Descubra qual personagem combina com sua personalidade neste quiz divertido e envolvente!
                  </p>
                  
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform group-hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                    <span>Jogar Agora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
    </section>
  );
}
