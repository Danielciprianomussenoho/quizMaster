import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, Plus, Send, Book, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SuggestQuiz() {
  const navigate = useNavigate();
  const [suggestionType, setSuggestionType] = useState('quiz');

  const suggestionTypes = [
    {
      id: 'quiz',
      icon: <Book className="w-5 h-5" />,
      title: "Sugerir Quiz",
      description: "Proponha um novo tema ou categoria de quiz"
    },
    {
      id: 'improvement',
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Sugerir Melhoria",
      description: "Ideias para melhorar a plataforma"
    },
    {
      id: 'feature',
      icon: <Plus className="w-5 h-5" />,
      title: "Nova Funcionalidade",
      description: "Sugira uma nova funcionalidade"
    }
  ];

  const popularCategories = [
    "Programação", "Matemática", "História", "Ciências", "Geografia",
    "Esportes", "Entretenimento", "Tecnologia", "Arte", "Literatura"
  ];

  return (
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl text-white">
              <Lightbulb className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Sugerir Quiz/Melhoria
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Sua opinião é importante! Ajude-nos a melhorar o QuizMaster
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Suggestion Types */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              O que você quer sugerir?
            </h2>
            
            {suggestionTypes.map((type, index) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSuggestionType(type.id)}
                className={`w-full p-4 rounded-2xl shadow-lg transition-all text-left border-2 ${
                  suggestionType === type.id 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                    : 'border-transparent bg-white dark:bg-slate-900 hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    suggestionType === type.id 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {type.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {type.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Popular Categories */}
            {suggestionType === 'quiz' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Categorias Populares
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularCategories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900 cursor-pointer"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggestion Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {suggestionType === 'quiz' && 'Sugerir Novo Quiz'}
              {suggestionType === 'improvement' && 'Sugerir Melhoria'}
              {suggestionType === 'feature' && 'Sugerir Nova Funcionalidade'}
            </h2>
            
            <form className="space-y-6">
              {suggestionType === 'quiz' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Título do Quiz *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Ex: Quiz sobre Inteligência Artificial"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Categoria *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Ex: Tecnologia, Programação, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Descrição do Quiz *
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                      placeholder="Descreva o tema, o público-alvo e o objetivo do quiz..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Exemplo de Perguntas (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                      placeholder="Se tiver ideias de perguntas específicas, compartilhe conosco..."
                    />
                  </div>
                </>
              )}

              {(suggestionType === 'improvement' || suggestionType === 'feature') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Título da {suggestionType === 'improvement' ? 'Melhoria' : 'Funcionalidade'} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder={
                        suggestionType === 'improvement' 
                          ? 'Ex: Melhorar sistema de pontuação' 
                          : 'Ex: Modo multiplayer para quizzes'
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Descrição Detalhada *
                    </label>
                    <textarea
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                      placeholder={`Descreva em detalhes ${
                        suggestionType === 'improvement' 
                          ? 'o que pode ser melhorado e como' 
                          : 'como a funcionalidade funcionaria e seus benefícios'
                      }...`}
                    />
                  </div>

                  {suggestionType === 'feature' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Benefícios Esperados
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                        placeholder="Como esta funcionalidade melhoraria a experiência dos usuários?"
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Seu Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="seu@email.com"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Sugestão</span>
              </motion.button>
            </form>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm">
                <Users className="w-4 h-4" />
                <span>Todas as sugestões são analisadas pela nossa equipe. Obrigado por contribuir!</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}