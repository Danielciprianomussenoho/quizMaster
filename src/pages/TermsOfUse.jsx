// src/pages/TermsOfUse.jsx
import { motion } from 'framer-motion';
import { FileText, User, Shield, AlertTriangle, BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsOfUse() {
  const navigate = useNavigate();
  const sections = [
    {
      id: 'acceptance',
      icon: <FileText className="w-6 h-6" />,
      title: 'Aceitação dos Termos',
      content: `Ao acessar e usar o QuizMaster, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
Se você não concordar com qualquer parte destes termos, não deverá usar nosso site.

Estes termos constituem um acordo legal entre você e o QuizMaster em relação ao uso de nossos serviços.`
    },
    {
      id: 'account',
      icon: <User className="w-6 h-6" />,
      title: 'Conta do Usuário',
      content: `Para acessar certos recursos, você pode precisar criar uma conta. Você é responsável por:

• Manter a confidencialidade de suas credenciais
• Todas as atividades que ocorrem em sua conta
• Fornecer informações precisas e atualizadas
• Notificar-nos imediatamente sobre qualquer uso não autorizado

Reservamo-nos o direito de encerrar contas que violem estes termos.`
    },
    {
      id: 'content',
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Conteúdo e Propriedade Intelectual',
      content: `Todo o conteúdo do QuizMaster, incluindo quizzes, textos, gráficos, logos e software, 
é propriedade do QuizMaster ou de nossos licenciadores e está protegido por leis de propriedade intelectual.

Você pode:
• Jogar nossos quizzes para uso pessoal
• Compartilhar resultados nas redes sociais
• Usar recursos conforme pretendido

Você NÃO pode:
• Copiar, modificar ou distribuir nosso conteúdo
• Usar nosso conteúdo para fins comerciais
• Reverse engineer nosso software
• Remover avisos de direitos autorais`
    },
    {
      id: 'conduct',
      icon: <Shield className="w-6 h-6" />,
      title: 'Conduta do Usuário',
      content: `Ao usar o QuizMaster, você concorda em NÃO:

• Violar leis ou regulamentos aplicáveis
• Enviar conteúdo ofensivo, difamatório ou ilegal
• Tentar acessar contas de outros usuários
• Usar bots, scripts ou métodos automatizados
• Interferir na segurança ou funcionamento do site
• Realizar engenharia reversa de nossos sistemas
• Coletar dados de outros usuários

Violações podem resultar em encerramento da conta.`
    },
    {
      id: 'limitations',
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Limitações de Responsabilidade',
      content: `O QuizMaster é fornecido "no estado em que se encontra". Não garantimos que:

• O serviço será ininterrupto ou livre de erros
• Os resultados serão precisos ou confiáveis
• O serviço atenderá a todos os seus requisitos

Em nenhum caso seremos responsáveis por danos indiretos, incidentais ou consequenciais 
resultantes do uso ou incapacidade de usar nossos serviços.`
    },
    {
      id: 'termination',
      icon: <FileText className="w-6 h-6" />,
      title: 'Rescisão',
      content: `Podemos rescindir ou suspender seu acesso ao QuizMaster imediatamente, sem aviso prévio, 
por qualquer motivo, incluindo, mas não limitado a, violação destes Termos.

Após a rescisão, seu direito de usar o serviço cessará imediatamente. Se desejar encerrar 
sua conta, você pode simplesmente parar de usar o serviço ou nos contatar.`
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
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white">
              <FileText className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Termos de Uso
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
            Bem-vindo ao QuizMaster! Estes Termos de Uso regem seu acesso e uso do nosso site 
            e serviços. Ao usar o QuizMaster, você concorda com estes termos. Leia-os cuidadosamente.
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
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white flex-shrink-0">
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

        {/* Changes Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg mt-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-yellow-500" />
            Alterações nos Termos
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Podemos atualizar estes Termos de Uso periodicamente para refletir mudanças em nossas 
            práticas ou por outros motivos operacionais, legais ou regulatórios. Notificaremos você 
            sobre mudanças materiais publicando os novos termos no site. O uso continuado do 
            QuizMaster após tais mudanças constitui sua aceitação dos novos termos.
          </p>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white mt-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            Dúvidas sobre os Termos?
          </h2>
          <p className="mb-4 opacity-90">
            Entre em contato conosco se tiver alguma dúvida sobre nossos Termos de Uso.
          </p>
          <motion.a
            href="mailto:legal@quizmaster.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            legal@quizmaster.com
          </motion.a>
        </motion.section>

        {/* Effective Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm"
        >
          <p>
            Estes termos são efetivos a partir de {new Date().toLocaleDateString('pt-BR')}.
          </p>
        </motion.div>

      </div>
    </div>
  );
}