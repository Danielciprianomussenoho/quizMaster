import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Shield, Settings, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cookies() {
  const navigate = useNavigate();

  const cookieTypes = [
    {
      icon: <Shield className="w-5 h-5" />,
      type: "Essenciais",
      description: "Cookies necessários para o funcionamento básico do site",
      examples: ["Autenticação", "Segurança", "Preferências básicas"],
      necessary: true
    },
    {
      icon: <Eye className="w-5 h-5" />,
      type: "Analíticos",
      description: "Cookies que nos ajudam a entender como você usa o site",
      examples: ["Estatísticas de uso", "Desempenho", "Melhorias"],
      necessary: false
    },
    {
      icon: <Settings className="w-5 h-5" />,
      type: "Funcionais",
      description: "Cookies que permitem funcionalidades personalizadas",
      examples: ["Preferências salvas", "Histórico de quizzes", "Configurações"],
      necessary: false
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
            <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white">
              <Cookie className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Política de Cookies
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Entenda como usamos cookies para melhorar sua experiência
          </p>
        </motion.div>

        <div className="space-y-8">
          
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              O que são Cookies?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando 
              você visita nosso site. Eles nos ajudam a fornecer uma experiência melhor e mais 
              personalizada para você.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              Nós usamos cookies para lembrar suas preferências, entender como você interage com 
              nosso site e melhorar continuamente nossos serviços.
            </p>
          </motion.div>

          {/* Cookie Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Tipos de Cookies que Utilizamos
            </h2>
            
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white">
                      {cookie.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {cookie.type}
                      </h3>
                      {cookie.necessary && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-xs">
                          Necessário
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {cookie.description}
                </p>
                
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Exemplos:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                    {cookie.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Cookie Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Gerenciamento de Cookies
            </h2>
            
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                Você pode controlar e/ou excluir cookies como desejar. Para saber mais, 
                visite <a href="https://www.aboutcookies.org" className="text-purple-600 hover:text-purple-500">aboutcookies.org</a>.
              </p>
              
              <p>
                Você pode excluir todos os cookies que já estão no seu computador e configurar 
                a maioria dos navegadores para impedir que eles sejam colocados. No entanto, 
                se você fizer isso, talvez precise ajustar manualmente algumas preferências 
                sempre que visitar um site e alguns serviços e funcionalidades podem não funcionar.
              </p>
            </div>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Configurações Atuais:
              </h3>
              <div className="space-y-3">
                {cookieTypes.map((cookie, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">
                      {cookie.type}
                    </span>
                    <div className="flex items-center space-x-2">
                      {cookie.necessary ? (
                        <span className="text-sm text-slate-500">Sempre ativo</span>
                      ) : (
                        <>
                          <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm">
                            Ativo
                          </button>
                          <button className="px-3 py-1 bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm">
                            Desativar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Dúvidas sobre Cookies?
            </h3>
            <p className="mb-4 opacity-90">
              Entre em contato conosco para mais informações sobre nossa política de cookies.
            </p>
            <motion.button
              onClick={() => navigate('/contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-amber-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Entrar em Contato
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}