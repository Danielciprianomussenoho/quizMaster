// src/pages/DMCA.jsx
import { motion } from 'framer-motion';
import { Mail, Shield, Copyright, AlertTriangle, Phone, MapPin, Send, Clock, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DMCA() {
  const navigate = useNavigate();

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
            <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl text-white">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Política DMCA
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Digital Millennium Copyright Act
          </p>
        </motion.div>

        <div className="space-y-8">
          
          {/* Notification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-2xl p-6"
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                  Aviso Legal
                </h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  O QuizMaster respeita os direitos de propriedade intelectual de terceiros. 
                  Se você acredita que seu trabalho foi copiado de uma forma que constitui violação 
                  de direitos autorais, entre em contato conosco.
                </p>
              </div>
            </div>
          </motion.div>

          {/* DMCA Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Copyright className="w-6 h-6 mr-2 text-purple-500" />
              Política de Direitos Autorais
            </h2>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Notificação de Violação de Direitos Autorais
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Se você é proprietário de direitos autorais ou agente autorizado e acredita que 
                  qualquer conteúdo no QuizMaster infringe seus direitos autorais, você pode enviar 
                  uma notificação de acordo com o Digital Millennium Copyright Act ("DMCA") 
                  fornecendo as seguintes informações por escrito:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
                  <li>Identificação do trabalho protegido por direitos autorais alegadamente infringido</li>
                  <li>Identificação do material alegadamente infringente com informações suficientes para localizá-lo</li>
                  <li>Suas informações de contato (nome, endereço, telefone, e-mail)</li>
                  <li>Declaração de que você acredita de boa-fé que o uso não é autorizado</li>
                  <li>Declaração sob pena de perjúrio de que as informações são precisas</li>
                  <li>Sua assinatura física ou eletrônica</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Processo de Notificação
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Envie notificações de violação de direitos autorais para:
                </p>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mt-3">
                  <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">dmca@quizmaster.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Contra-Notificação
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Se você acredita que seu conteúdo foi removido erroneamente, você pode enviar 
                  uma contra-notificação incluindo:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                  <li>Identificação do material removido</li>
                  <li>Declaração sob pena de perjúrio de que a remoção foi equivocada</li>
                  <li>Seu consentimento à jurisdição do tribunal federal</li>
                  <li>Suas informações de contato completas</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  ⚠️ Aviso Importante
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Falsas notificações podem resultar em responsabilidade por danos. 
                  Consulte um advogado antes de enviar uma notificação DMCA.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Dúvidas sobre DMCA?
            </h3>
            <p className="mb-4 opacity-90">
              Entre em contato com nosso agente designado para questões de direitos autorais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:dmca@quizmaster.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                dmca@quizmaster.com
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}