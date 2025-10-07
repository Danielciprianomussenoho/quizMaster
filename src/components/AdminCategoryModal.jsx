// src/components/AdminCategoryModal.jsx
import { motion } from 'framer-motion';
import { X, Save, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminCategoryModal({ 
  isOpen, 
  onClose, 
  onSave, 
  category = null 
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
    color: '#8B5CF6' // Cor padrão - purple
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        isActive: category.isActive !== undefined ? category.isActive : true,
        color: category.color || '#8B5CF6'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        isActive: true,
        color: '#8B5CF6'
      });
    }
    setErrors({});
  }, [category, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome da categoria é obrigatório';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: category?.id,
      ...formData,
      createdAt: category?.createdAt || new Date().toISOString(),
      questionCount: category?.questionCount || 0
    });
    
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const colorOptions = [
    { value: '#8B5CF6', name: 'Roxo', bg: 'bg-purple-500' },
    { value: '#3B82F6', name: 'Azul', bg: 'bg-blue-500' },
    { value: '#10B981', name: 'Verde', bg: 'bg-green-500' },
    { value: '#F59E0B', name: 'Amarelo', bg: 'bg-yellow-500' },
    { value: '#EF4444', name: 'Vermelho', bg: 'bg-red-500' },
    { value: '#8B5CF6', name: 'Rosa', bg: 'bg-pink-500' },
    { value: '#6B7280', name: 'Cinza', bg: 'bg-gray-500' },
    { value: '#06B6D4', name: 'Ciano', bg: 'bg-cyan-500' }
  ];

  if (!isOpen) return null;

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
            <Award className="w-6 h-6 mr-2 text-purple-500" />
            {category ? 'Editar Categoria' : 'Nova Categoria'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nome da Categoria */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Nome da Categoria *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                errors.name 
                  ? 'border-red-500' 
                  : 'border-slate-300 dark:border-slate-600'
              }`}
              placeholder="Ex: Programação, Matemática, História..."
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Descrição *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none ${
                errors.description 
                  ? 'border-red-500' 
                  : 'border-slate-300 dark:border-slate-600'
              }`}
              placeholder="Descreva brevemente esta categoria..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Cor da Categoria */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Cor da Categoria
            </label>
            <div className="grid grid-cols-4 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleChange('color', color.value)}
                  className={`flex flex-col items-center space-y-2 p-3 rounded-xl border-2 transition-all ${
                    formData.color === color.value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full ${color.bg}`}
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">
                Status da Categoria
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {formData.isActive ? 'Ativa e visível' : 'Inativa e oculta'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleChange('isActive', !formData.isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.isActive ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Preview */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <h3 className="font-medium text-slate-900 dark:text-white mb-3">
              Pré-visualização
            </h3>
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: formData.color }}
              >
                {formData.name?.charAt(0)?.toUpperCase() || 'C'}
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {formData.name || 'Nome da Categoria'}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {formData.description || 'Descrição da categoria...'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{category ? 'Atualizar' : 'Criar'} Categoria</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}