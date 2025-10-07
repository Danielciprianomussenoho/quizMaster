import { motion } from 'framer-motion';
import { ArrowLeft, Bug, AlertTriangle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ReportProblem() {
  const navigate = useNavigate();

  const problemTypes = [
    {
      icon: <Bug className="w-5 h-5" />,
      type: "bug",
      title: "Erro ou Bug",
      description: "Algo não está funcionando corretamente"
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      type: "crash",
      title: "Travamento",
      description: "O app fecha ou trava inesperadamente"
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      type: "performance",
      title: "Problema de Performance",
      description: "Lentidão ou travamentos"
    }
  ];

  return (
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
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl text-white">
              <Bug className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Reportar Problema
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Ajude-nos a melhorar reportando problemas técnicos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Problem Types */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Tipo de Problema
            </h2>
            
            {problemTypes.map((problem, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg text-red-600 dark:text-red-400">
                    {problem.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Report Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Descreva o Problema
            </h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Título do Problema *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Ex: App trava ao iniciar quiz de matemática"
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
                  placeholder="Descreva exatamente o que aconteceu, quais passos realizou antes do problema, e qual era o resultado esperado..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Dispositivo
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="Ex: iPhone 13, Samsung Galaxy S21"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Navegador/App Version
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="Ex: Chrome 119, App v2.1.0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email para Contato *
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
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Reportar Problema</span>
              </motion.button>
            </form>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Respondemos todos os reports em até 48 horas úteis</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}