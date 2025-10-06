// src/components/QuestionsCard.jsx (MODIFICADO)
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export default function QuestionsCard({
  data,
  onAnswer,
  showFeedback,
  selected,
  current,
  total,
}) {
  const { question, options, answer, explanation } = data;

  const getButtonStyle = (option) => {
    let baseStyle = "w-full px-4 py-3 rounded-lg border transition cursor-pointer text-left flex items-center space-x-3";

    if (!showFeedback) {
      return baseStyle + " bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600";
    }

    if (option === answer) 
      return baseStyle + " bg-emerald-500 text-white border-emerald-600";
    if (option === selected) 
      return baseStyle + " bg-rose-500 text-white border-rose-600";
    
    return baseStyle + " bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-600 opacity-70";
  };

  const getIcon = (option) => {
    if (!showFeedback) return <HelpCircle className="w-5 h-5 text-slate-400" />;
    
    if (option === answer) return <CheckCircle className="w-5 h-5 text-white" />;
    if (option === selected) return <XCircle className="w-5 h-5 text-white" />;
    
    return <HelpCircle className="w-5 h-5 text-slate-400" />;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300">
          Pergunta {current + 1} de {total}
        </h2>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {Math.round(((current + 1) / total) * 100)}% completo
        </span>
      </div>

      <p className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
        {question}
      </p>

      <div className="grid gap-3 mb-6">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={showFeedback}
            className={getButtonStyle(option)}
            whileHover={!showFeedback ? { scale: 1.02 } : {}}
            whileTap={!showFeedback ? { scale: 0.98 } : {}}
          >
            {getIcon(option)}
            <span>{option}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-lg ${
              selected === answer 
                ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              {selected === answer ? (
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className="font-semibold">
                  {selected === answer ? 'Resposta Correta! 🎉' : 'Resposta Incorreta'}
                </p>
                {explanation && (
                  <p className="mt-1 text-sm opacity-90">{explanation}</p>
                )}
                {!explanation && selected !== answer && (
                  <p className="mt-1 text-sm opacity-90">
                    A resposta correta é: <strong>{answer}</strong>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}