// src/components/SocialShare.jsx
import { motion } from 'framer-motion';
import { Twitter, Facebook, Link2, Share2 } from 'lucide-react';

export default function SocialShare({ score, total, category, difficulty }) {
  const shareUrl = window.location.href;
  const shareText = `Acabei de fazer um quiz de ${category} no QuizMaster e fiz ${score}/${total} pontos no modo ${difficulty}! 🎯`;

  const shareData = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Link copiado para a área de transferência!');
    } catch (err) {
      console.error('Falha ao copiar: ', err);
    }
  };

  const ShareButton = ({ icon, onClick, color, label }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-3 rounded-full ${color} text-white hover:shadow-lg transition-all`}
      title={label}
    >
      {icon}
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg mt-6"
    >
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
        <Share2 className="w-5 h-5 mr-2 text-purple-500" />
        Compartilhar Resultado
      </h3>
      
      <div className="flex justify-center space-x-4">
        <ShareButton
          icon={<Twitter className="w-5 h-5" />}
          onClick={() => window.open(shareData.twitter, '_blank')}
          color="bg-blue-400 hover:bg-blue-500"
          label="Compartilhar no Twitter"
        />
        
        <ShareButton
          icon={<Facebook className="w-5 h-5" />}
          onClick={() => window.open(shareData.facebook, '_blank')}
          color="bg-blue-600 hover:bg-blue-700"
          label="Compartilhar no Facebook"
        />
        
        <ShareButton
          icon={<Link2 className="w-5 h-5" />}
          onClick={copyToClipboard}
          color="bg-purple-500 hover:bg-purple-600"
          label="Copiar link"
        />
      </div>
      
      <p className="text-center text-slate-600 dark:text-slate-300 mt-4 text-sm">
        Mostre seu resultado para seus amigos!
      </p>
    </motion.div>
  );
}