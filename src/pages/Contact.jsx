// src/pages/Contact.jsx
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';


export default function Contact() {
  const navigate = useNavigate();

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "contato@quizmaster.com",
      description: "Respondemos em até 24 horas"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefone",
      details: "+55 (11) 99999-9999",
      description: "Segunda a sexta, 9h-18h"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localização",
      details: "São Paulo, Brasil",
      description: "Atendimento global online"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horário de Atendimento",
      details: "Segunda a Sexta",
      description: "9:00 - 18:00 (GMT-3)"
    }
  ];

  const faqItems = [
    {
      question: "Como criar uma conta?",
      answer: "Clique em 'Meu Perfil' no menu superior. O cadastro é rápido e gratuito."
    },
    {
      question: "Os quizzes são realmente gratuitos?",
      answer: "Sim! Todos os nossos quizzes são 100% gratuitos e sempre serão."
    },
    {
      question: "Posso sugerir novos quizzes?",
      answer: "Claro! Envie suas sugestões para sugestoes@quizmaster.com"
    },
    {
      question: "Como funcionam as conquistas?",
      answer: "As conquistas são desbloqueadas conforme você completa quizzes e atinge marcas específicas."
    }
  ];

  return (
     <>
      <SEO 
        title="Contato - BrainMaster"
        description="Entre em contato com a BrainMaster. Dúvidas, sugestões ou reportar problemas."
        keywords="contato, suporte, dúvidas, sugestões"
      />
      
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou feedback? Adoramos ouvir nossa comunidade!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Informações de Contato
              </h2>
              
              <div className="grid gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                        {item.details}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Perguntas Frequentes
              </h2>
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {item.question}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {item.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Envie uma Mensagem
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Assunto *
                </label>
                <select className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="">Selecione um assunto</option>
                  <option value="support">Suporte Técnico</option>
                  <option value="suggestion">Sugestão de Quiz</option>
                  <option value="partnership">Parceria</option>
                  <option value="bug">Reportar Problema</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Mensagem *
                </label>
                <textarea
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                  placeholder="Descreva sua dúvida, sugestão ou feedback..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Mensagem</span>
              </motion.button>
            </form>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm">
                <Users className="w-4 h-4" />
                <span>Nossa equipe responde em até 24 horas úteis</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}