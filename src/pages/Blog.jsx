// src/pages/Blog.jsx
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Book, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SEO from '../components/SEO';

const blogPosts = [
  {
    id: 1,
    title: "Como os Quizzes Podem Melhorar Sua Retenção de Conhecimento em 50%",
    excerpt: "Descubra a ciência por trás do aprendizado através de testes e como isso pode transformar sua forma de estudar. Estudos comprovam que métodos ativos de aprendizagem são significativamente mais eficazes...",
    author: "Dr. Ana Silva",
    date: "2024-03-20",
    readTime: "5 min",
    category: "Aprendizado",
    image: "https://picsum.photos/400/250?random=1"
  },
  {
    id: 2,
    title: "10 Técnicas Cientificamente Comprovadas para Memorização Eficiente",
    excerpt: "Conheça as estratégias baseadas em pesquisas de neurociência que podem ajudar você a reter informações importantes por mais tempo. Desde a repetição espaçada até o efeito de teste...",
    author: "Prof. Carlos Mendes",
    date: "2024-03-18",
    readTime: "7 min",
    category: "Memorização",
    image: "https://picsum.photos/400/250?random=2"
  },
  {
    id: 3,
    title: "A Psicologia do Aprendizado: Por que Brincar Ajuda a Aprender",
    excerpt: "Entenda como elementos lúdicos e gamificação podem acelerar o processo de aprendizado em todas as idades. A ciência mostra que a diversão ativa regiões cerebrais importantes para a memória...",
    author: "Dra. Beatriz Oliveira",
    date: "2024-03-15",
    readTime: "6 min",
    category: "Psicologia",
    image: "https://picsum.photos/400/250?random=3"
  },
  {
    id: 4,
    title: "O Impacto do Feedback Imediato no Processo de Aprendizagem",
    excerpt: "Explore como receber feedback instantâneo sobre suas respostas pode acelerar significativamente sua curva de aprendizado. Dados mostram que correções imediatas melhoram a retenção em 40%...",
    author: "Equipe QuizMaster",
    date: "2024-03-12",
    readTime: "8 min",
    category: "Metodologia",
    image: "https://picsum.photos/400/250?random=4"
  },
  {
    id: 5,
    title: "Como a Tecnologia Está Revolucionando a Educação Moderna",
    excerpt: "Analisamos as principais tendências tecnológicas que estão transformando a forma como aprendemos. De plataformas adaptativas à inteligência artificial na educação...",
    author: "Tech Education Team",
    date: "2024-03-10",
    readTime: "9 min",
    category: "Tecnologia",
    image: "https://picsum.photos/400/250?random=5"
  },
  {
    id: 6,
    title: "Neurociência do Aprendizado: Como Seu Cérebro Aprende de Verdade",
    excerpt: "Descubra os mecanismos cerebrais envolvidos no processo de aprendizagem e como otimizá-los. Entenda a importância das sinapses, neuroplasticidade e consolidação da memória...",
    author: "Dr. Roberto Lima",
    date: "2024-03-08",
    readTime: "10 min",
    category: "Neurociência",
    image: "https://picsum.photos/400/250?random=6"
  }
];

export default function Blog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO 
        title="Blog Educacional - QuizMaster"
        description="Artigos, dicas e insights baseados em ciência sobre aprendizado eficiente, memorização e métodos de estudo comprovados."
        keywords="blog educação, dicas estudo, aprendizado eficiente, neurociência, métodos de estudo"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl text-white">
                <Book className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Blog Educacional
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Artigos baseados em ciência, dicas práticas e insights sobre aprendizado eficiente
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-purple-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-3 mb-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <button className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 transition-colors group">
                    <span>Ler artigo completo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Book className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Nenhum artigo encontrado
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Tente buscar com outros termos ou selecione uma categoria diferente
              </p>
            </motion.div>
          )}

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center mt-12"
          >
            <h3 className="text-2xl font-bold mb-4">
              📚 Receba Conteúdo Exclusivo
            </h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Inscreva-se em nossa newsletter e receba artigos científicos, dicas de estudo 
              baseadas em evidências e novidades sobre aprendizado eficiente diretamente no seu email.
            </p>
            <div className="flex max-w-md mx-auto bg-white rounded-xl overflow-hidden">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-4 py-3 text-slate-900 focus:outline-none"
              />
              <button className="bg-green-600 text-white px-6 py-3 font-semibold hover:bg-green-700 transition-colors">
                Inscrever
              </button>
            </div>
            <p className="text-sm opacity-80 mt-3">
              ✨ Sem spam, apenas conteúdo de qualidade. Pode cancelar a qualquer momento.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}