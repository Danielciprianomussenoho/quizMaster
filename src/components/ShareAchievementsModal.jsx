// src/components/ShareAchievementsModal.jsx
import { motion } from 'framer-motion';
import { X, Twitter, Facebook, Link2, Download, Award, Trophy } from 'lucide-react';
import { useRef, useState } from 'react';

export default function ShareAchievementsModal({ isOpen, onClose, userData, achievements }) {
  const shareRef = useRef();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = window.location.origin;
  const shareText = `🎉 Conquistei ${achievements?.length || 0} conquistas no QuizMaster! 🏆\n\nMeu progresso:\n• ${userData.totalQuizzes || 0} quizzes completados\n• Média de ${userData.averageScore || 0}%\n• ${achievements?.length || 0} conquistas desbloqueadas\n\nVenha testar seus conhecimentos também!`;

  const shareData = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=QuizMaster,Conquistas`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar: ', err);
    }
  };

  const downloadAsImage = async () => {
    // Simulação - em produção, usar html2canvas ou similar
    alert('Em uma implementação real, esta função baixaria uma imagem das suas conquistas!');
  };

  const ShareButton = ({ icon, onClick, color, label, text }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center justify-center space-x-2 p-4 rounded-xl ${color} text-white hover:shadow-lg transition-all w-full`}
    >
      {icon}
      <span className="font-semibold">{text}</span>
    </motion.button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
            Compartilhar Conquistas
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6" ref={shareRef}>
          {/* Preview do Compartilhamento */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-6">
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">{userData.username}</h3>
              <p className="text-purple-100 mb-4">Compartilhou suas conquistas no QuizMaster!</p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{userData.totalQuizzes || 0}</div>
                  <div className="text-sm text-purple-100">Quizzes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{userData.averageScore || 0}%</div>
                  <div className="text-sm text-purple-100">Média</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{achievements?.length || 0}</div>
                  <div className="text-sm text-purple-100">Conquistas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Compartilhamento */}
          <div className="space-y-3">
            <ShareButton
              icon={<Twitter className="w-5 h-5" />}
              onClick={() => window.open(shareData.twitter, '_blank')}
              color="bg-blue-400 hover:bg-blue-500"
              text="Compartilhar no Twitter"
            />
            
            <ShareButton
              icon={<Facebook className="w-5 h-5" />}
              onClick={() => window.open(shareData.facebook, '_blank')}
              color="bg-blue-600 hover:bg-blue-700"
              text="Compartilhar no Facebook"
            />
            
            <ShareButton
              icon={<Link2 className="w-5 h-5" />}
              onClick={copyToClipboard}
              color="bg-purple-500 hover:bg-purple-600"
              text={copied ? "Copiado!" : "Copiar Link"}
            />
            
            <ShareButton
              icon={<Download className="w-5 h-5" />}
              onClick={downloadAsImage}
              color="bg-green-500 hover:bg-green-600"
              text="Baixar como Imagem"
            />
          </div>

          {/* Mensagem de Incentivo */}
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              🎯 Compartilhe seu progresso e desafie seus amigos!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}