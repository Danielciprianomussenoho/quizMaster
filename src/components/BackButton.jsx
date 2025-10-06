// src/components/BackButton.jsx
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ 
  to = -1, 
  label = "Voltar",
  showHome = true,
  className = "" 
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to === -1) {
      navigate(-1); // Volta para página anterior no histórico
    } else {
      navigate(to); // Navega para rota específica
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.button
        onClick={handleBack}
        whileHover={{ scale: 1.05, x: -2 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{label}</span>
      </motion.button>

      {showHome && (
        <motion.button
          onClick={handleHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors font-medium"
          title="Voltar para o Início"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Início</span>
        </motion.button>
      )}
    </div>
  );
}