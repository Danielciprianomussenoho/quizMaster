// src/pages/AdminDashboard.jsx
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Shield, 
  Trash2, 
  Edit, 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Lock,
  Unlock,
  Trophy,
  Award,
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Image,
  Upload
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import AdminCategoryModal from '../components/AdminCategoryModal';
import AdminQuestionModal from '../components/AdminQuestionModal';

// Dados mockados - serão substituídos pelo backend
const mockUsers = [
  {
    id: 1,
    username: 'quiz_master',
    email: 'quiz_master@email.com',
    totalQuizzes: 25,
    averageScore: 92,
    totalPoints: 1250,
    badges: ['gold-medal', 'quiz-master', 'perfect-score'],
    joinedDate: '2024-01-15',
    isActive: true,
    lastLogin: '2024-03-20'
  },
  {
    id: 2,
    username: 'knowledge_seeker',
    email: 'knowledge@email.com',
    totalQuizzes: 18,
    averageScore: 88,
    totalPoints: 980,
    badges: ['silver-medal', 'knowledge-seeker'],
    joinedDate: '2024-02-01',
    isActive: true,
    lastLogin: '2024-03-19'
  },
  {
    id: 3,
    username: 'speed_demon',
    email: 'speed@email.com',
    totalQuizzes: 15,
    averageScore: 85,
    totalPoints: 760,
    badges: ['bronze-medal', 'speed-demon'],
    joinedDate: '2024-02-10',
    isActive: false,
    lastLogin: '2024-03-10'
  }
];

const mockMessages = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    subject: 'Problema no quiz de matemática',
    message: 'O quiz de matemática avançada está com problemas na questão 5...',
    type: 'bug',
    status: 'pending',
    date: '2024-03-20',
    read: false
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    subject: 'Sugestão de novo quiz',
    message: 'Gostaria de sugerir um quiz sobre inteligência artificial...',
    type: 'suggestion',
    status: 'completed',
    date: '2024-03-19',
    read: true
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    subject: 'Dúvida sobre conquistas',
    message: 'Como posso desbloquear a conquista de mestre dos quizzes?',
    type: 'support',
    status: 'in-progress',
    date: '2024-03-18',
    read: true
  }
];

const mockCategories = [
  { 
    id: 1, 
    name: 'Programação', 
    description: 'Perguntas sobre linguagens de programação e desenvolvimento',
    questionCount: 50, 
    isActive: true, 
    color: '#8B5CF6',
    createdAt: '2024-01-01' 
  },
  { 
    id: 2, 
    name: 'Matemática', 
    description: 'Questões matemáticas de diferentes níveis',
    questionCount: 35, 
    isActive: true, 
    color: '#3B82F6',
    createdAt: '2024-01-02' 
  },
  { 
    id: 3, 
    name: 'História', 
    description: 'Fatos históricos e eventos importantes',
    questionCount: 28, 
    isActive: false, 
    color: '#EF4444',
    createdAt: '2024-01-03' 
  },
  { 
    id: 4, 
    name: 'Ciências', 
    description: 'Perguntas sobre ciências naturais e experimentos',
    questionCount: 42, 
    isActive: true, 
    color: '#10B981',
    createdAt: '2024-01-04' 
  }
];

const mockQuestions = [
  {
    id: 1,
    question: 'O que é JavaScript?',
    category: 'Programação',
    difficulty: 'Fácil',
    options: ['Linguagem de programação', 'Framework', 'Biblioteca', 'Banco de dados'],
    correctAnswer: 0,
    explanation: 'JavaScript é uma linguagem de programação amplamente usada para desenvolvimento web.',
    hasImage: false,
    imageUrl: '',
    isActive: true
  },
  {
    id: 2,
    question: 'Qual é o resultado de 8 ÷ 2(2 + 2)?',
    category: 'Matemática',
    difficulty: 'Médio',
    options: ['1', '16', '8', '4'],
    correctAnswer: 1,
    explanation: 'Seguindo a ordem das operações: 8 ÷ 2(4) = 4 × 4 = 16',
    hasImage: false,
    imageUrl: '',
    isActive: true
  },
  {
    id: 3,
    question: 'Identifique o padrão na sequência:',
    category: 'Matemática',
    difficulty: 'Difícil',
    options: ['Padrão Aritmético', 'Padrão Geométrico', 'Sequência de Fibonacci', 'Padrão Quadrático'],
    correctAnswer: 2,
    explanation: 'Esta é a sequência de Fibonacci onde cada número é a soma dos dois anteriores.',
    hasImage: true,
    imageUrl: 'https://example.com/fibonacci-pattern.jpg',
    isActive: true
  }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState(mockUsers);
  const [messages, setMessages] = useState(mockMessages);
  const [categories, setCategories] = useState(mockCategories);
  const [questions, setQuestions] = useState(mockQuestions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Verificar se é admin (em produção, isso viria do backend)
  const isAdmin = localStorage.getItem('adminAccess') === 'true';

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
  }, [isAdmin, navigate]);

  // Funções para salvar
  const handleSaveCategory = (categoryData) => {
    if (categoryData.id) {
      // Editar categoria existente
      setCategories(categories.map(cat => 
        cat.id === categoryData.id ? { ...cat, ...categoryData } : cat
      ));
    } else {
      // Nova categoria
      const newCategory = {
        ...categoryData,
        id: Date.now(),
        questionCount: 0
      };
      setCategories([...categories, newCategory]);
    }
  };

  const handleSaveQuestion = (questionData) => {
    if (questionData.id) {
      // Editar pergunta existente
      setQuestions(questions.map(q => 
        q.id === questionData.id ? { ...q, ...questionData } : q
      ));
    } else {
      // Nova pergunta
      const newQuestion = {
        ...questionData,
        id: Date.now()
      };
      setQuestions([...questions, newQuestion]);
      
      // Atualizar contagem de perguntas na categoria
      if (questionData.category) {
        setCategories(categories.map(cat => 
          cat.name === questionData.category 
            ? { ...cat, questionCount: cat.questionCount + 1 }
            : cat
        ));
      }
    }
  };

  const handleDeleteQuestion = (questionId) => {
    const questionToDelete = questions.find(q => q.id === questionId);
    if (questionToDelete) {
      // Atualizar contagem de perguntas na categoria
      setCategories(categories.map(cat => 
        cat.name === questionToDelete.category 
          ? { ...cat, questionCount: Math.max(0, cat.questionCount - 1) }
          : cat
      ));
    }
    
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  if (!isAdmin) {
    return null;
  }

  // Estatísticas
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    totalMessages: messages.length,
    pendingMessages: messages.filter(m => m.status === 'pending').length,
    totalCategories: categories.length,
    activeCategories: categories.filter(c => c.isActive).length,
    totalQuestions: questions.length,
    questionsWithImages: questions.filter(q => q.hasImage).length
  };

  const StatCard = ({ icon, title, value, color, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 dark:text-slate-300 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color} text-white`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const TabButton = ({ tab, icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${
        activeTab === tab
          ? 'bg-purple-500 text-white'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  // Componentes para cada aba
  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Total de Usuários"
          value={stats.totalUsers}
          color="bg-blue-500"
          subtitle={`${stats.activeUsers} ativos`}
        />
        <StatCard
          icon={<BarChart3 className="w-6 h-6" />}
          title="Perguntas"
          value={stats.totalQuestions}
          color="bg-green-500"
          subtitle={`${stats.questionsWithImages} com imagens`}
        />
        <StatCard
          icon={<MessageSquare className="w-6 h-6" />}
          title="Mensagens"
          value={stats.totalMessages}
          color="bg-yellow-500"
          subtitle={`${stats.pendingMessages} pendentes`}
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          title="Categorias"
          value={stats.totalCategories}
          color="bg-purple-500"
          subtitle={`${stats.activeCategories} ativas`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Categorias Populares
          </h3>
          <div className="space-y-3">
            {categories
              .filter(cat => cat.isActive)
              .sort((a, b) => b.questionCount - a.questionCount)
              .slice(0, 5)
              .map(category => (
                <div key={category.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{category.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {category.questionCount} perguntas
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    category.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {category.isActive ? 'Ativa' : 'Inativa'}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Mensagens Pendentes
          </h3>
          <div className="space-y-3">
            {messages
              .filter(m => m.status === 'pending')
              .slice(0, 5)
              .map(message => (
                <div 
                  key={message.id} 
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => {
                    setSelectedMessage(message);
                    setIsMessageModalOpen(true);
                  }}
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{message.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 truncate max-w-xs">
                      {message.subject}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    !message.read ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                  }`}>
                    {!message.read ? 'Não lida' : 'Lida'}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900 dark:text-white"
          />
        </div>
        <button className="bg-purple-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Exportar</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Usuário</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Estatísticas</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{user.username}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Desde {new Date(user.joinedDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-900 dark:text-white">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      <p>{user.totalQuizzes} quizzes</p>
                      <p>{user.averageScore}% média</p>
                      <p>{user.badges.length} conquistas</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {user.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsUserModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const updatedUsers = users.map(u =>
                            u.id === user.id ? { ...u, isActive: !u.isActive } : u
                          );
                          setUsers(updatedUsers);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          user.isActive
                            ? 'text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900'
                            : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900'
                        }`}
                        title={user.isActive ? 'Desativar usuário' : 'Ativar usuário'}
                      >
                        {user.isActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Tem certeza que deseja excluir o usuário ${user.username}?`)) {
                            setUsers(users.filter(u => u.id !== user.id));
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                        title="Excluir usuário"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const MessagesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium">
          Todas ({messages.length})
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium">
          Pendentes ({messages.filter(m => m.status === 'pending').length})
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
          Em Andamento ({messages.filter(m => m.status === 'in-progress').length})
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium">
          Resolvidas ({messages.filter(m => m.status === 'completed').length})
        </button>
      </div>

      <div className="space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all"
            onClick={() => {
              setSelectedMessage(message);
              setIsMessageModalOpen(true);
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-full ${
                    message.type === 'bug' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' :
                    message.type === 'suggestion' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                    'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {message.type === 'bug' ? <AlertTriangle className="w-4 h-4" /> :
                     message.type === 'suggestion' ? <Plus className="w-4 h-4" /> :
                     <MessageSquare className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {message.subject}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {message.name} • {message.email}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
                  {message.message}
                </p>
                <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(message.date).toLocaleDateString('pt-BR')}</span>
                  </span>
                  <span className={`flex items-center space-x-1 ${
                    message.status === 'pending' ? 'text-yellow-600' :
                    message.status === 'in-progress' ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    {message.status === 'pending' ? <AlertTriangle className="w-4 h-4" /> :
                     message.status === 'in-progress' ? <Settings className="w-4 h-4" /> :
                     <CheckCircle className="w-4 h-4" />}
                    <span>
                      {message.status === 'pending' ? 'Pendente' :
                       message.status === 'in-progress' ? 'Em Andamento' :
                       'Resolvido'}
                    </span>
                  </span>
                  {!message.read && (
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                      Nova
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CategoriesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gerenciar Categorias</h3>
        <button 
          onClick={() => {
            setEditingCategory(null);
            setIsCategoryModalOpen(true);
          }}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Categoria</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <div key={category.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{category.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {category.questionCount} perguntas
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                category.isActive
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {category.isActive ? 'Ativa' : 'Inativa'}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
              {category.description}
            </p>

            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  setEditingCategory(category);
                  setIsCategoryModalOpen(true);
                }}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-all flex items-center justify-center space-x-1"
              >
                <Edit className="w-4 h-4" />
                <span>Editar</span>
              </button>
              <button 
                onClick={() => {
                  const updatedCategories = categories.map(c =>
                    c.id === category.id ? { ...c, isActive: !c.isActive } : c
                  );
                  setCategories(updatedCategories);
                }}
                className={`flex-1 py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-1 ${
                  category.isActive
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {category.isActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                <span>{category.isActive ? 'Desativar' : 'Ativar'}</span>
              </button>
              <button 
                onClick={() => {
                  if (window.confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`)) {
                    setCategories(categories.filter(c => c.id !== category.id));
                  }
                }}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-all flex items-center justify-center space-x-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Excluir</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const QuestionsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Gerenciar Perguntas ({questions.length})
        </h3>
        <button 
          onClick={() => {
            setEditingQuestion(null);
            setIsQuestionModalOpen(true);
          }}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Pergunta</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Pergunta</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Dificuldade</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Imagem</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {questions.map(question => (
                <tr key={question.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white line-clamp-2">
                        {question.question}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        Resposta: {question.options[question.correctAnswer]}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full text-xs">
                      {question.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      question.difficulty === 'Fácil' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      question.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {question.hasImage ? (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <Image className="w-4 h-4" />
                        <span className="text-xs">Com imagem</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">Sem imagem</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      question.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {question.isActive ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setEditingQuestion(question);
                          setIsQuestionModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          const updatedQuestions = questions.map(q =>
                            q.id === question.id ? { ...q, isActive: !q.isActive } : q
                          );
                          setQuestions(updatedQuestions);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          question.isActive
                            ? 'text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900'
                            : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900'
                        }`}
                      >
                        {question.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
                            handleDeleteQuestion(question.id);
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SEO 
        title="Admin Dashboard - QuizMaster"
        description="Painel de administração do QuizMaster"
        keywords="admin, dashboard, gerenciamento, usuários"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  Painel de Administração
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Gerencie usuários, mensagens, categorias e perguntas
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Admin</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <TabButton tab="overview" icon={<BarChart3 className="w-5 h-5" />} label="Visão Geral" />
            <TabButton tab="users" icon={<Users className="w-5 h-5" />} label="Usuários" />
            <TabButton tab="messages" icon={<MessageSquare className="w-5 h-5" />} label="Mensagens" />
            <TabButton tab="categories" icon={<Award className="w-5 h-5" />} label="Categorias" />
            <TabButton tab="questions" icon={<Trophy className="w-5 h-5" />} label="Perguntas" />
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'messages' && <MessagesTab />}
            {activeTab === 'categories' && <CategoriesTab />}
            {activeTab === 'questions' && <QuestionsTab />}
          </motion.div>
        </div>
      </div>

      {/* Modais */}
      <AdminCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />

      <AdminQuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => {
          setIsQuestionModalOpen(false);
          setEditingQuestion(null);
        }}
        onSave={handleSaveQuestion}
        question={editingQuestion}
        categories={categories}
      />
    </>
  );
}