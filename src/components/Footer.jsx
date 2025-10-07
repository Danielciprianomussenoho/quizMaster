// src/components/Footer.jsx (COMPLETO E CORRIGIDO)
import { motion } from 'framer-motion';
import { 
  Heart, 
  Mail, 
  Github, 
  Twitter, 
  Instagram, 
  Facebook,
  ArrowUp,
  Home,
  User,
  Info,
  Shield,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop(); // Vai para o topo da nova página
  };

  const handleAnchorClick = (sectionId) => {
    if (window.location.pathname === '/') {
      // Se já está na página inicial, faz scroll suave
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se não está na página inicial, navega para home com hash
      navigate(`/#${sectionId}`);
    }
  };

  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: 'Todos os Quizzes', onClick: () => handleAnchorClick('categories') },
      { name: 'Quizzes em Alta', onClick: () => handleAnchorClick('trending') },
      { name: 'Categorias', onClick: () => handleAnchorClick('categories') },
      { name: 'Ranking', onClick: () => handleNavigation('/ranking') }
    ],
    company: [
      { name: 'Sobre Nós', onClick: () => handleNavigation('/about') },
      { name: 'Blog Educacional', onClick: () => handleNavigation('/blog') },
      { name: 'Nossa Equipe', onClick: () => handleNavigation('/about') },
      { name: 'Carreiras', onClick: () => window.open('#', '_blank') },
      { name: 'Contato', onClick: () => handleNavigation('/contact') }
    ],
    legal: [
      { name: 'Política de Privacidade', onClick: () => handleNavigation('/privacy') },
      { name: 'Termos de Uso', onClick: () => handleNavigation('/terms') },
      { name: 'DMCA', onClick: () => handleNavigation('/dmca') },
      { name: 'Cookies', onClick: () => handleNavigation('/cookies') }
    ],
    support: [
      { name: 'Central de Ajuda', onClick: () => handleNavigation('/help') },
      { name: 'Reportar Problema', onClick: () => handleNavigation('/report-problem') },
      { name: 'Sugerir Quiz', onClick: () => handleNavigation('/suggest-quiz') },
      { name: 'Feedback', onClick: () => handleNavigation('/contact') }
    ]
  };

  const socialLinks = [
    { 
      icon: <Github className="w-5 h-5" />, 
      onClick: () => window.open('https://github.com', '_blank'), 
      label: 'GitHub' 
    },
    { 
      icon: <Twitter className="w-5 h-5" />, 
      onClick: () => window.open('https://twitter.com', '_blank'), 
      label: 'Twitter' 
    },
    { 
      icon: <Instagram className="w-5 h-5" />, 
      onClick: () => window.open('https://instagram.com', '_blank'), 
      label: 'Instagram' 
    },
    { 
      icon: <Facebook className="w-5 h-5" />, 
      onClick: () => window.open('https://facebook.com', '_blank'), 
      label: 'Facebook' 
    }
  ];

  const quickActions = [
    { icon: <Home className="w-4 h-4" />, label: 'Início', onClick: () => handleNavigation('/') },
    { icon: <User className="w-4 h-4" />, label: 'Perfil', onClick: () => handleNavigation('/profile') },
    { icon: <Info className="w-4 h-4" />, label: 'Sobre', onClick: () => handleNavigation('/about') },
    { icon: <Mail className="w-4 h-4" />, label: 'Contato', onClick: () => handleNavigation('/contact') }
  ];

  const LinkSection = ({ title, items }) => (
    <div>
      <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index}>
            <button 
              onClick={item.onClick}
              className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm text-left w-full"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  QuizMaster
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md text-sm leading-relaxed">
                Transformando aprendizado em diversão através de quizzes interativos e educativos. 
                Junte-se a nossa comunidade de milhares de jogadores!
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={index}
                    onClick={social.onClick}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-600 transition-all"
                    title={social.label}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={action.onClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-600 transition-all"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <LinkSection title="Produto" items={links.product} />
            <LinkSection title="Empresa" items={links.company} />
            <LinkSection title="Legal" items={links.legal} />
            <LinkSection title="Suporte" items={links.support} />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-sm">
              <span>&copy; {currentYear} QuizMaster. Todos os direitos reservados.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="hidden sm:inline">pela nossa equipe</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <button 
                onClick={() => handleNavigation('/privacy')}
                className="text-slate-600 dark:text-slate-300 hover:text-purple-600 transition-colors"
              >
                Privacidade
              </button>
              <button 
                onClick={() => handleNavigation('/terms')}
                className="text-slate-600 dark:text-slate-300 hover:text-purple-600 transition-colors"
              >
                Termos
              </button>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-purple-600 transition-colors"
                title="Voltar ao topo"
              >
                <span>Voltar ao topo</span>
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}