// src/components/EditProfileModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Save, Upload } from 'lucide-react';
import { useState, useRef } from 'react';

export default function EditProfileModal({ isOpen, onClose, currentUser, onSave }) {
  const [formData, setFormData] = useState({
    username: currentUser?.username || 'QuizMaster',
    email: currentUser?.email || '',
    bio: currentUser?.bio || 'Apaixonado por quizzes e aprendizado! 🎯'
  });
  
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular salvamento (substituir por API call depois)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = {
      ...currentUser,
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
      avatar: avatar
    };
    
    // Salvar no localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
    
    onSave(updatedUser);
    setIsLoading(false);
    onClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Editar Perfil
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {avatar ? (
                    <img 
                      src={avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    formData.username?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </div>
                
                <motion.button
                  type="button"
                  onClick={triggerFileInput}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -right-2 bg-purple-500 text-white p-2 rounded-full shadow-lg hover:bg-purple-600 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                </motion.button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                Clique no ícone para alterar sua foto
              </p>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <User className="w-4 h-4" />
                <span>Nome de Usuário</span>
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="Seu nome de usuário"
                maxLength={30}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formData.username.length}/30 caracteres
              </p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4" />
                <span>E-mail</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="seu@email.com"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Opcional - usado para recuperação de conta
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <span>Biografia</span>
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                placeholder="Conte um pouco sobre você..."
                maxLength={150}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formData.bio.length}/150 caracteres
              </p>
            </div>

            {/* Stats Preview (Read-only) */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2">
              <h3 className="font-medium text-slate-700 dark:text-slate-300 text-sm">
                Estatísticas (somente leitura)
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-slate-600 dark:text-slate-400">
                  Quizzes completos: <strong>{currentUser?.totalQuizzes || 0}</strong>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Pontuação média: <strong>{currentUser?.averageScore || 0}%</strong>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Conquistas: <strong>{currentUser?.badges?.length || 0}</strong>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Membro desde: <strong>{new Date().getFullYear()}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={isLoading || !formData.username.trim()}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Salvar</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}