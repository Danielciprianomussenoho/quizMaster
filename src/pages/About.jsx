// src/pages/About.jsx
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Target, 
  Award, 
  Star, 
  Rocket,
  Code,
  Palette,
  Smartphone,
  Globe,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function About() {
  // Navegação
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Missão",
      description: "Proporcionar aprendizado divertido e acessível através de quizzes interativos e engajadores.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Visão",
      description: "Ser a plataforma de quizzes mais popular e confiável da América Latina até 2025.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Valores",
      description: "Qualidade, Inovação, Acessibilidade e Comunidade são nossos pilares fundamentais.",
      color: "from-red-500 to-orange-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Jogadores Ativos", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Quizzes Disponíveis", icon: <Award className="w-6 h-6" /> },
    { number: "4.8", label: "Avaliação Média", icon: <Star className="w-6 h-6" /> },
    { number: "15+", label: "Categorias", icon: <Globe className="w-6 h-6" /> }
  ];

  const team = [
    {
      name: "Daniel Cipriano",
      role: "Fundador & CEO",
      bio: "Especialista em educação e tecnologia com 10+ anos de experiência.",
      avatar: "👩‍💼"
    },
    {
      name: "Carlos Santos",
      role: "CTO",
      bio: "Desenvolvedor full-stack apaixonado por React e Node.js.",
      avatar: "👨‍💻"
    },
    {
      name: "Daniel Cipriano",
      role: "Designer UI/UX",
      bio: "Cria experiências incríveis que encantam os usuários.",
      avatar: "👩‍🎨"
    },
    {
      name: "Ricardo Lima",
      role: "Content Manager",
      bio: "Especialista em criar conteúdo educativo e envolvente.",
      avatar: "👨‍🏫"
    }
  ];

  const technologies = [
    { name: "React", icon: <Code className="w-6 h-6" />, color: "from-blue-500 to-cyan-500" },
    { name: "Tailwind CSS", icon: <Palette className="w-6 h-6" />, color: "from-teal-500 to-green-500" },
    { name: "Framer Motion", icon: <Smartphone className="w-6 h-6" />, color: "from-purple-500 to-pink-500" },
    { name: "JavaScript", icon: <Code className="w-6 h-6" />, color: "from-yellow-500 to-amber-500" }
  ];

  return (
    <>
      <SEO 
        title="Sobre Nós - BrainMaster"
        description="Conheça a BrainMaster - Plataforma de quizzes educativos criada para transformar aprendizado em diversão."
        keywords="sobre brainmaster, nossa equipe, missão, valores"
      />
      
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
          >
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-6">
              QuizMaster
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Somos uma plataforma de quizzes educativos criada para transformar aprendizado em diversão. 
            Combinamos tecnologia moderna com conteúdo de qualidade para oferecer a melhor experiência.
          </motion.p>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Nossa Essência
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br ${feature.color} p-1 rounded-2xl shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 h-full text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-full text-white`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Conheça Nossa Equipe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <div className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technologies Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Tecnologias que Usamos
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-r ${tech.color} p-1 rounded-2xl shadow-lg`}
              >
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center">
                  <div className="flex justify-center mb-3 text-white">
                    {tech.icon}
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {tech.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg mb-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Nossa História
            </h2>
            <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                O QuizMaster nasceu em 2024 da paixão por educação e tecnologia. Percebemos que 
                as pessoas aprendem melhor quando se divertem, e os quizzes são a ferramenta perfeita 
                para unir conhecimento e entretenimento.
              </p>
              <p>
                Começamos com apenas 3 categorias e 50 perguntas. Hoje, temos uma biblioteca com 
                centenas de quizzes cuidadosamente elaborados por nossa equipe de especialistas.
              </p>
              <p>
                Nossa missão é continuar crescendo, sempre mantendo o compromisso com qualidade, 
                acessibilidade e a melhor experiência do usuário.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de jogadores e descubra um mundo de conhecimento divertido.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Começar a Jogar
            </motion.button>
          </div>
        </motion.section>

      </div>
    </div>
          </>
  );
}