import { motion } from 'framer-motion';
import { ArrowLeft, Search, HelpCircle, Book, Video, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HelpCenter() {
  const navigate = useNavigate();

  const helpCategories = [
    {
      icon: <Book className="w-6 h-6" />,
      title: "Como Usar",
      description: "Guia completo de como usar o QuizMaster",
      topics: ["Criando conta", "Jogando quizzes", "Progresso e conquistas"]
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "Problemas Comuns",
      description: "Soluções para problemas frequentes",
      topics: ["Login não funciona", "Quizzes não carregam", "Progresso perdido"]
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Tutoriais",
      description: "Vídeos e tutoriais passo a passo",
      topics: ["Primeiros passos", "Dicas avançadas", "Recursos premium"]
    }
  ];

  const popularArticles = [
    {
      title: "Como criar minha conta?",
      category: "Conta"
    },
    {
      title: "Os quizzes são gratuitos?",
      category: "Quizzes"
    },
    {
      title: "Como funcionam as conquistas?",
      category: "Progresso"
    },
    {
      title: "Posso jogar offline?",
      category: "Funcionalidades"
    }
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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Central de Ajuda
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Encontre respostas para suas dúvidas ou entre em contato conosco
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar na central de ajuda..."
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900 dark:text-white"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Help Categories */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Categorias de Ajuda
            </h2>
            
            {helpCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate('/contact')}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
                      {category.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-3">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Popular Articles & Contact */}
          <div className="space-y-8">
            
            {/* Popular Articles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Artigos Populares
              </h2>
              
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div
                    key={index}
                    className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-600 transition-colors cursor-pointer"
                    onClick={() => navigate('/contact')}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {article.title}
                      </h3>
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-xs">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      Saiba mais sobre este tópico comum...
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center"
            >
              <MessageCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Não encontrou o que procura?
              </h3>
              <p className="mb-6 opacity-90">
                Nossa equipe de suporte está pronta para ajudar você
              </p>
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Entrar em Contato
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}