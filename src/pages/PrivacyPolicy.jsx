import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Cookie, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'information',
      icon: <Eye className="w-6 h-6" />,
      title: 'Informações que Coletamos',
      content: `Coletamos informações para fornecer melhores serviços a todos os nossos usuários. As informações que coletamos incluem:

• Informações de cadastro: nome, e-mail (opcional)
• Dados de uso: quizzes jogados, pontuações, tempo gasto
• Informações técnicas: tipo de dispositivo, navegador, IP
• Cookies e tecnologias similares para melhorar sua experiência`
    },
    {
      id: 'usage',
      icon: <Shield className="w-6 h-6" />,
      title: 'Como Usamos suas Informações',
      content: `Utilizamos as informações coletadas para:

• Fornecer, manter e melhorar nossos serviços
• Desenvolver novos recursos e funcionalidades
• Personalizar sua experiência no QuizMaster
• Analisar o uso dos serviços e tendências dos usuários
• Comunicar-nos com você sobre atualizações e novidades
• Garantir a segurança e prevenir fraudes`
    },
    {
      id: 'cookies',
      icon: <Cookie className="w-6 h-6" />,
      title: 'Cookies e Tecnologias Similares',
      content: `Utilizamos cookies e tecnologias similares para:

• Lembrar suas preferências e configurações
• Manter você conectado entre sessões
• Entender como você usa nosso site
• Personalizar o conteúdo mostrado a você
• Coletar dados analíticos agregados

Você pode controlar o uso de cookies através das configurações do seu navegador.`
    },
    {
      id: 'sharing',
      icon: <Lock className="w-6 h-6" />,
      title: 'Compartilhamento de Informações',
      content: `Não vendemos suas informações pessoais. Podemos compartilhar informações nas seguintes situações:

• Com seu consentimento explícito
• Com prestadores de serviços que nos ajudam a operar o site
• Por exigência legal ou para proteger nossos direitos
• Em transações corporativas (fusão, aquisição)
• De forma agregada e anônima para análise estatística`
    },
    {
      id: 'security',
      icon: <Shield className="w-6 h-6" />,
      title: 'Segurança dos Dados',
      content: `Implementamos medidas de segurança apropriadas para proteger suas informações:

• Criptografia de dados sensíveis
• Acesso restrito às informações
• Monitoramento contínuo de segurança
• Revisões regulares de práticas de segurança
• Armazenamento seguro em servidores protegidos`
    },
    {
      id: 'rights',
      icon: <Eye className="w-6 h-6" />,
      title: 'Seus Direitos',
      content: `Você tem os seguintes direitos sobre seus dados:

• Acessar suas informações pessoais
• Corrigir dados imprecisos
• Excluir suas informações (direito ao esquecimento)
• Exportar seus dados
• Revogar consentimentos
• Opor-se ao processamento de dados

Para exercer estes direitos, entre em contato conosco.`
    }
  ];

  return (
     <>
      <SEO 
        title="Política de Privacidade - BrainMaster"
        description="Política de Privacidade da BrainMaster. Saiba como coletamos, usamos e protegemos suas informações."
        keywords="política de privacidade, privacidade, dados, segurança"
      />
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
            <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg mb-8"
        >
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            No QuizMaster, levamos sua privacidade a sério. Esta política descreve como coletamos, 
            usamos e protegemos suas informações quando você usa nosso site e serviços. Ao usar o 
            QuizMaster, você concorda com os termos desta política.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {section.title}
                  </h2>
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-slate-600 dark:text-slate-300 leading-relaxed">
                      {section.content}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white mt-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            Dúvidas sobre Privacidade?
          </h2>
          <p className="mb-4 opacity-90">
            Entre em contato conosco se tiver alguma dúvida sobre nossa política de privacidade.
          </p>
          <motion.a
            href="mailto:privacy@quizmaster.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            privacy@quizmaster.com
          </motion.a>
        </motion.section>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm"
        >
          <p>
            Esta política pode ser atualizada periodicamente. Recomendamos que você revise esta página regularmente.
          </p>
        </motion.div>

      </div>
    </div>
    </>
  );
}