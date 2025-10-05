import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

const categories = [
  { 
    id: 1, 
    name: "Personalidade", 
    icon: "👤", 
    color: "from-purple-500 to-pink-500", 
    description: "Descubra mais sobre você", 
    popular: true },
  { 
    id: 2, 
    name: "Entretenimento", 
    icon: "🎬", 
    color: "from-blue-500 to-cyan-500", 
    description: "Filmes e celebridades", 
    popular: true },
  { 
    id: 3, name: "Conhecimento", 
    icon: "🧠", 
    color: "from-green-500 to-emerald-500", 
    description: "Teste seu QI e cultura", 
    popular: false },
  {
    id: 4,
    name: 'Games',
    icon: '🎮',
    color: 'from-red-500 to-orange-500',
    description: 'Mundo dos videogames',
    popular: true
    },
    {
      id: 5,
      name: 'Esportes',
      icon: '⚽',
      color: 'from-yellow-500 to-amber-500',
      description: 'Futebol e outros esportes',
      popular: false
    },
    {
      id: 6,
      name: 'Lifestyle',
      icon: '🌟',
      color: 'from-indigo-500 to-purple-500',
      description: 'Estilo de vida e hobbies',
      popular: false
    }
];

export default function Categories() {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">Explore Categorias</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{  duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 cursor-pointer group relative overflow-hidden ${
                category.popular ? 'ring-2 ring-yellow-400' : ''
              }`}
          >
            {category.popular && (
              <div className="absolute top-4 right-4 bg-yellow-400 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                <Star className="w-3 h-3 mr-1"/> Popular
              </div>
            )}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl mb-4`}>
              {category.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category.name}</h3>
            <p className="text-slate-600 dark:text-slate-300">{category.description}</p>
            <div className="flex items-center mt-2 text-slate-500 text-sm">
              <TrendingUp className="w-4 h-4 mr-1"/> +100 quizzes
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
