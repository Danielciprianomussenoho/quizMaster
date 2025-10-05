import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero({ isDark, toggleDark }) {
  return (
    <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
      >
        Descubra, Aprenda e
        <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Divirta-se
        </span>
      </motion.h1>

      <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
        Milhares de quizzes incríveis esperando por você. Teste seu conhecimento, descubra sua personalidade e compartilhe com amigos!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2">
          <span>Começar Agora</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white px-8 py-4 rounded-xl font-semibold">
          Ver Quizzes Populares
        </button>
      </div>
    </section>
  );
}
