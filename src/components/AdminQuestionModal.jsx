// src/components/AdminQuestionModal.jsx (ATUALIZADO COM IMAGENS)
import { motion } from 'framer-motion';
import { X, Save, Plus, Trash2, Trophy, Image, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminQuestionModal({ 
  isOpen, 
  onClose, 
  onSave, 
  question = null,
  categories = [] 
}) {
  const [formData, setFormData] = useState({
    question: '',
    category: '',
    difficulty: 'Fácil',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    hasImage: false,
    imageUrl: '',
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (question) {
      setFormData({
        question: question.question || '',
        category: question.category || '',
        difficulty: question.difficulty || 'Fácil',
        options: question.options || ['', '', '', ''],
        correctAnswer: question.correctAnswer || 0,
        explanation: question.explanation || '',
        hasImage: question.hasImage || false,
        imageUrl: question.imageUrl || '',
        isActive: question.isActive !== undefined ? question.isActive : true
      });
      
      if (question.imageUrl) {
        setImagePreview(question.imageUrl);
      }
    } else {
      setFormData({
        question: '',
        category: '',
        difficulty: 'Fácil',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        hasImage: false,
        imageUrl: '',
        isActive: true
      });
      setImagePreview('');
    }
    setErrors({});
  }, [question, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.question.trim()) {
      newErrors.question = 'A pergunta é obrigatória';
    }
    
    if (!formData.category) {
      newErrors.category = 'Selecione uma categoria';
    }

    if (formData.hasImage && !formData.imageUrl.trim()) {
      newErrors.imageUrl = 'URL da imagem é obrigatória quando a pergunta tem imagem';
    }

    // Verificar opções
    formData.options.forEach((option, index) => {
      if (!option.trim()) {
        newErrors[`option${index}`] = 'Todas as opções devem ser preenchidas';
      }
    });

    // Verificar se há opções duplicadas
    const uniqueOptions = new Set(formData.options.map(opt => opt.trim().toLowerCase()));
    if (uniqueOptions.size !== formData.options.length) {
      newErrors.options = 'Não podem haver opções duplicadas';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: question?.id,
      ...formData
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

  const handleImageUrlChange = (url) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }));
    setImagePreview(url);
    
    if (errors.imageUrl) {
      setErrors(prev => ({
        ...prev,
        imageUrl: ''
      }));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({
      ...prev,
      options: newOptions
    }));

    if (errors[`option${index}`]) {
      setErrors(prev => ({
        ...prev,
        [`option${index}`]: ''
      }));
    }

    if (errors.options) {
      setErrors(prev => ({
        ...prev,
        options: ''
      }));
    }
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, '']
      }));
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      
      // Ajustar a resposta correta se necessário
      let newCorrectAnswer = formData.correctAnswer;
      if (index === formData.correctAnswer) {
        newCorrectAnswer = 0;
      } else if (index < formData.correctAnswer) {
        newCorrectAnswer = formData.correctAnswer - 1;
      }

      setFormData(prev => ({
        ...prev,
        options: newOptions,
        correctAnswer: newCorrectAnswer
      }));
    }
  };

  const difficultyOptions = [
    { value: 'Fácil', color: 'bg-green-500', description: 'Para iniciantes' },
    { value: 'Médio', color: 'bg-yellow-500', description: 'Conhecimento intermediário' },
    { value: 'Difícil', color: 'bg-red-500', description: 'Desafio para experts' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-purple-500" />
            {question ? 'Editar Pergunta' : 'Nova Pergunta'}
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
          {/* Tipo de Pergunta */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">
                Tipo de Pergunta
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {formData.hasImage ? 'Pergunta com imagem' : 'Pergunta textual'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleChange('hasImage', !formData.hasImage)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.hasImage ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.hasImage ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Pergunta */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {formData.hasImage ? 'Descrição da Imagem (Opcional)' : 'Pergunta *'}
            </label>
            <textarea
              value={formData.question}
              onChange={(e) => handleChange('question', e.target.value)}
              rows={formData.hasImage ? 2 : 3}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none ${
                errors.question && !formData.hasImage
                  ? 'border-red-500' 
                  : 'border-slate-300 dark:border-slate-600'
              }`}
              placeholder={
                formData.hasImage 
                  ? 'Descreva a imagem ou deixe em branco...' 
                  : 'Digite a pergunta...'
              }
            />
            {errors.question && !formData.hasImage && (
              <p className="mt-1 text-sm text-red-600">{errors.question}</p>
            )}
          </div>

          {/* Upload de Imagem */}
          {formData.hasImage && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                URL da Imagem *
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                    errors.imageUrl 
                      ? 'border-red-500' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                />
                {errors.imageUrl && (
                  <p className="text-sm text-red-600">{errors.imageUrl}</p>
                )}

                {/* Preview da Imagem */}
                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Pré-visualização:
                    </p>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-48 mx-auto rounded-lg"
                        onError={() => setImagePreview('')}
                      />
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Dica:</strong> Use URLs de imagens públicas. A imagem será exibida acima das opções de resposta.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categoria */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Categoria *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                  errors.category 
                    ? 'border-red-500' 
                    : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Dificuldade */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Nível de Dificuldade *
              </label>
              <div className="space-y-2">
                {difficultyOptions.map((diff) => (
                  <label key={diff.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      value={diff.value}
                      checked={formData.difficulty === diff.value}
                      onChange={(e) => handleChange('difficulty', e.target.value)}
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <div className={`w-3 h-3 rounded-full ${diff.color}`} />
                    <div>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {diff.value}
                      </span>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {diff.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Opções de Resposta */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Opções de Resposta *
              </label>
              {formData.options.length < 6 && (
                <button
                  type="button"
                  onClick={addOption}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Opção</span>
                </button>
              )}
            </div>

            {errors.options && (
              <p className="mb-3 text-sm text-red-600">{errors.options}</p>
            )}

            <div className="space-y-3">
              {formData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswer === index}
                    onChange={() => handleChange('correctAnswer', index)}
                    className="text-purple-500 focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Opção ${index + 1}...`}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white ${
                        errors[`option${index}`] 
                          ? 'border-red-500' 
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    />
                    {errors[`option${index}`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`option${index}`]}</p>
                    )}
                  </div>
                  {formData.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Selecione a opção correta marcando o radio button
            </p>
          </div>

          {/* Explicação */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Explicação (Opcional)
            </label>
            <textarea
              value={formData.explanation}
              onChange={(e) => handleChange('explanation', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
              placeholder="Explique por que esta resposta está correta..."
            />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white">
                Status da Pergunta
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
              <span>{question ? 'Atualizar' : 'Criar'} Pergunta</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}